import {useState} from "react"
import {useNavigate} from "react-router-dom"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import {createImage} from "../../../../services/imagesService"

const CreateImages = () => {

const navigate = useNavigate()

const [file,setFile] = useState(null)
const [id_producto,setIdProducto] = useState("")

const [error,setError] = useState("")
const [loading,setLoading] = useState(false)
const [fieldErrors,setFieldErrors] = useState({})

function validateFields(){

 const errors={}

 if(!file) errors.filename="Imagen obligatoria"
 if(id_producto==="") errors.id_producto="Producto obligatorio"

 setFieldErrors(errors)

 return Object.keys(errors).length>0

}

const sendData = async()=>{

 const validation = validateFields()

 if(validation) return

 try{

 setLoading(true)

 const res = await createImage(file,id_producto)

 if(!res?.valid){
  setError("Error creando imagen")
  return
 }

 navigate("/admin/imagenes")

 }catch(error){

 setError(error.message)

 }finally{

 setLoading(false)

 }

}

const campos={

 filename:{
  titulo:"Imagen",
  name:"filename",
  type:"file",
  onChange:(e)=>setFile(e.target.files[0])
 },

 id_producto:{
  titulo:"ID producto",
  name:"id_producto",
  type:"text",
  onChange:setIdProducto
 }

}

return(

<AdminFormCreate
 titulo={"Subir imagen"}
 campos={campos}
 linkRegresar={"/admin/imagenes"}
 onSendForm={sendData}
 error={error}
 fieldErrors={fieldErrors}
 button={"Subir imagen."}
 loading={loading}
/>

)

}

export default CreateImages