import {useEffect,useState} from "react"
import {getAllGuias,deleteGuia} from "../../../services/giftGuideService"
import AdminPanel from "../../../components/admin/AdminPanel"

const GuiaRegalosIndex = ()=>{

const [data,setData] = useState({})

const fields={
 id_guia:"ID",
 nombre:"Nombre",
 descripcion:"Descripción"
}

async function getData(){

 const res = await getAllGuias()

 if(!res?.valid){
  console.log(res.error)
  return
 }

 setData(res.data)

}

useEffect(()=>{
 getData()
},[])

const onDelete = async(id)=>{

 const res = await deleteGuia(id)

 if(!res?.valid){
  return res.error
 }

}

return(

<AdminPanel
 data={data}
 campos={fields}
 titulo={"Administración guía de regalos"}
 texto={"Administra las guías de regalos."}
 linkCrear={"/admin/guias/crear"}
 linkEditar={"/admin/guias/editar"}
 onDelete={onDelete}
 getData={getData}
/>

)

}

export default GuiaRegalosIndex