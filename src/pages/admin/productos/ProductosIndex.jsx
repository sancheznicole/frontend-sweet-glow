import { useState, useEffect } from "react"
import { getAllProducts, deleteProduct } from "../../../services/productsService"
import AdminPanel from "../../../components/admin/AdminPanel"

const ProductosIndex = () => {
	const [data, setData] = useState({})
	// los campos que se reciben del back y el nombre de la tabla del front 
	const fields = {
		id_producto: "id producto",
		nombre: "nombre",
		descripcion: "descripcion",
		precio: "precio",
		tendencia: "tendencia",
		descuento: "descuento",
		prod_regalo: "prod_regalo",
		premio: "premio",
		stock: "stock",
		id_categoria: "id_categoria",
		id_marca: "id_marca",
		id_referencia: "id_referencia",
		created_at: "Fecha creación",
	}

	async function getData(){
		try {
			let res = await getAllProducts()

			if(!res?.valid){
				console.log(res?.error)
				return
			}

			setData(res?.products?.data)
			
		} catch (error) {
			console.log(error?.message)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	const onDelete = async (id) => {
		try {
			let res = await deleteProduct(id)

			if(!res?.valid) return res?.error

		} catch (error) {
			return error.message
		}
	}

	//retornamos la plantilla para administradores 
  	return (
		<div>
			<AdminPanel 
				data={data}
				campos={fields}
				titulo={"Administración de productos"}
				texto={"Administra los tipos de usuario y sus permisos dentro del sistema"}
				linkCrear={"/admin/roles/crear"}
				linkEditar={"/admin/roles/editar"}
				onDelete={onDelete}
				getData={getData}
			></AdminPanel>
		</div>
  	)
}

export default ProductosIndex