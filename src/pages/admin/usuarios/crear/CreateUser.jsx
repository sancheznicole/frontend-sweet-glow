import React, { useState } from 'react'
import { createUser } from '../../../../services/authService'
import AdminFormCreate from '../../../../components/admin/AdminFormCreate'
import { useNavigate } from 'react-router-dom'

/* me falta el validatefields o con errores y el cargando */
const CreateUser = () => {
    //usestate para guardar el valor del input
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [tipoDocumento,  setTipoDocumento] = useState('')
    const [numeroDocumento,  setNumeroDocumento] = useState('')
    const [nombres,  setNombres] = useState('')
    const [apellidos,  setApellidos] = useState('')
    const [correo,  setCorreo] = useState('')
    const [contrasena,  setContrasena] = useState('')
    const [telefono,  setTelefono] = useState('')
    const [direccion,  setDireccion] = useState('')
    
    const campos = {
        //nombre de bd 
        tipoDocumento: {
            //la funcion que va a cambiar el dato
			onChange: setTipoDocumento,
            //tipo de input
			type: 'select',
            
            //options -------------
            //nombre del input 
			name: 'tipoDocumento',
            //nombre visible 
			titulo: 'Tipo Documento',
		},

        numeroDocumento: {
            //la funcion que va a cambiar el dato
			onChange: setNumeroDocumento,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'numeroDocumento',
            //nombre visible 
			titulo: 'Numero Documento',
		},

        nombres: {
            //la funcion que va a cambiar el dato
			onChange: setNombres,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'nombres',
            //nombre visible 
			titulo: 'Nombres',
		},

        apellidos: {
            //la funcion que va a cambiar el dato
			onChange: setApellidos,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'apellidos',
            //nombre visible 
			titulo: 'Apellidos',
		},

        correo: {
            //la funcion que va a cambiar el dato
			onChange: setCorreo,
            //tipo de input
			type: 'email',
            //nombre del input 
			name: 'correo',
            //nombre visible 
			titulo: 'Correo',
		},

        contrasena: {
            //la funcion que va a cambiar el dato
			onChange: setContrasena,
            //tipo de input
			type: 'password',
            //nombre del input 
			name: 'contrasena',
            //nombre visible 
			titulo: 'Contraseña',
		},

        telefono: {
            //la funcion que va a cambiar el dato
			onChange: setTelefono,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'telefono',
            //nombre visible 
			titulo: 'Telefono',
		},

        direccion: {
            //la funcion que va a cambiar el dato
			onChange: setDireccion,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'direccion',
            //nombre visible 
			titulo: 'direccion',
		}
    }

    function validateFields(){
    const errors = {};

    // Tipo documento
    if (!tipoDocumento) {
      errors.tipoDocumento = "Seleccione un tipo de documento";
    }

    // Número documento
    const docRegex = /^[0-9]{6,12}$/;
    if (!docRegex.test(numeroDocumento)) {
      errors.numeroDocumento = "El número de documento debe tener entre 6 y 12 dígitos";
    }

    // Nombres
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
    if (!nameRegex.test(nombres)) {
      errors.nombres = "El nombre solo debe contener letras y espacios";
    }

    // Apellidos
    if (!nameRegex.test(apellidos)) {
      errors.apellidos = "El apellido solo debe contener letras y espacios";
    }

    // Teléfono
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(telefono)) {
      errors.telefono = "El teléfono debe tener 10 dígitos";
    }

    // Dirección
    if (direccion.trim().length < 5) {
      errors.direccion = "La dirección no es válida";
    }

    // Correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      errors.correo = "El correo electrónico no es válido";
    }

    // Contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(contrasena)) {
      errors.contrasena =
        "La contraseña debe tener mínimo 6 caracteres, una mayúscula y un número";
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
            let res = await createUser(tipoDocumento, numeroDocumento, nombres, apellidos, correo, contrasena,  telefono, direccion)
        
            if(!res?.valid){
                setError("Error al enviar el formulario")
                return
            }

            navigate("admin/users")

        } catch (error) {
            setError("Error al enviar el formulario")
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <AdminFormCreate
            titulo={'Crear usuario'}
            campos={campos}
            linkRegresar={"/admin/users"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={'Crear usuario'}
            loading={loading}
        ></AdminFormCreate>
  	)
}

export default CreateUser