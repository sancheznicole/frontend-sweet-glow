import { useState, useEffect } from "react"
import { getAllBrands, deleteBrand } from "../../../services/brands"
import AdminPanel from "../../../components/admin/AdminPanel"

const BrandsIndex = () => {

	const [data, setData] = useState({})

	const fields = {
		id_marca: "ID",
		nombre: "Marca",
		pais_origen: "País origen",
		created_at: "Fecha creación",
	}

	async function getData(){

		try {

			let res = await getAllBrands()

			if(!res?.valid){
				console.log(res?.error)
				return
			}

			setData(res?.brands)

		}catch(error){

			console.log(error?.message)

		}

	}

	useEffect(()=>{

		getData()

	},[])

	const onDelete = async(id)=>{

		try{

			let res = await deleteBrand(id)

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
				titulo={"Administración de marcas"}
				texto={"Administra las marcas registradas"}
				linkCrear={"/admin/brands/create"}
				linkEditar={"/admin/brands/edit"}
				onDelete={onDelete}
				getData={getData}
			/>

		</div>

	)

}

export default BrandsIndex