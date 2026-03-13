import {useState} from "react"
import {useNavigate} from "react-router-dom"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import {createPremiado} from "../../../../services/winnersService"

const CreateAwarded = ()=>{

const navigate = useNavigate()

const [id_premio,setIdPremio] = useState("")
const [id_usuario,setIdUsuario] = useState("")
const [id_inscripcion,setIdInscripcion] = useState("")

const [error,setError] = useState("")
const [loading,setLoading] = useState(false)
const [fieldErrors,setFieldErrors] = useState({})

function validateFields(){

 const errors={}

 if(id_premio==="") errors.id_premio="Premio obligatorio"
 if(id_usuario==="") errors.id_usuario="Usuario obligatorio"
 if(id_inscripcion==="") errors.id_inscripcion="Inscripción obligatoria"

 setFieldErrors(errors)

 return Object.keys(errors).length>0

}

const sendData = async()=>{

 const validation = validateFields()

 if(validation) return

 try{

 setLoading(true)

 const res = await createPremiado(id_premio,id_usuario,id_inscripcion)

 if(!res?.valid){
  setError("Error creando premiado")
  return
 }

 navigate("/admin/premiados")

 }catch(error){

 setError(error.message)

 }finally{

 setLoading(false)

 }

}

const campos={

 id_premio:{
  titulo:"ID Premio",
  name:"id_premio",
  type:"text",
  onChange:setIdPremio
 },

 id_usuario:{
  titulo:"ID Usuario",
  name:"id_usuario",
  type:"text",
  onChange:setIdUsuario
 },

 id_inscripcion:{
  titulo:"ID Inscripción",
  name:"id_inscripcion",
  type:"text",
  onChange:setIdInscripcion
 }

}

return(

<AdminFormCreate
 titulo={"Crear premiado."}
 campos={campos}
 linkRegresar={"/admin/premiados"}
 onSendForm={sendData}
 error={error}
 fieldErrors={fieldErrors}
 button={"Crear premiado"}
 loading={loading}
/>

)

}

export default CreateAwarded