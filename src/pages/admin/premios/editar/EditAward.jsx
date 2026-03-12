import { useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { updatePremio, getPremio } from "../../../../services/awardsService"
import { Link } from "react-router-dom"

const EditAward = () => {

  // obtener id desde la url
  const { id } = useParams()

  // estados generales
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  // mostrar información o formulario
  const [mostrarDatos, setMostrarDatos] = useState(false)

  // estado del nombre de premios
  const [id_producto, setId_producto] = useState("")

  // validación
  function validateFields(){

    const errors = {}

   if(id_producto === "") errors.id_producto = "El id producto es obligatorio"

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
      let res = await updatePremio(id, id_producto)
              
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

        const res = await getPremio(id)

        if(!res?.valid){
          setError("Error al obtener dato")
        return
        }

        setId_producto(res?.premio?.id_producto)
        
      } catch (error) {
        setError(error.message)
      }
    }
    getData()
  }, [])

  // campos para el formulario
  const campos = {
    id_producto: {
      titulo: "Id del producto",
      name: "id_producto",
      type: "text",
      value: id_producto,
      onChange: setId_producto
    }
  }

  return (

    <div className="page-container">

      <section className="section-admin-edit">

        {/* vista información */}
        {!mostrarDatos ? (

          <>
            <Link to="/admin/premios">Regresar</Link>

            <h1>Detalles de premios: {id_producto}</h1>

            <div>
              <p>Id producto:{id_producto}</p>
            </div>
          </>

        ) : (

          <AdminFormEdit
            titulo="Editar premio"
            campos={campos}
            onSendForm={sendData}
            linkRegresar="/admin/premios"
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

export default EditAward