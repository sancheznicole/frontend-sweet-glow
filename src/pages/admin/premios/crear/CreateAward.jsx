import {useState} from "react"
import {useNavigate} from "react-router-dom"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import {createPremio} from "../../../../services/awardsService"

const CreateAward = () => {

const navigate = useNavigate()

const [id_producto,setIdProducto] = useState("")

const [error,setError] = useState("")
const [loading,setLoading] = useState(false)
const [fieldErrors,setFieldErrors] = useState({})

function validateFields(){

 const errors={}

 if(id_producto==="") errors.id_producto="Producto obligatorio"

 setFieldErrors(errors)

 return Object.keys(errors).length>0
}

const sendData = async()=>{

 const validation = validateFields()

 if(validation) return

 try{

 setLoading(true)

 const res = await createPremio(id_producto)

 if(!res?.valid){
  setError("Error creando premio")
  return
 }

 navigate("/admin/premios")

 }catch(error){

 setError(error.message)

 }finally{

 setLoading(false)

 }

}

const campos={

 id_producto:{
  titulo:"ID Producto",
  name:"id_producto",
  type:"text",
  onChange:setIdProducto
 }

}

return(

<AdminFormCreate
 titulo={"Crear premio"}
 campos={campos}
 linkRegresar={"/admin/premios"}
 onSendForm={sendData}
 error={error}
 fieldErrors={fieldErrors}
 button={"Crear premio."}
 loading={loading}
/>

)

}

export default CreateAward