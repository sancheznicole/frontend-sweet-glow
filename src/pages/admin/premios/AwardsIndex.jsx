import {useEffect,useState} from "react"
import {getAllPremios,deletePremio} from "../../../services/awardsService"
import AdminPanel from "../../../components/admin/AdminPanel"

const AwardsIndex = () => {

const [data,setData] = useState({})

const fields = {
 id_premio:"ID Premio",
 id_producto:"ID Producto"
}

async function getData(){

 const res = await getAllPremios()

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

 const res = await deletePremio(id)

 if(!res?.valid){
  return res.error
 }

}

return(

<AdminPanel
 data={data}
 campos={fields}
 titulo={"Administración premios"}
 texto={"Administra los premios del sistema."}
 linkCrear={"/admin/premios/crear"}
 linkEditar={"/admin/premios/editar"}
 onDelete={onDelete}
 getData={getData}
/>

)

}

export default AwardsIndex