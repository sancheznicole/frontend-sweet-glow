import { useNavigate } from "react-router-dom"
import { createInvoiceOrders } from "../../../../services/facturaPedidosService"
import { useState } from "react"
import { searchUsers } from "../../../../services/authService"
import { searchGiftCard } from "../../../../services/giftCardService"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import { searchCart } from "../../../../services/cartService"

const CreateOrderInvoice = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [neto, setNeto] = useState('')
    const [id_usuario, setId_usuario] = useState('')
    const [id_carrito, setId_carrito] = useState("")
    const [id_tarjeta, setId_tarjeta] = useState('')
    const [descuento, setDescuento] = useState("")
    const [status, setStatus] = useState("")

    
    const options = {
        pending: "Pendiente",
        paid: "Pagado",
        failed: "Fallo al pagar"
    }

    const campos = {

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
		},

        id_carrito: {
            //la funcion que va a cambiar el dato
			onChange: setId_carrito,
            //tipo de input
			type: 'text-search',
            //nombre del input 
			name: 'id_carrito',
            //nombre visible 
			titulo: 'Carrito',

            searchFunction: searchCart,
            data_key: 'carts',
            save_data_key: 'id_carrito',
            text_keys: 'id_carrito',
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
		},

        descuento: {
            //la funcion que va a cambiar el dato
			onChange: setDescuento,
            //tipo de input
			type: 'number',
            //nombre del input 
			name: 'descuento',
            //nombre visible 
			titulo: 'Descuento'
		},

        status: {
            //la funcion que va a cambiar el dato
			onChange: setStatus,
            //tipo de input
			type: 'select',
            //nombre del input 
			name: 'status',
            //nombre visible 
			titulo: 'Estado',
            options: options,
            value: status
		},
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

        if (descuento !== '' && (isNaN(descuento) || Number(descuento) < 0)) {
            errors.descuento = "El descuento debe ser un número igual o mayor a 0"
        }

        // Status obligatorio
        if (!status) {
            errors.status = "Debe seleccionar un estado"
        }

        setFieldErrors(errors)

        return Object.keys(errors).length > 0
    }

    const sendData = async () => {
        try {

            const validation = validateFields();
            
            if(validation) return

            setLoading(true)

            setError("")
            let res = await createInvoiceOrders(id_usuario, id_carrito, id_tarjeta, neto, descuento, status)
        
            if(!res?.valid){
                setError("Error al enviar el formulario")
                return
            }

            navigate(-1)

        } catch (error) {
            setError("Error al enviar el formulario")
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <AdminFormCreate
            titulo={'Crear factura'}
            campos={campos}
            linkRegresar={"/admin/invoice-orders"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={'Crear factura'}
            loading={loading}
        ></AdminFormCreate>
    )
}

export default CreateOrderInvoice