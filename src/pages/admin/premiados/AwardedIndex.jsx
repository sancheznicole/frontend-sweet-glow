import {useEffect,useState} from "react"
import {getAllPremiados,deletePremiado} from "../../../services/winnersService"
import AdminPanel from "../../../components/admin/AdminPanel"

const AwardedIndex = ()=>{

const [data,setData] = useState({})

const fields={
 id_premiado:"ID",
 id_premio:"Premio",
 id_usuario:"Usuario",
 id_inscripcion:"Inscripción"
}

async function getData(){

 const res = await getAllPremiados()

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

 const res = await deletePremiado(id)

 if(!res?.valid){
  return res.error
 }

}

return(

<AdminPanel
 data={data}
 campos={fields}
 titulo={"Administración premiados"}
 texto={"Administra los ganadores"}
 linkCrear={"/admin/premiados/crear"}
 linkEditar={"/admin/premiados/editar"}
 onDelete={onDelete}
 getData={getData}
/>

)

}

export default AwardedIndex