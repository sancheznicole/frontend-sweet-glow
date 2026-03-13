import {useEffect,useState} from "react"
import {useParams,Link} from "react-router-dom"
import {getPremiado,updatePremiado} from "../../../../services/winnersService"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"

const EditAwarded = ()=>{

const {id} = useParams()

const [id_premio,setIdPremio] = useState("")
const [id_usuario,setIdUsuario] = useState("")
const [id_inscripcion,setIdInscripcion] = useState("")

const [error,setError] = useState("")
const [loading,setLoading] = useState(false)
const [fieldErrors,setFieldErrors] = useState({})
const [mostrarDatos,setMostrarDatos] = useState(false)

function validateFields(){

 const errors={}

 if(id_premio==="") errors.id_premio="Premio obligatorio"
 if(id_usuario==="") errors.id_usuario="Usuario obligatorio"
 if(id_inscripcion==="") errors.id_inscripcion="Inscripción obligatoria"

 setFieldErrors(errors)

 return Object.keys(errors).length>0

}

async function sendData(){

 const validation = validateFields()

 if(validation) return

 try{

 setLoading(true)

 const res = await updatePremiado(id,id_premio,id_usuario,id_inscripcion)

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

 const res = await getPremiado(id)

 if(!res?.valid){
  setError("Error cargando datos")
  return
 }

 setIdPremio(res.data.id_premio)
 setIdUsuario(res.data.id_usuario)
 setIdInscripcion(res.data.id_inscripcion)

 }

 getData()

},[])

const campos={

 id_premio:{
  titulo:"ID Premio",
  name:"id_premio",
  type:"text",
  value:id_premio,
  onChange:setIdPremio
 },

 id_usuario:{
  titulo:"ID Usuario",
  name:"id_usuario",
  type:"text",
  value:id_usuario,
  onChange:setIdUsuario
 },

 id_inscripcion:{
  titulo:"ID Inscripción",
  name:"id_inscripcion",
  type:"text",
  value:id_inscripcion,
  onChange:setIdInscripcion
 }

}

return(

<div className="page-container">

<section className="section-admin-edit">

{!mostrarDatos?(
<>
<Link to="/admin/premiados">Regresar</Link>

<h1>Premiado</h1>

<p>Premio: {id_premio}</p>
<p>Usuario: {id_usuario}</p>
<p>Inscripción: {id_inscripcion}</p>

</>
):(

<AdminFormEdit
 titulo={"Editar premiado"}
 campos={campos}
 onSendForm={sendData}
 linkRegresar={"/admin/premiados"}
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

export default EditAwarded