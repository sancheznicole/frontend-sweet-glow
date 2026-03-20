import { useNavigate } from "react-router-dom"
import { createInvoiceOrders } from "../../../../services/facturaPedidosService"
import { useState } from "react"
import { searchUsers } from "../../../../services/authService"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"

const CreateOrderInvoice = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [neto, setNeto] = useState('')
    const [id_usuario, setId_usuario] = useState('')

    
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

        cantidad: {
            //la funcion que va a cambiar el dato
			onChange: setNeto,
            //tipo de input
			type: 'number',
            //nombre del input 
			name: 'neto',
            //nombre visible 
			titulo: 'Neto',
		},
    }

    function validateFields() {
        const errors = {}

        // Neto: número mayor a 0
        const netoRegex = /^[0-9]+$/

        if (!netoRegex.test(neto) || parseInt(neto) <= 0) {
            errors.neto = "El neto debe ser un número mayor a 0"
        }

        // Usuario obligatorio
        if (!id_usuario) {
            errors.id_usuario = "Debe seleccionar un usuario"
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
            let res = await createInvoiceOrders(id_usuario, neto)
        
            if(!res?.valid){
                setError("Error al enviar el formulario")
                return
            }

            navigate("/admin/invoice-orders")

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