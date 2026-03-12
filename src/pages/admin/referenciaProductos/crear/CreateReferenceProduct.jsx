import React, { useState } from 'react'
import { CreateReferencia } from '../../../../services/referenceProductsService'
import AdminFormCreate from '../../../../components/admin/AdminFormCreate'
import { useNavigate } from 'react-router-dom'

/* me falta el validatefields o con errores y el cargando */
const CreateReferenceProduct = () => {
    //usestate para guardar el valor del input
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [codigo, setCodigo] = useState('')
    const [color, setColor] = useState('')
    const [tamaño, setTamaño] = useState('')
    
    const campos = {
        //nombre de bd 
        codigo: {
            //la funcion que va a cambiar el dato
			onChange: setCodigo,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'codigo',
            //nombre visible 
			titulo: 'Codigo',
		},

        color: {
            //la funcion que va a cambiar el dato
			onChange: setColor,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'color',
            //nombre visible 
			titulo: 'Color',
		},

        tamaño: {
            //la funcion que va a cambiar el dato
			onChange: setTamaño,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'tamaño',
            //nombre visible 
			titulo: 'Tamaño',
		}

    }

    function validateFields(){
        const errors = {};


        if(codigo === "") errors.codigo = "El codigo es obligatorio"
        if(color === "") errors.color = "El color es obligatorio"
        if(tamaño === "") errors.tamaño = "El tamaño es obligatorio"
            
        setFieldErrors(errors)
        return Object.keys(errors).length > 0
    }

    const sendData = async () => {
        try {

            const validation = validateFields();
            
            if(validation) return

            setLoading(true)

            setError("")
            let res = await CreateReferencia(codigo, color, tamaño)
        
            if(!res?.valid){
                setError("Error al enviar el formulario")
                return
            }

            navigate("/admin/referencia")

        } catch (error) {
            setError("Error al enviar el formulario")
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <AdminFormCreate
            titulo={'Crear referencia productos'}
            campos={campos}
            linkRegresar={"/admin/referencia"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={'Crear referencia'}
            loading={loading}
        ></AdminFormCreate>
  	)
}

export default CreateReferenceProduct