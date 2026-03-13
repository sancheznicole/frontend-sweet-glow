import {useState,useEffect} from "react"
import {getAllImages,deleteImage} from "../../../services/imagesService"
import AdminPanel from "../../../components/admin/AdminPanel"

const ImagesIndex = () => {

const [data,setData] = useState({})

const fields = {
 id_imagen:"ID",
 filename:"Imagen",
 id_producto:"Producto"
}

async function getData(){

 const res = await getAllImages()

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

 const res = await deleteImage(id)

 if(!res?.valid){
  return res.error
 }

}

return(

<AdminPanel
 data={data}
 campos={fields}
 titulo={"Administración imágenes"}
 texto={"Administra las imágenes de productos"}
 linkCrear={"/admin/imagenes/crear"}
 linkEditar={"/admin/imagenes/editar"}
 onDelete={onDelete}
 getData={getData}
/>

)

}

export default ImagesIndex