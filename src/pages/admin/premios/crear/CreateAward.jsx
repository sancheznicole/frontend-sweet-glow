import React, { useState } from 'react'
import { CreatePremio, createPremios } from '../../../../services/awardsService'
import AdminFormCreate from '../../../../components/admin/AdminFormCreate'
import { useNavigate } from 'react-router-dom'

/* me falta el validatefields o con errores y el cargando */
const CreateAward = () => {
    //usestate para guardar el valor del input
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [id_producto, setId_producto] = useState('')
    
    const campos = {
        //nombre de bd 
        id_producto: {
            //la funcion que va a cambiar el dato
			onChange: setId_producto,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'id_producto',
            //nombre visible 
			titulo: 'Id producto',
		}
    }

    function validateFields(){
        const errors = {};

            if(id_producto === "") errors.id_producto = "El id producto es obligatorio"
            
        setFieldErrors(errors)
        return Object.keys(errors).length > 0
    }

    const sendData = async () => {
        try {

            const validation = validateFields();
            
            if(validation) return

            setLoading(true)

            setError("")
            let res = await CreatePremio(id_producto)
        
            if(!res?.valid){
                setError("Error al enviar el formulario")
                return
            }

            navigate("/admin/premios")

        } catch (error) {
            setError("Error al enviar el formulario")
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <AdminFormCreate
            titulo={'Crear Premios'}
            campos={campos}
            linkRegresar={"/admin/premios"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={'Crear premio'}
            loading={loading}
        ></AdminFormCreate>
  	)
}

export default CreateAward