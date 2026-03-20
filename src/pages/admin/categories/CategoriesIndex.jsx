import { useState, useEffect } from "react"
import { getAllCategories, deleteCategory } from "../../../services/categoriesService"
import AdminPanel from "../../../components/admin/AdminPanel"

const CategoriesIndex = () => {

	const [data, setData] = useState({})

	const fields = {
		id_categoria: "ID",
		nombre: "Categoría",
		created_at: "Fecha creación",
	}

	async function getData(){
		try {

			let res = await getAllCategories()

			if(!res?.valid){
				console.log(res?.error)
				return
			}

			setData(res?.categories)

		} catch (error) {

			console.log(error?.message)

		}
	}

	useEffect(()=>{

		getData()

	},[])

	const onDelete = async(id)=>{

		try{

			let res = await deleteCategory(id)

			if(!res?.valid) return res?.error

		}catch(error){

			return error.message

		}

	}

	return(

		<div>

			<AdminPanel
				data={data}
				campos={fields}
				titulo={"Administración de categorías"}
				texto={"Administra las categorías de los productos"}
				linkCrear={"/admin/categories/create"}
				linkEditar={"/admin/categories/edit"}
				onDelete={onDelete}
				getData={getData}
			/>

		</div>

	)

}

export default CategoriesIndex