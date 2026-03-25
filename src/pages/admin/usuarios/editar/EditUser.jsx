import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { getUser, userUpdate } from "../../../../services/authService"
import { useNavigate } from "react-router-dom"

const EditUser = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  const [mostrarDatos, setMostrarDatos] = useState(false)

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
    1: "Administrador",
    2: "Cliente",
  }

  function validateFields() {

    const errors = {}

    if (!tipoDocumento) {
      errors.tipoDocumento = "Seleccione un tipo de documento"
    }

    const docRegex = /^[0-9]{6,12}$/
    if (!docRegex.test(numeroDocumento)) {
      errors.numeroDocumento = "El número debe tener entre 6 y 12 dígitos"
    }

    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/
    if (!nameRegex.test(nombres)) {
      errors.nombres = "Solo letras"
    }

    if (!nameRegex.test(apellidos)) {
      errors.apellidos = "Solo letras"
    }

    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(telefono)) {
      errors.telefono = "Teléfono debe tener 10 dígitos"
    }

    if (direccion.trim().length < 5) {
      errors.direccion = "Dirección inválida"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(correo)) {
      errors.correo = "Correo inválido"
    }

    setFieldErrors(errors)

    console.log(errors)

    return Object.keys(errors).length > 0
  }

  async function sendData() {

    try {

      const validation = validateFields()
      if (validation) return

      setLoading(true)
      setError("")

      const res = await userUpdate(nombres, apellidos, correo, telefono, direccion, id, role)

      if (!res?.valid) {
        setError("Error al actualizar")
        return
      }

      setMostrarDatos(false)

    } catch (error) {

      setError(error.message)

    } finally {

      setLoading(false)

    }
  }

  useEffect(() => {

    const getData = async () => {

      try {

        const res = await getUser(id)

        if (!res?.valid) {
          setError("Error al obtener usuario")
          return
        }

        const user = res.user

        setTipoDocumento(user.tipo_documento)
        setNumeroDocumento(user.num_documento)
        setNombres(user.nombres)
        setApellidos(user.apellidos)
        setCorreo(user.correo)
        setContrasena(user.contrasena)
        setTelefono(user.telefono)
        setDireccion(user.direccion)
        setRole(user.id_rol)

      } catch (error) {

        setError(error.message)

      }
    }

    getData()

  }, [id])

  const fields = {

    tipoDocumento: {
      value: tipoDocumento,
      onChange: setTipoDocumento,
      type: "select",
      name: "tipoDocumento",
      titulo: "Tipo Documento",
      options: documents
    },

    numeroDocumento: {
      value: numeroDocumento,
      onChange: setNumeroDocumento,
      type: "text",
      name: "numeroDocumento",
      titulo: "Numero Documento"
    },

    nombres: {
      value: nombres,
      onChange: setNombres,
      type: "text",
      name: "nombres",
      titulo: "Nombres"
    },

    apellidos: {
      value: apellidos,
      onChange: setApellidos,
      type: "text",
      name: "apellidos",
      titulo: "Apellidos"
    },

    correo: {
      value: correo,
      onChange: setCorreo,
      type: "email",
      name: "correo",
      titulo: "Correo"
    },

    telefono: {
      value: telefono,
      onChange: setTelefono,
      type: "text",
      name: "telefono",
      titulo: "Telefono"
    },

    direccion: {
      value: direccion,
      onChange: setDireccion,
      type: "text",
      name: "direccion",
      titulo: "Direccion"
    },

    id_rol: {
      value: role,
      onChange: setRole,
      type: "select",
      name: "id_rol",
      titulo: "Rol",
      options: roles,
    }

  }

  return (

    <div className="page-container">

      {!mostrarDatos && (
        <div className="back-link-container">
          <button className="link-regresar" onClick={() => navigate(-1)}>
            Regresar
          </button>
        </div>
      )}

      <section className="section-editar">

        {!mostrarDatos ? (

          <>
            <h1 className="titulo-por-h1">
              Detalles del usuario {nombres}
            </h1>

            <div className="contenedor-campos">
              
              <p><strong>Rol:</strong> {roles[String(role)] || "Sin rol"}</p>
              <p><strong>Nombres y Apellidos:</strong> {nombres} {apellidos}</p>
              <p><strong>Tipo de documento:</strong> {tipoDocumento}</p>
              <p><strong>Numero de documento:</strong> {numeroDocumento}</p>
              <p><strong>Correo: </strong> {correo}</p>
              <p><strong>telefono:</strong> {telefono}</p>
              <p><strong>Direccion:</strong> {direccion}</p>

            </div>
          </>

        ) : (

          <AdminFormEdit
            titulo="Editar Usuario"
            campos={fields}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button="Guardar cambios"
            loading={loading}
          />

        )}

        <div className="contenedor-editar-botones">

          <button
            className={mostrarDatos ? "cancelar-profile" : "modificar-profile"}
            onClick={() => setMostrarDatos(!mostrarDatos)}
          >
            {mostrarDatos ? "Cancelar" : "Modificar"}
          </button>

        </div>

      </section>

    </div>

  )
}

export default EditUser
