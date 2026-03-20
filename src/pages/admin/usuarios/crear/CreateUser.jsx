import React, { useState } from 'react'
import { createUser } from '../../../../services/authService'
import AdminFormCreate from '../../../../components/admin/AdminFormCreate'
import { useNavigate } from 'react-router-dom'

const CreateUser = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [tipoDocumento, setTipoDocumento] = useState('')
    const [numeroDocumento, setNumeroDocumento] = useState('')
    const [nombres, setNombres] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] = useState('')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [role, setRole] = useState('')

    const documents = {
        "CC": "Cedula de ciudadanía",
        "CE": "Cedula de extranjería",
        "TI": "Tarjeta de identidad",
        "PP": "Pasaporte"
    }

    const roles = {
        "1": "Administrador",
        "2": "Cliente"
    }

    const campos = {

        tipoDocumento: {
            onChange: setTipoDocumento,
            type: 'select',
            name: 'tipo_documento',
            titulo: 'Tipo Documento',
            options: documents
        },

        numeroDocumento: {
            onChange: setNumeroDocumento,
            type: 'text',
            name: 'numero_documento',
            titulo: 'Numero Documento',
        },

        nombres: {
            onChange: setNombres,
            type: 'text',
            name: 'nombres',
            titulo: 'Nombres',
        },

        apellidos: {
            onChange: setApellidos,
            type: 'text',
            name: 'apellidos',
            titulo: 'Apellidos',
        },

        correo: {
            onChange: setCorreo,
            type: 'email',
            name: 'correo',
            titulo: 'Correo',
        },

        contrasena: {
            onChange: setContrasena,
            type: 'password',
            name: 'contrasena',
            titulo: 'Contraseña',
        },

        telefono: {
            onChange: setTelefono,
            type: 'text',
            name: 'telefono',
            titulo: 'Telefono',
        },

        direccion: {
            onChange: setDireccion,
            type: 'text',
            name: 'direccion',
            titulo: 'Direccion',
        },

        role: {
            onChange: setRole,
            type: 'select',
            name: 'id_rol',
            titulo: 'Rol',
            options: roles
        }

    }

    function validateFields() {

    const errors = {}

    // Tipo de documento
    if (!tipoDocumento) {
        errors.tipoDocumento = "Debe seleccionar un tipo de documento"
    }

    // Número de documento: 6 a 12 dígitos numéricos
    const docRegex = /^[0-9]{6,12}$/
    if (!docRegex.test(numeroDocumento)) {
        errors.numeroDocumento =
            "El número de documento debe contener entre 6 y 12 dígitos numéricos"
    }

    // Nombres: solo letras, mínimo 2 caracteres
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/
    if (!nameRegex.test(nombres)) {
        errors.nombres =
            "El nombre debe contener mínimo 2 letras y solo caracteres alfabéticos"
    }

    // Apellidos: solo letras, mínimo 2 caracteres
    if (!nameRegex.test(apellidos)) {
        errors.apellidos =
            "El apellido debe contener mínimo 2 letras y solo caracteres alfabéticos"
    }

    // Teléfono: exactamente 10 dígitos
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(telefono)) {
        errors.telefono =
            "El teléfono debe contener exactamente 10 dígitos numéricos"
    }

    // Dirección: mínimo 5 caracteres
    if (direccion.trim().length < 5) {
        errors.direccion =
            "La dirección debe contener mínimo 5 caracteres"
    }

    // Correo electrónico válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(correo)) {
        errors.correo =
            "Debe ingresar un correo electrónico válido (ejemplo: usuario@correo.com)"
    }

    // Contraseña: mínimo 6 caracteres, mayúscula, minúscula y número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
    if (!passwordRegex.test(contrasena)) {
        errors.contrasena =
            "La contraseña debe tener mínimo 6 caracteres, una mayúscula, una minúscula y un número"
    }

    // Rol obligatorio
    if (!role) {
        errors.role = "Debe seleccionar un rol"
    }

    setFieldErrors(errors)

    return Object.keys(errors).length > 0
    }

    const sendData = async () => {

        try {

            const validation = validateFields()
            console.log(validation)
            if(validation) return


            setLoading(true)
            setError("")

            let res = await createUser(nombres, apellidos, tipoDocumento, numeroDocumento, telefono, direccion, correo, contrasena, role)

            if(!res?.valid){
                setError("Error al crear usuario")
                return
            }

            navigate("/admin/users")

        } catch (error) {
            setError("Error al enviar el formulario")
        } finally {
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
        />

    )
}

export default CreateUser
