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

const CartPage = ({setShowCart = undefined, showCart = false}) => {
    const navigate = useNavigate()
    const { isAuthenticated, user } = useAuth()
    const [shippingAdress, setShippingAdress] = useState("")
    const [phone, setPhone] = useState("")
    const [modifyData, setModifyData] = useState(false)
    const [cart, setCart] = useState(null)
    const [total, setTotal] = useState(0)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [confirm, setConfirm] = useState(false)

    const [descuento, setDescuento] = useState(0)
    const [tarjeta, setTarjeta] = useState(null)
    const [tarjetaData, setTarjetaData] = useState(undefined)

    const [loadingUserUpdate, setLoadingUserUpdate] = useState(false)
    const [userUpdateError, setUSerUpdateError] = useState("")
    const [card, setCard] = useState("")
    const [loadingGiftCard, setLoadingGiftCard] = useState(false)
    const [errorGiftCard, setErrorGiftCard] = useState(false)

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
            let invoiceRes = await createInvoiceOrders(user?.id_usuario, new_cart_id, tarjeta, total, descuento, "pending")

            if(!invoiceRes?.valid){
                setError("No se pudo procesar la solicitud")
                return
            }


            // iniciar pago en pasarela 
            let preferenceRes = await createPreference(invoiceRes?.order_invoice?.data?.id_factura_pedido)

            if(!preferenceRes?.valid || !preferenceRes?.preference?.init_point){
                setError("No se pudo procesar la solicitud")
                return
            }
            setTarjeta(null)


            if(tarjeta) handleUpdateGiftCard()
            handleDeleteCart()
            window.location.href = preferenceRes?.preference?.init_point
            
        } catch (error) {
            setError("Error al iniciar pago ")
        } finally {
            setLoading(false)
        }
    }

    // f aux. obtener carrito de compras
    const getCart = () => {
        let saved = localStorage.getItem("cart")

        setCart(saved != null ? JSON.parse(saved) : saved)
    }

    // obtener carrito de compras 
    useEffect(() => {
        getCart()
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
        getCart()
    }

    const handleUserDataUpdate = async () => {
        try {
            setLoadingUserUpdate(true)

            let res = await userUpdate(null, null, null, phone, shippingAdress, user?.id_usuario, user?.id_rol)

            if(!res?.valid){
                setUSerUpdateError(res?.error)
                return
            }

            setModifyData(false)
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

    console.log(tarjetaData)

    useEffect(() => {
        if(descuento > total) setTotal(0)
    }, [descuento])

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

                            {modifyData ? (
                                <>
                                    <h1>
                                        Actualizar datos de envío
                                    </h1>

                                    <form action="" onSubmit={(e) => {e.preventDefault(); handleUserDataUpdate()}}>
                                        <div>
                                            <label htmlFor="">Telefono</label>
                                            <input type="text" name="telefono" defaultValue={phone} onChange={(e) => {setPhone(e.target.value)}}/>
                                        </div>
                                        <div>
                                            <label htmlFor="">Dirección</label>
                                            <input type="text" name="direccion" defaultValue={shippingAdress} onChange={(e) => {setShippingAdress(e.target.value)}}/>
                                        </div>
                                    </form>

                                    {userUpdateError && (<p>{userUpdateError}</p>)}
                                </>

                            ) : (
                                <>
                                    <h1>
                                        Confirmar orden
                                    </h1>

                                    <p>
                                        <strong>
                                            Antes de continuar confirma tu dirección de envío y telefono de contacto, si no son correctos por favor actualizalos
                                        </strong>
                                    </p>

                                    <ul>
                                        <li><strong>Telefono de contacto:</strong> {phone}</li>
                                        <li><strong>Dirección de envío:</strong> {shippingAdress}</li>
                                    </ul>
                                    
                                    <button className="pay-btn" onClick={() => {setModifyData(!modifyData)}}>{modifyData ? 'cerrar' : 'Modificar'}</button>

                                    <p>
                                        Si estos son tus datos correctos confirma la orden haciendo clic en el siguiente botón
                                    </p>

                                    <p>
                                        Al continuar con el pago aceptas nuestros terminos y condiciones de pago
                                    </p>

                                    <div className="pay-confirmation-buttons">
                                        <button className="pay-btn"
                                            onClick={() => {handleProcessCart()}}
                                            disabled={loading}
                                        >
                                            {loading ? 'Cargando' : 'Pagar'}
                                        </button>
                                        {error != '' && <p>{error}</p>}
                                        <button className="pay-btn"
                                            onClick={() => {setConfirm(false)}}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                    {error != '' && <p>{error}</p>}
                                </>
                            )}

                            <div className="pay-confirmation-buttons">
                                {modifyData && (
                                    <button className="pay-btn" onClick={(e) => {e.preventDefault(); handleUserDataUpdate()}} disabled={loadingUserUpdate}>
                                        {loadingUserUpdate ? "Guardando..." : "Actualizar"}
                                    </button>
                                )}
                            </div>
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
                                                        <p>{r?.nombre}</p>
                                                        <p>{r?.referencia_producto?.color} | {r?.referencia_producto?.tamano}</p>
                                                    </div>
                                                    <div className="quantities-container">
                                                        <div className="info">
                                                            <p>{r?.quantity} unidad{r?.quantity > 1 && 'es'}</p>
                                                            <p>Valor: {parsePrice(r?.quantity*Number(r?.precio))}</p>
                                                        </div>
                                                        <div className="actions-buttons-container">
                                                            <button title="Aumentar cantidad" onClick={() => {addOne(r?.id_producto); getCart()}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#996c74" className="icon icon-tabler icons-tabler-filled icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1 -2 0v-6h-6a1 1 0 0 1 0 -2h6v-6a1 1 0 0 1 1 -1" /></svg>
                                                            </button>
                                                            <button title="Disminuir cantidad" onClick={() => {deleteOne(r?.id_producto); getCart()}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#996c74" className="icon icon-tabler icons-tabler-filled icon-tabler-crop-16-9"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 7a3 3 0 0 1 3 3v4a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-4a3 3 0 0 1 3 -3z" /></svg>
                                                            </button>
                                                            <button title="Eliminar producto del carrito" onClick={() => {removeFromCart(r?.id_producto); getCart()}}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#996c74" className="icon icon-tabler icons-tabler-filled icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007zm-10 4a1 1 0 0 0 -1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0 -1 -1m4 0a1 1 0 0 0 -1 1v6a1 1 0 0 0 2 0v-6a1 1 0 0 0 -1 -1" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005z" /></svg>
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
                                    {tarjeta ? (
                                        <p>Tarjeta de regalo aplicada</p>
                                    ) : (
                                        <div className="giftcard-input-search">
                                            <input type="text" placeholder="Código de tarjeta de regalo" onChange={(e) => {setCard(e.target.value)}}/>
                                            <p className="giftcard-search-p">
                                                {errorGiftCard && 'Tarjeta no encontrada'}
                                                {loadingGiftCard && 'Buscando tarjeta...'}
                                            </p>
                                        </div>
                                    )}
                                </div>


                                <h2>Total: {parsePrice((total-descuento))}</h2>

                                <p>Al pagar los productos aceptas nuestros terminos y condiciones</p>

                                <button className="pay-btn"
                                    onClick={() => {setConfirm(true)}}
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