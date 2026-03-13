import {useEffect,useState} from "react"
import {useParams,Link} from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import {getReferenceProduct,updateReferenceProduct} from "../../../../services/referenceProductsService"

const EditReferenceProduct = () => {

const {id} = useParams()

const [codigo,setCodigo] = useState("")
const [color,setColor] = useState("")
const [tamano,setTamano] = useState("")

const [error,setError] = useState("")
const [loading,setLoading] = useState(false)
const [fieldErrors,setFieldErrors] = useState({})
const [mostrarDatos,setMostrarDatos] = useState(false)

function validateFields(){

 const errors={}

 if(codigo==="") errors.codigo="Código obligatorio"

 setFieldErrors(errors)

 return Object.keys(errors).length>0
}

async function sendData(){

 const validation = validateFields()

 if(validation) return

 try{

 setLoading(true)

 const res = await updateReferenceProduct(id,codigo,color,tamano)

 if(!res?.valid){
   setError("Error actualizando")
   return
 }

 setMostrarDatos(false)

 }catch(error){

 setError(error.message)

 }finally{

 setLoading(false)

 }

}

useEffect(()=>{

 async function getData(){

 const res = await getReferenceProduct(id)

 if(!res?.valid){
   setError("Error obteniendo datos")
   return
 }

 setCodigo(res.data.codigo)
 setColor(res.data.color)
 setTamano(res.data.tamano)

 }

 getData()

},[])

const campos={

 codigo:{
  titulo:"Código",
  name:"codigo",
  type:"text",
  value:codigo,
  onChange:setCodigo
 },

 color:{
  titulo:"Color",
  name:"color",
  type:"text",
  value:color,
  onChange:setColor
 },

 tamano:{
  titulo:"Tamaño",
  name:"tamano",
  type:"text",
  value:tamano,
  onChange:setTamano
 }

}

return(

<div className="page-container">

<section className="section-admin-edit">

{!mostrarDatos?(
<>
<Link to="/admin/referenciaProductos">Regresar</Link>

<h1>Referencia: {codigo}</h1>

<p>Código: {codigo}</p>
<p>Color: {color}</p>
<p>Tamaño: {tamano}</p>
</>
):(

<AdminFormEdit
 titulo={"Editar referencia"}
 campos={campos}
 onSendForm={sendData}
 linkRegresar={"/admin/referenciaProductos"}
 error={error}
 fieldErrors={fieldErrors}
 button={"Guardar cambios"}
 loading={loading}
/>

)}

<button onClick={()=>setMostrarDatos(!mostrarDatos)}>
{mostrarDatos?"Cancelar": "Modificar"}
</button>

</section>

</div>

)

}

export default EditReferenceProduct