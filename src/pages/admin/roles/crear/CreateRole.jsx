import React, { useState } from 'react'
import { createRol } from '../../../../services/rolesService'
import AdminFormCreate from '../../../../components/admin/AdminFormCreate'
import { useNavigate } from 'react-router-dom'

const CreateRole = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [nombre, setNombre] = useState('')
    
    const campos = {
        //nombre de bd 
        nombre: {
            //la funcion que va a cambiar el dato
			onChange: setNombre,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'nombre',
            //nombre visible 
			titulo: 'Nombre',
		}
    }

    function validateFields(){
        const errors = {};

            const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
            if (nombre != '' && !nameRegex.test(nombre)) {
                errors.nombre = "El nombre solo debe contener letras y espacios";
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
            let res = await createRol(nombre)
        
            if(!res?.valid){
                setError("Error al enviar el formulario")
                return
            }

            navigate("/admin/roles")

        } catch (error) {
            setError("Error al enviar el formulario")
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <AdminFormCreate
            titulo={'Crear roles'}
            campos={campos}
            linkRegresar={"/admin/roles"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={'Crear rol'}
            loading={loading}
        ></AdminFormCreate>
  	)
}

export default CreateRole