import { useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { getImagen, updateImagen } from "../../../../services/imagesService"
import { Link } from "react-router-dom"

const EditImages = () => {

  // obtener id desde la url
  const { id } = useParams()

  // estados generales
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  // mostrar información o formulario
  const [mostrarDatos, setMostrarDatos] = useState(false)

  // estados de los campos
  const [filename, setFilename] = useState("")
  const [id_producto, setId_producto] = useState("")

  // validación
  function validateFields(){

    const errors = {}

    if(filename === "") errors.filename = "El filename es obligatorio"
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
      let res = await updateImagen(id, filename, id_producto)
              
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

        const res = await getImagen(id)

        if(!res?.valid){
          setError("Error al obtener dato")
        return
        }

        setFilename(res?.imagen?.filename)
        setId_producto(res?.imagen?.id_producto)
        
      } catch (error) {
        setError(error.message)
      }
    }
    getData()
  }, [])

  // campos para el formulario
  const campos = {
     filename: {
      titulo: "Filename",
      name: "filename",
      type: "text",
      value: filename,
      onChange: setFilename
    },

    id_producto: {
      titulo: "Id producto",
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
            <Link to="/admin/imagenes">Regresar</Link>

            <h1>Detalles de imagenes: {filename}</h1>

            <div>
              <p>Filename: {filename}</p>
            </div>

            <div>
              <p>Id Producto: {id_producto}</p>
            </div>
          </>

        ) : (

          <AdminFormEdit
            titulo="Editar imagenes"
            campos={campos}
            onSendForm={sendData}
            linkRegresar="/admin/imagenes"
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

export default EditImages