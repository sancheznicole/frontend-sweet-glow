import { useState, useEffect } from "react"
import { getAllReferencias, deleteReferencia } from "../../../services/referenceProductsService"
import AdminPanel from "../../../components/admin/AdminPanel"

const ReferenceProductsIndex = () => {
	const [data, setData] = useState({})
	// los campos que se reciben del back y el nombre de la tabla del front 
	const fields = {
		id_referencia: "id referencia",
		codigo: "codigo",
		color: "color",
		tamano: "tamaño",
		created_at: "Fecha creación",
	}

	//funcion que llama la funcion getall
	async function getData(){
		try {
			let res = await getAllReferencias(1,10)

		if(!res?.valid){
			console.log(res?.error)
			return
		}

		console.log(res?.referencia)

		setData(res?.referencia)
		} catch (error) {
			console.log(error?.message)
		}
	}

	// funcion que llama al getdata cuando carga la pagina
	useEffect(() => {
		getData()
	}, [])

	// función para llamar al delete rol 
	const onDelete = async (id) => {
		try {
			let res = await deleteReferencia(id)

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
				titulo={"Administración de referencias productos"}
				texto={"Administra los tipos de referencias"}
				linkCrear={"/admin/referencia/create"}
				linkEditar={"/admin/referencia/edit"}
				onDelete={onDelete}
				getData={getData}
			></AdminPanel>
		</div>
  	)
}

export default ReferenceProductsIndex