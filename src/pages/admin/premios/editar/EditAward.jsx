import {useEffect,useState} from "react"
import {useParams,Link} from "react-router-dom"
import {getPremio,updatePremio} from "../../../../services/awardsService"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"

const EditAward = () => {

const {id} = useParams()

const [id_producto,setIdProducto] = useState("")

const [error,setError] = useState("")
const [loading,setLoading] = useState(false)
const [fieldErrors,setFieldErrors] = useState({})
const [mostrarDatos,setMostrarDatos] = useState(false)

function validateFields(){

 const errors={}

 if(id_producto==="") errors.id_producto="Producto obligatorio"

 setFieldErrors(errors)

 return Object.keys(errors).length>0
}

async function sendData(){

 const validation = validateFields()

 if(validation) return

 try{

 setLoading(true)

 const res = await updatePremio(id,id_producto)

 if(!res?.valid){
  setError("Error actualizando premio")
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

 const res = await getPremio(id)

 if(!res?.valid){
  setError("Error cargando premio")
  return
 }

 setIdProducto(res.data.id_producto)

 }

 getData()

},[])

const campos={

 id_producto:{
  titulo:"ID Producto",
  name:"id_producto",
  type:"text",
  value:id_producto,
  onChange:setIdProducto
 }

}

return(

<div className="page-container">

<section className="section-admin-edit">

{!mostrarDatos?(
<>
<Link to="/admin/premios">Regresar</Link>

<h1>Premio</h1>

<p>ID producto: {id_producto}</p>
</>
):(

<AdminFormEdit
 titulo={"Editar premio"}
 campos={campos}
 onSendForm={sendData}
 linkRegresar={"/admin/premios"}
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

export default EditAward