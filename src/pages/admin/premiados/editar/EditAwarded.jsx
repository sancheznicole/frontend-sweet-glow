import { useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { getPremiado, updatePremiado } from "../../../../services/awardedService"
import { Link } from "react-router-dom"

const EditAwarded = () => {

  // obtener id desde la url
  const { id } = useParams()

  // estados generales
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  // mostrar información o formulario
  const [mostrarDatos, setMostrarDatos] = useState(false)

  // estados de los campos
  const [id_premio, setId_premio] = useState("")
  const [id_usuario, setId_usuario] = useState("")
  const [id_inscripcion, setId_inscripcion] = useState("")

  // validación
  function validateFields(){

    const errors = {}

    if(id_premio === "") errors.id_premio = "El id premio es obligatorio"
    if(id_usuario === "") errors.id_usuario = "El id usuario es obligatorio"
    if(id_inscripcion === "") errors.id_inscripcion = "El id inscripcion es obligatorio"

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
      let res = await updatePremiado(id, id_premio, id_usuario, id_inscripcion)
              
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

        const res = await getPremiado(id)

        if(!res?.valid){
          setError("Error al obtener dato")
        return
        }

        setId_premio(res?.premiado?.id_premio)
        setId_usuario(res?.premiado?.id_usuario)
        setId_inscripcion(res?.premiado?.id_inscripcion)
        
      } catch (error) {
        setError(error.message)
      }
    }
    getData()
  }, [])

  // campos para el formulario
  const campos = {
     id_premio: {
      titulo: "Id premio",
      name: "id_premio",
      type: "text",
      value: id_premio,
      onChange: setId_premio
    },

    id_usuario: {
      titulo: "Id usuario",
      name: "id_usuario",
      type: "text",
      value: id_usuario,
      onChange: setId_usuario
    },

    id_inscripcion: {
      titulo: "Id inscripcion",
      name: "id_inscripcion",
      type: "text",
      value: id_inscripcion,
      onChange: setId_inscripcion
    }

  }

  return (

    <div className="page-container">

      <section className="section-admin-edit">

        {/* vista información */}
        {!mostrarDatos ? (

          <>
            <Link to="/admin/premiados">Regresar</Link>

            <h1>Detalles de premiados: {id_premio}</h1>

            <div>
              <p>Id premio: {id_premio}</p>
            </div>

            <div>
              <p>Id usuario: {id_usuario}</p>
            </div>

             <div>
              <p>Id inscripcion: {id_inscripcion}</p>
            </div>
          </>

        ) : (

          <AdminFormEdit
            titulo="Editar premiados"
            campos={campos}
            onSendForm={sendData}
            linkRegresar="/admin/premiados"
            error={error}
            fieldErrors={fieldErrors}
            button="Guardar cambios"
            loading={loading}
          />

        )}

        {/* botón modificar / cancelar */}
        <button
          onClick={() => setMostrarDatos(!mostrarDatos)}
        >
          {mostrarDatos ? "Cancelar" : "Modificar"}
        </button>

      </section>

    </div>

  )
}

export default EditAwarded