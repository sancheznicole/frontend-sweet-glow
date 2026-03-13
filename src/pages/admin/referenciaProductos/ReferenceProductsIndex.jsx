import {useEffect,useState} from "react"
import AdminPanel from "../../../components/admin/AdminPanel"
import {getAllReferenceProducts,deleteReferenceProduct} from "../../../services/referenceProductsService"

const ReferenceProductsIndex = () => {

const [data,setData] = useState({})

const fields = {
 id_referencia:"ID",
 codigo:"Código",
 color:"Color",
 tamano:"Tamaño"
}

async function getData(){

 const res = await getAllReferenceProducts()

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

 const res = await deleteReferenceProduct(id)

 if(!res?.valid){
   return res.error
 }

}

return(

 <AdminPanel
   data={data}
   campos={fields}
   titulo={"Administración referencia productos"}
   texto={"Administra las referencias de productos."}
   linkCrear={"/admin/referenciaProductos/crear"}
   linkEditar={"/admin/referenciaProductos/editar"}
   onDelete={onDelete}
   getData={getData}
 />

)

}

export default ReferenceProductsIndex