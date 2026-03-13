import {useState,useEffect} from "react"
import {useParams,Link} from "react-router-dom"
import {getImage,updateImage} from "../../../../services/imagesService"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"

const EditImages = () => {

const {id} = useParams()

const [file,setFile] = useState(null)
const [filename,setFilename] = useState("")

const [error,setError] = useState("")
const [loading,setLoading] = useState(false)
const [fieldErrors,setFieldErrors] = useState({})
const [mostrarDatos,setMostrarDatos] = useState(false)

async function sendData(){

 if(!file){
  setFieldErrors({filename:"Selecciona imagen"})
  return
 }

 try{

 setLoading(true)

 const res = await updateImage(id,file)

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

 const res = await getImage(id)

 if(!res?.valid){
  setError("Error cargando imagen")
  return
 }

 setFilename(res.data.filename)

 }

 getData()

},[])

const campos={

 filename:{
  titulo:"Nueva imagen",
  name:"filename",
  type:"file",
  onChange:(e)=>setFile(e.target.files[0])
 }

}

return(

<div className="page-container">

<section className="section-admin-edit">

{!mostrarDatos?(
<>
<Link to="/admin/imagenes">Regresar</Link>

<h1>Imagen</h1>

<p>{filename}</p>

</>
):(

<AdminFormEdit
 titulo={"Editar imagen"}
 campos={campos}
 onSendForm={sendData}
 linkRegresar={"/admin/imagenes"}
 error={error}
 fieldErrors={fieldErrors}
 button={"Actualizar imagen"}
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

export default EditImages