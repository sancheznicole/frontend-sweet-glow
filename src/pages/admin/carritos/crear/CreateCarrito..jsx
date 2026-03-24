import React, { useState } from 'react'
import { createCart } from '../../../../services/cartService'
import AdminFormCreate from '../../../../components/admin/AdminFormCreate'
import { useNavigate } from 'react-router-dom'
import { searchUsers } from '../../../../services/authService'


const CreateCarrito = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [status, setStatus] = useState('')
    const [id_usuario, setId_usuario] = useState('')

    const options = {
        active: "Activo",
        checked_out: "Revisado"
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

        status: {
            //la funcion que va a cambiar el dato
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

    function validateFields() {

        const errors = {}
        if (!status) {
            errors.status =
                "Debes seleccionar una opcion válida"
        }

        // Usuario obligatorio
        if (!id_usuario) {
            errors.id_usuario =
                "Debe seleccionar un usuario"
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
            let res = await createCart(id_usuario, status)
        
            if(!res?.valid){
                setError("Error al enviar el formulario")
                return
            }

            navigate("/admin/cart")

        } catch (error) {
            setError("Error al enviar el formulario")
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <AdminFormCreate
            titulo={'Crear carrito'}
            campos={campos}
            linkRegresar={"/admin/cart"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={'Crear carrito'}
            loading={loading}
        ></AdminFormCreate>
  	)
}

export default CreateCarrito