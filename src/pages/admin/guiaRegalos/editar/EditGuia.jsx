import {useEffect,useState} from "react"
import {useParams,Link} from "react-router-dom"
import {getGuia,updateGuia} from "../../../../services/giftGuideService"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"

const EditGuia = ()=>{

const {id} = useParams()

const [nombre,setNombre] = useState("")
const [descripcion,setDescripcion] = useState("")

const [error,setError] = useState("")
const [loading,setLoading] = useState(false)
const [fieldErrors,setFieldErrors] = useState({})
const [mostrarDatos,setMostrarDatos] = useState(false)

function validateFields(){

 const errors={}

 if(nombre==="") errors.nombre="Nombre obligatorio"

 setFieldErrors(errors)

 return Object.keys(errors).length>0

}

async function sendData(){

 const validation = validateFields()

 if(validation) return

 try{

 setLoading(true)

 const res = await updateGuia(id,nombre,descripcion)

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

 const res = await getGuia(id)

 if(!res?.valid){
  setError("Error cargando datos")
  return
 }

 setNombre(res.data.nombre)
 setDescripcion(res.data.descripcion)

 }

 getData()

},[])

const campos={

 nombre:{
  titulo:"Nombre",
  name:"nombre",
  type:"text",
  value:nombre,
  onChange:setNombre
 },

 descripcion:{
  titulo:"Descripción",
  name:"descripcion",
  type:"text",
  value:descripcion,
  onChange:setDescripcion
 }

}

return(

<div className="page-container">

<section className="section-admin-edit">

{!mostrarDatos?(
<>
<Link to="/admin/guias">Regresar</Link>

<h1>Guía de regalos</h1>

<p>Nombre: {nombre}</p>
<p>Descripción: {descripcion}</p>

</>
):(

<AdminFormEdit
 titulo={"Editar guía"}
 campos={campos}
 onSendForm={sendData}
 linkRegresar={"/admin/guias"}
 error={error}
 fieldErrors={fieldErrors}
 button={"Guardar cambios"}
 loading={loading}
/>

)}

<button onClick={()=>setMostrarDatos(!mostrarDatos)}>
{mostrarDatos?"Cancelar":"Modificar"}
</button>

</section>

</div>

)

}

export default EditGuia