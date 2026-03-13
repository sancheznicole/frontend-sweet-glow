import {useState} from "react"
import {useNavigate} from "react-router-dom"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import {createGuia} from "../../../../services/giftGuideService"

const CreateGuia = ()=>{

const navigate = useNavigate()

const [nombre,setNombre] = useState("")
const [descripcion,setDescripcion] = useState("")

const [error,setError] = useState("")
const [loading,setLoading] = useState(false)
const [fieldErrors,setFieldErrors] = useState({})

function validateFields(){

 const errors={}

 if(nombre==="") errors.nombre="Nombre obligatorio"

 setFieldErrors(errors)

 return Object.keys(errors).length>0

}

const sendData = async()=>{

 const validation = validateFields()

 if(validation) return

 try{

 setLoading(true)

 const res = await createGuia(nombre,descripcion)

 if(!res?.valid){
  setError("Error creando guía")
  return
 }

 navigate("/admin/guias")

 }catch(error){

 setError(error.message)

 }finally{

 setLoading(false)

 }

}

const campos={

 nombre:{
  titulo:"Nombre",
  name:"nombre",
  type:"text",
  onChange:setNombre
 },

 descripcion:{
  titulo:"Descripción",
  name:"descripcion",
  type:"text",
  onChange:setDescripcion
 }

}

return(

<AdminFormCreate
 titulo={"Crear guía de regalos."}
 campos={campos}
 linkRegresar={"/admin/guias"}
 onSendForm={sendData}
 error={error}
 fieldErrors={fieldErrors}
 button={"Crear guía"}
 loading={loading}
/>

)

}

export default CreateGuia