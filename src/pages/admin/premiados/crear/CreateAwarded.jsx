import React, { useState } from 'react'
import { createPremiado, createPremiado } from '../../../../services/awardedService'
import AdminFormCreate from '../../../../components/admin/AdminFormCreate'
import { useNavigate } from 'react-router-dom'

/* me falta el validatefields o con errores y el cargando */
const CreateAwarded = () => {
    //usestate para guardar el valor del input
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [id_premio, setId_premio] = useState('')
    const [id_usuario, setId_usuario] = useState('') 
    const [id_inscripcion, setId_inscripcion] = useState('')
    
    
    const campos = {
        //nombre de bd 
        id_premio: {
            //la funcion que va a cambiar el dato
			onChange: setId_premio,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'id_premio',
            //nombre visible 
			titulo: 'Id_premio',
		},

        id_usuario: {
            //la funcion que va a cambiar el dato
			onChange: setId_usuario,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'id_usuario',
            //nombre visible 
			titulo: 'Id_usuario',
		},

        id_inscripcion: {
            //la funcion que va a cambiar el dato
			onChange: setId_inscripcion,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'id_inscripcion',
            //nombre visible 
			titulo: 'Id_inscripcion',
		},

    }

    function validateFields(){
        const errors = {};


        if(id_premio === "") errors.id_premio = "El id premio es obligatorio"
        if(id_usuario === "") errors.id_usuario = "El id usuario es obligatorio"
        if(id_inscripcion === "") errors.id_inscripcion = "El id inscripcion es obligatorio"
            
        setFieldErrors(errors)
        return Object.keys(errors).length > 0
    }

    const sendData = async () => {
        try {

            const validation = validateFields();
            
            if(validation) return

            setLoading(true)

            setError("")
            let res = await createPremiado(id_premio, id_usuario, id_inscripcion)
        
            if(!res?.valid){
                setError("Error al enviar el formulario")
                return
            }

            navigate("/admin/premiados")

        } catch (error) {
            setError("Error al enviar el formulario")
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <AdminFormCreate
            titulo={'Crear premiados'}
            campos={campos}
            linkRegresar={"/admin/premiados"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={'Crear premiado'}
            loading={loading}
        ></AdminFormCreate>
  	)
}

export default CreateAwarded