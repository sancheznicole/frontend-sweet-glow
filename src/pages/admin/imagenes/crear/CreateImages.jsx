import React, { useState } from 'react'
import { CreateImages } from '../../../../services/imagesService'
import AdminFormCreate from '../../../../components/admin/AdminFormCreate'
import { useNavigate } from 'react-router-dom'

/* me falta el validatefields o con errores y el cargando */
const CreateImages = () => {
    //usestate para guardar el valor del input
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [filename, setFilename] = useState('')
    const [id_producto, setId_producto] = useState('')
    
    const campos = {
        //nombre de bd 
        filename: {
            //la funcion que va a cambiar el dato
			onChange: setFilename,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'filename',
            //nombre visible 
			titulo: 'Filename',
		},

        id_producto: {
            //la funcion que va a cambiar el dato
			onChange: setId_producto,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'id_producto',
            //nombre visible 
			titulo: 'Id_producto',
		},

    }

    function validateFields(){
        const errors = {};


        if(filename === "") errors.filename = "El filename es obligatorio"
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
            let res = await CreateImages(filename, id_producto)
        
            if(!res?.valid){
                setError("Error al enviar el formulario")
                return
            }

            navigate("/admin/imagen")

        } catch (error) {
            setError("Error al enviar el formulario")
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <AdminFormCreate
            titulo={'Crear imagenes'}
            campos={campos}
            linkRegresar={"/admin/imagen"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={'Crear imagen'}
            loading={loading}
        ></AdminFormCreate>
  	)
}

export default CreateImages