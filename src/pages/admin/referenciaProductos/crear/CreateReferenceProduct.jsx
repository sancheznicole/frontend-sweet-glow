import {useState} from "react"
import {useNavigate} from "react-router-dom"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import {createReferenceProduct} from "../../../../services/referenceProductsService"

const CreateReferenceProduct = () => {

const navigate = useNavigate()

const [codigo,setCodigo] = useState("")
const [color,setColor] = useState("")
const [tamano,setTamano] = useState("")

const [error,setError] = useState("")
const [loading,setLoading] = useState(false)
const [fieldErrors,setFieldErrors] = useState({})

function validateFields(){

 const errors={}

 if(codigo==="") errors.codigo="Código obligatorio"
 if(color==="") errors.color="Color obligatorio"
 if(tamano==="") errors.tamano="Tamaño obligatorio"

 setFieldErrors(errors)

 return Object.keys(errors).length>0
}

const sendData = async()=>{

 const validation = validateFields()

 if(validation) return

 try{

 setLoading(true)

 const res = await createReferenceProduct(codigo,color,tamano)

 if(!res?.valid){
   setError("Error creando referencia")
   return
 }

 navigate("/admin/referenciaProductos")

 }catch(error){

 setError(error.message)

 }finally{

 setLoading(false)

 }

}

const campos={

 codigo:{
  titulo:"Código",
  name:"codigo",
  type:"text",
  onChange:setCodigo
 },

 color:{
  titulo:"Color",
  name:"color",
  type:"text",
  onChange:setColor
 },

 tamano:{
  titulo:"Tamaño",
  name:"tamano",
  type:"text",
  onChange:setTamano
 }

}

return(

<AdminFormCreate
 titulo={"Crear referencia producto"}
 campos={campos}
 linkRegresar={"/admin/referenciaProductos"}
 onSendForm={sendData}
 error={error}
 fieldErrors={fieldErrors}
 button={"Crear referencia"}
 loading={loading}
/>

)

}

export default CreateReferenceProduct