import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { addOne, createCart, deleteOne, removeFromCart } from "../../services/cartService"
import { createElementoCarrito } from "../../services/cartElementsService"
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { createPreference } from "../../services/paymentService"
import { createInvoiceOrders } from "../../services/facturaPedidosService"
import { createImageURL } from "../../services/imagesService"
import { parsePrice } from "../../helpers/json.helpers"
import { userUpdate } from "../../services/authService"
import { getGiftCard, updateGiftCard } from "../../services/giftCardService"
import { colombia } from "../../services/citiesService"

const CartPage = ({setShowCart = undefined, showCart = false}) => {
    const navigate = useNavigate()
    const { isAuthenticated, user } = useAuth()
    const [shippingAdress, setShippingAdress] = useState("")
    const [phone, setPhone] = useState("")
    const [cart, setCart] = useState(null)
    const [total, setTotal] = useState(0)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [modifiedData, setModifiedData] = useState(false)

    const [descuento, setDescuento] = useState(0)
    const [tarjeta, setTarjeta] = useState(null)
    const [tarjetaData, setTarjetaData] = useState(undefined)

    const [loadingUserUpdate, setLoadingUserUpdate] = useState(false)
    const [userUpdateError, setUSerUpdateError] = useState("")
    const [card, setCard] = useState("")
    const [loadingGiftCard, setLoadingGiftCard] = useState(false)
    const [errorGiftCard, setErrorGiftCard] = useState(false)

    const [departamento, setDepartamento] = useState("")
    const [municipio, setMunicipio] = useState("")
    const [municipios, setMunicipios] = useState([])
    const [savedCard, setSavedCard] = useState(null)
    const totalFinal = Math.max(0, total - descuento)

    useEffect(() => {
        if(isAuthenticated){
            setShippingAdress(user?.direccion)
            setPhone(user?.telefono)
        } 
    }, [user])

    async function handleUpdateGiftCard(){
        try {
            let res = await updateGiftCard(tarjeta, tarjetaData?.monto, tarjetaData?.fecha_expiracion, "usada")

            if(res?.valid){
                return true
            }
        } catch (error) {
            console.log(error?.message)
        }
    }

    async function handleProcessCart(){
        try {
            setError("")

            // validar si está autenticado si no redireccionar 
            if (!isAuthenticated) return navigate("/login")
            
            setLoading(true)

            // crear nuevo carrito de compras
            let res = await createCart(user?.id_usuario)

            if(!res?.valid){
                setError("No se pudo procesar la solicitud")
                return
            }

            let new_cart_id = res?.cart?.data?.id_carrito

            // almacenar elementos del carrito de compras
            Object.values(cart).forEach(async (c) => {
                let elementRes = await createElementoCarrito(new_cart_id, c?.id_producto, c?.quantity, Number(c?.precio))

                if(!elementRes?.valid){
                    setError("No se pudo procesar la solicitud")
                    return
                }
            })


            // crear factura no pagada
            let invoiceRes = await createInvoiceOrders(user?.id_usuario, new_cart_id, tarjeta, totalFinal, descuento, "pending")

            if(!invoiceRes?.valid){
                setError("No se pudo procesar la solicitud")
                return
            }


            // iniciar pago en pasarela 
            let preferenceRes = await createPreference(invoiceRes?.order_invoice?.data?.id_factura_pedido)

            if(!preferenceRes?.valid || (!preferenceRes?.preference?.init_point && !preferenceRes?.preference?.successZeroPay)){
                setError("No se pudo procesar la solicitud")
                return
            }
            setTarjeta(null)

            if(preferenceRes?.preference?.successZeroPay){
                handleDeleteCart()
                navigate(`/payment/success?external_reference=${preferenceRes?.preference?.factura}&payment_type=zero`)
                setShowCart(false)
                return
            }

            if(tarjeta) handleUpdateGiftCard()
            handleDeleteCart()
            window.location.href = preferenceRes?.preference?.init_point
            
        } catch (error) {
            console.log(error?.message)
            setError("Error al iniciar pago ")
        } finally {
            setLoading(false)
        }
    }

    // f aux. obtener carrito de compras
    const getCart = () => {
        let saved = localStorage.getItem("cart")

        setCart(saved != null ? JSON.parse(saved) : saved)

        let savedGiftCard = localStorage.getItem("gift-card-to-apply")
        setSavedCard(savedGiftCard != null ? JSON.parse(savedGiftCard) : null)
    }

    // obtener carrito de compras 
    useEffect(() => {
        getCart();
    }, [])

    // calcular precio total del carrito
    useEffect(() => {
        if (cart == null) return

        let baseCartPrice = 0

        Object.values(cart).map(r => {
            baseCartPrice += (r?.quantity*Number(r?.precio))
        })

        setTotal(baseCartPrice)
    }, [cart])

    const handleDeleteCart = () => {
        localStorage.setItem("cart", null);
        localStorage.setItem("gift-card-to-apply", null);
        getCart()
    }

    const handleDepartamentoChange = (dep) => {
        setDepartamento(dep)

        const found = colombia.find(d => d.departamento === dep)
        setMunicipios(found ? found.ciudades : [])

        setMunicipio("")
    }

    const handleUserDataUpdate = async () => {
        try {
            setLoadingUserUpdate(true)
            const fullAddress = `${departamento} / ${municipio} / ${shippingAdress}`

            let res = await userUpdate(null, null, null, phone, fullAddress, user?.id_usuario, user?.id_rol)

            if(!res?.valid){
                setUSerUpdateError(res?.error)
                return
            }

            setModifiedData(true)
        } catch (error) {
            setUSerUpdateError(error?.message)
        } finally {
            setLoadingUserUpdate(false)
        }
    }

    async function searchGiftCard(){
        try {
            setLoadingGiftCard(true)
            setErrorGiftCard(false)

            let res = await getGiftCard(card)

            if(!res?.valid || !res?.tarjeta){
                setErrorGiftCard(true)
                return
            }

            console.log(res?.tarjeta)

            let gifCard = res?.tarjeta

            if(gifCard.estado != "activa"){
                setErrorGiftCard(true)
                return
            }

            setTarjetaData(gifCard)
            setTarjeta(gifCard?.id_tarjeta)
            setDescuento(Number(gifCard?.monto))
        } catch (error) {
            setErrorGiftCard(true)
        } finally {
            setLoadingGiftCard(false)
        }
    }

    useEffect(() => {
        const delay = setTimeout(() => {
            if (card !== "") {
                searchGiftCard()
            }
        }, 500)

        return () => clearTimeout(delay)
    }, [card])

    useEffect(() => {
        if(savedCard?.estado != "usada") setCard(savedCard?.id_tarjeta)
    }, [savedCard])

    console.log(descuento)

    return (
        <div className="overlay-carrito">
            <div className={`cart-container`}>
                {showCart && (
                    <div className="btn-close-cart-container">
                        <button onClick={() => {setShowCart(false)}} className="close-cart-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6.707 5.293l5.293 5.292l5.293 -5.292a1 1 0 0 1 1.414 1.414l-5.292 5.293l5.292 5.293a1 1 0 0 1 -1.414 1.414l-5.293 -5.292l-5.293 5.292a1 1 0 1 1 -1.414 -1.414l5.292 -5.293l-5.292 -5.293a1 1 0 0 1 1.414 -1.414" /></svg>
                        </button>
                    </div>
                )}
                {cart == null ? (
                    <div className="empty-cart">
                        <h1>
                            Carrito de compras vacío
                        </h1>

                        <p>
                            Para antojarte, puedes ver nuestros productos haciendo clic en el siguiente enlace
                        </p>

                        <Link to={"/"}>Clic aquí</Link>
                    </div>
                ) : (
                    confirm ? (
                        <div className="confirmation-card payment-card">

                            <h1>
                                Confirmar orden
                            </h1>

                            {modifiedData ? (
                                <>
                                    <p>
                                        Al continuar con el pago aceptas nuestros terminos y condiciones de pago
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p>
                                        <strong>
                                            Antes de continuar confirma tu dirección de envío y telefono de contacto, si no son correctos por favor actualizalos
                                        </strong>
                                    </p>

                                    <h2>
                                        Datos de envío
                                    </h2>
                                    <span>Confirma los datos de envío antes de realizar la orden</span>

                                    <form action="" onSubmit={(e) => {e.preventDefault(); handleUserDataUpdate()}} className="user-cart-form-modified-data">
                                        <div>
                                            <label htmlFor="">Telefono:</label>
                                            <input type="text" name="telefono" defaultValue={phone} onChange={(e) => {setPhone(e.target.value)}}/>
                                        </div>
                                        <div>
                                            <label htmlFor="">Envío a:</label>
                                            <input type="text" name="direccion" defaultValue={shippingAdress} onChange={(e) => {setShippingAdress(e.target.value)}}/>
                                        </div>
                                        <div>
                                            <label htmlFor="">Departamento</label>
                                            <select onChange={(e) => handleDepartamentoChange(e.target.value)}>
                                                <option value="">Departamento</option>
                                                {colombia.map((d) => (
                                                    <option key={d.id} value={d.departamento}>
                                                        {d.departamento}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="">Municipio</label>
                                            <select 
                                                onChange={(e) => setMunicipio(e.target.value)}
                                                disabled={!departamento}
                                            >
                                                <option value="">Municipio</option>
                                                {municipios.map((m, i) => (
                                                    <option key={i} value={m}>
                                                        {m}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </form>

                                    {userUpdateError && (<p>{userUpdateError}</p>)}
                                </>
                            )}

                            <div className="pay-confirmation-buttons">
                                {modifiedData ? (
                                    <button className="pay-btn"
                                        onClick={() => {handleProcessCart()}}
                                        disabled={loading || !modifiedData}
                                    >
                                        {loading ? 'Cargando' : 'Pagar'}
                                    </button>
                                ) : (
                                    <button className="pay-btn" onClick={(e) => {e.preventDefault(); handleUserDataUpdate()}} disabled={loadingUserUpdate}>
                                        {loadingUserUpdate ? "Guardando..." : "Actualizar"}
                                    </button>
                                )}
                                <button className="pay-btn"
                                    onClick={() => {setConfirm(false)}}
                                >
                                    Cancelar
                                </button>
                            </div>
                            {error != '' && <p>{error}</p>}
                        </div>
                ) : (
                    <>
                        <div className="filled-cart">
                            <h1>Carrito de compras</h1>

                            <div className="products-container">
                                {Object.values(cart).map((r, index) => {

                                    return (
                                        <div key={index} className="product-container">
                                            <div className="image-container">
                                                <img src={createImageURL(r?.imagenes[0]?.filename)} alt={`Portada ${r?.nombre}`} />
                                            </div>
                                            <div className="product-details-cart">
                                                <div>
                                                    <div className="remove-cart">
                                                    <button onClick={() => {removeFromCart(r?.id_producto); getCart()}}>
                                                            remover
                                                        </button>
                                                </div>
                                                    <p>{r?.nombre}</p>
                                                    <p>{r?.referencia_producto?.color} | {r?.referencia_producto?.tamano}</p>
                                                </div>
                                                <div className="quantities-container">
                                                    <div className="info">
                                                        <p>{parsePrice(r?.quantity*Number(r?.precio))}</p>
                                                    </div>
                                                    <div className="actions-buttons-container">
                                                        <button title="Disminuir cantidad" onClick={() => {deleteOne(r?.id_producto); getCart()}}>
                                                            -
                                                        </button>
                                                         <p>{r?.quantity} {r?.quantity > 1}</p>
                                                        <button title="Aumentar cantidad" onClick={() => {addOne(r?.id_producto); getCart()}}>
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                            <div className="payment-card">
                                <h1>Acciones de carrito</h1>
                                <button onClick={() => {handleDeleteCart()}} className="delete-cart-btn">Eliminar carrito</button>

                                <div>
                                    <p className="giftcard-title">Tarjeta de regalo</p>
                                    {tarjeta || savedCard != null ? (
                                        <p>Tarjeta de regalo aplicada | #{card ? card : ""}</p>
                                    ) : (
                                        savedCard == null && (
                                            <div className="giftcard-input-search">
                                                <input type="text" placeholder="Código de tarjeta de regalo" onChange={(e) => {setCard(e.target.value)}}/>
                                                <p className="giftcard-search-p">
                                                    {errorGiftCard && 'Tarjeta no encontrada'}
                                                    {loadingGiftCard && 'Buscando tarjeta...'}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>


                                <div className="totals-cart-container">
                                    <p>Subtotal: {parsePrice(total)}</p>
                                    {descuento > 0 && (<p>Descuento: -{parsePrice(descuento)}</p>)}
                                    <h2>Total: {parsePrice(totalFinal)}</h2>
                                </div>

                            <p>Al pagar los productos aceptas nuestros terminos y condiciones</p>

                                <button className="pay-btn"
                                    onClick={() => {if(isAuthenticated) {setConfirm(true)}else {setShowCart(false); navigate("/login")}}}
                                >
                                    Continuar con el pago
                                </button>
                                {error != '' && <p>{error}</p>}
                                
                            </div>
                        </>
                    )
                )}
            </div>
        </div>
    )
}

export default CartPage