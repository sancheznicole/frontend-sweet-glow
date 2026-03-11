import { useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { updateRole, getRole } from "../../../../services/rolesService"
import { Link } from "react-router-dom"

const EditRole = () => {

  // obtener id desde la url
  const { id } = useParams()

  // estados generales
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  // mostrar información o formulario
  const [mostrarDatos, setMostrarDatos] = useState(false)

  // estado del nombre del rol
  const [nombre, setNombre] = useState("")

  // validación
  function validateFields(){

    const errors = {}

    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/

    if(nombre !== "" && !nameRegex.test(nombre)){
      errors.nombre = "El nombre solo debe contener letras y espacios"
    }

    setFieldErrors(errors)

    return Object.keys(errors).length > 0
  }

  // enviar formulario
  async function sendData(){
    try{

      const validation = validateFields();
                  
      if(validation) return
      
      setLoading(true)
      
      setError("")
      let res = await updateRole(id, nombre)
              
      if(!res?.valid){
        setError("Error al enviar el formulario")
        return
      }

      // volver a mostrar datos
      setMostrarDatos(false)

    }
    catch(error){

      setError(error.message)

    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    const getData = async () => {
      try {

        const res = await getRole(id)

        if(!res?.valid){
          setError("Error al obtener dato")
        return
        }

        setNombre(res?.rol?.nombre)
        
      } catch (error) {
        setError(error.message)
      }
    }
    getData()
  }, [])

  // campos para el formulario
  const campos = {
    nombre: {
      titulo: "Nombre del rol",
      name: "nombre",
      type: "text",
      value: nombre,
      onChange: setNombre
    }
  }

  return (

    <div className="page-container">
      <div className="back-link-container">
        <Link className="link-regresar" to="/admin/roles">Regresar</Link>
      </div>

      <section className="section-editar">

        {/* vista información */}
        {!mostrarDatos ? (

          <>
            <h1 className="titulo-por-h1">Detalles del rol {nombre}</h1>

            <div className="contenedor-campos-rol">
              <strong><p>Nombre: {nombre}</p></strong>
            </div>
          </>

        ) : (

          <AdminFormEdit
            titulo="Editar rol"
            campos={campos}
            onSendForm={sendData}
            linkRegresar="/admin/roles"
            error={error}
            fieldErrors={fieldErrors}
            button="Guardar cambios"
            loading={loading}
          />

        )}

        <div className="contenedor-editar-botones">
          {/* botón modificar / cancelar */}
          <button className={mostrarDatos ? "cancelar-profile" : "modificar-profile"} onClick={() => {setMostrarDatos(!mostrarDatos)}}> {mostrarDatos ? "Cancelar" : "Modificar"} </button>
        </div>
      </section>

    </div>

  )
}

export default EditRole