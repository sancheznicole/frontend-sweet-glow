import { useState, useEffect} from "react"
import { useParams } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { updateReferencia, getReferencia } from "../../../../services/referenceProductsService"
import { Link } from "react-router-dom"

const EditReferenceProduct = () => {

  // obtener id desde la url
  const { id } = useParams()

  // estados generales
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  // mostrar información o formulario
  const [mostrarDatos, setMostrarDatos] = useState(false)

  // estados de los campos
  const [codigo, setCodigo] = useState("")
  const [color, setColor] = useState("")
  const [tamaño, setTamaño] = useState("")

  // validación
  function validateFields(){

    const errors = {}

    if(codigo === "") errors.codigo = "El codigo es obligatorio"
    if(color === "") errors.color = "El color es obligatorio"
    if(tamaño === "") errors.tamaño = "El tamaño es obligatorio"

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
      let res = await updateReferencia(id, codigo, color, tamaño)
              
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

        const res = await getReferencia(id)

        if(!res?.valid){
          setError("Error al obtener dato")
        return
        }

        setCodigo(res?.referencia?.codigo)
        setColor(res?.referencia?.color)
        setTamaño(res?.referencia?.tamaño)
        
      } catch (error) {
        setError(error.message)
      }
    }
    getData()
  }, [])

  // campos para el formulario
  const campos = {
     codigo: {
      titulo: "Codigo",
      name: "codigo",
      type: "text",
      value: codigo,
      onChange: setCodigo
    },

    color: {
      titulo: "Color",
      name: "color",
      type: "text",
      value: color,
      onChange: setColor
    },

    tamaño: {
      titulo: "Tamaño",
      name: "tamaño",
      type: "text",
      value: tamaño,
      onChange: setTamaño
    }
  }

  return (

    <div className="page-container">

      <section className="section-admin-edit">

        {/* vista información */}
        {!mostrarDatos ? (

          <>
            <Link to="/admin/referencia">Regresar</Link>

            <h1>Detalles de referencia: {codigo}</h1>

            <div>
              <p>Codigo: {codigo}</p>
            </div>

            <div>
              <p>Color: {color}</p>
            </div>

            <div>
              <p>Tamaño: {tamaño}</p>
            </div>
          </>

        ) : (

          <AdminFormEdit
            titulo="Editar referencia"
            campos={campos}
            onSendForm={sendData}
            linkRegresar="/admin/referencia"
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

export default EditReferenceProduct