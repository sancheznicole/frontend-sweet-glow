import { searchUsers } from "../../../../services/authService"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { updateInvoiceOrders, getInvoiceOrders } from "../../../../services/facturaPedidosService"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { searchCart } from "../../../../services/cartService"
import { searchGiftCard } from "../../../../services/giftCardService"
import { useNavigate } from "react-router-dom"


const EditOrderInvoice = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})
    const [mostrarDatos, setMostrarDatos] = useState(false)

    const [neto, setNeto] = useState('')
    const [id_usuario, setId_usuario] = useState('')
    const [date, setDate] = useState('')
    const [user, setUser] = useState({})
    const [cart, setCart] = useState({})
    const [card, setCard] = useState({})

    const [id_carrito, setId_carrito] = useState("")
    const [id_tarjeta, setId_tarjeta] = useState('')
    const [descuento, setDescuento] = useState("")
    const [status, setStatus] = useState("")

    const options = {
        pending: "Pendiente",
        paid: "Pagado",
        failed: "Fallo al pagar"
    }
    
    function validateFields() {
        const errors = {}

        // Neto: número mayor a 0
        const netoRegex = /^[0-9]+(\.[0-9]{1,2})?$/ // acepta decimales opcionales
        if (!neto || !netoRegex.test(neto) || parseFloat(neto) <= 0) {
            errors.neto = "El neto debe ser un número mayor a 0"
        }

        // Usuario obligatorio
        if (!id_usuario) {
            errors.id_usuario = "Debe seleccionar un usuario"
        }

        // Carrito obligatorio
        if (!id_carrito) {
            errors.id_carrito = "Debe seleccionar un carrito"
        }

        // Descuento: opcional pero si existe, debe ser >=0
        if (descuento && (isNaN(descuento) || parseFloat(descuento) < 0)) {
            errors.descuento = "El descuento debe ser un número igual o mayor a 0"
        }

        // Status obligatorio
        if (!status) {
            errors.status = "Debe seleccionar un estado"
        }

        setFieldErrors(errors)

        return Object.keys(errors).length > 0
    }

    async function sendData() {

        try {

            const validation = validateFields()
            if (!validation) return

            setLoading(true)

            const res = await updateInvoiceOrders(id, id_usuario, id_carrito, id_tarjeta, neto, descuento, status)

            if (!res?.valid) {
                setError("Error al actualizar")
                return
            }

            setMostrarDatos(false)

        } catch (error) {

            setError(error.message)

        } finally {

            setLoading(false)

        }
    }

    useEffect(() => {

        const getData = async () => {

            try {

                const res = await getInvoiceOrders(id)

                if (!res?.valid) {
                    setError("Error al obtener carrito")
                    return
                }

                const o = res.InvoiceOrders

                console.log(o)

                setNeto(o?.neto)
                setId_usuario(o?.id_usuario)
                setUser(o?.usuario)
                setDate(o?.created_at)
                setCard(o?.tarjeta ?? {})
                setCart(o?.carrito)

            } catch (error) {
                setError(error.message)

            }
        }
        
        getData()

    }, [id])

    const fields = {

        id_usuario: {
            //la funcion que va a cambiar el dato
			onChange: setId_usuario,
            //tipo de input
			type: 'text-search',
            //nombre del input 
			name: 'id_usuario',
            //nombre visible 
			titulo: 'Usuario',

            searchFunction: searchUsers,
            data_key: 'users',
            save_data_key: 'id_usuario',
            text_keys: 'nombres,apellidos,correo',
            initial_show_value: `${user?.nombres} ${user?.apellidos} ${user?.correo}`
		},

        id_carrito: {
            //la funcion que va a cambiar el dato
            onChange: setId_carrito,
            //tipo de input
            type: 'text-search',
            //nombre del input 
            name: 'id_carrito',
            //nombre visible 
            titulo: 'ID carrito',

            searchFunction: searchCart,
            data_key: 'carts',
            save_data_key: 'id_carrito',
            text_keys: 'id_carrito',
            initial_show_value: `${cart?.id_carrito}`
        },

        id_tarjeta: {
            //la funcion que va a cambiar el dato
            onChange: setId_tarjeta,
            //tipo de input
            type: 'text-search',
            //nombre del input 
            name: 'id_tarjeta',
            //nombre visible 
            titulo: 'Tarjeta regalo',

            searchFunction: searchGiftCard,
            data_key: 'tarjetas',
            save_data_key: 'id_tarjeta',
            text_keys: 'id_tarjeta,monto',
            initial_show_value: `${card?.id_tarjeta}`
        },

        neto: {
            //la funcion que va a cambiar el dato
            onChange: setNeto,
            //tipo de input
            type: 'number',
            //nombre del input 
            name: 'neto',
            //nombre visible 
            titulo: 'Neto',
            value: neto
        },

        descuento: {
            //la funcion que va a cambiar el dato
            onChange: setDescuento,
            //tipo de input
            type: 'number',
            //nombre del input 
            name: 'descuento',
            //nombre visible 
            titulo: 'Descuento',
            value: descuento
        },

        status: {
            //la funcion que va a cambiar el dato
            value: status,
            onChange: setStatus,
            //tipo de input
            type: 'select',
            //nombre del input 
            name: 'status',
            //nombre visible 
            titulo: 'Estado',
            options: options
        },
    }

    return (
        <div className="page-container">

            {!mostrarDatos && (
                <div className="back-link-container">
                    <button className="link-regresar" onClick={() => navigate(-1)}>
                        Regresar
                    </button>
                </div>
            )}

            <section className="section-editar">

                {!mostrarDatos ? (

                    <>
                        <h1 className="titulo-por-h1">
                            Detalles de la factura
                        </h1>

                        <div className="contenedor-campos">

                            <p><strong>Usuario:</strong> {user?.nombres} {user?.apellidos}</p>
                            <p><strong>Neto:</strong> {`$${Number(neto).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}</p>
                            <p><strong>Fecha de creación:</strong> {date.split('T')[0]}</p>

                        </div>
                    </>

                ) : (

                    <AdminFormEdit
                        titulo="Editar factura"
                        campos={fields}
                        onSendForm={sendData}
                        error={error}
                        fieldErrors={fieldErrors}
                        button="Guardar cambios"
                        loading={loading}
                    />

                )}

                <div className="contenedor-editar-botones">

                    <button
                        className={mostrarDatos ? "cancelar-profile" : "modificar-profile"}
                        onClick={() => setMostrarDatos(!mostrarDatos)}
                    >
                        {mostrarDatos ? "Cancelar" : "Modificar"}
                    </button>

                </div>

            </section>

        </div>
    )
}

export default EditOrderInvoice