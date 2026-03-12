import { useState, useEffect } from "react"
import { getAllPremiados, deletePremiado } from "../../../services/awardedService"
import AdminPanel from "../../../components/admin/AdminPanel"

const AwardedIndex = () => {
	const [data, setData] = useState({})
	// los campos que se reciben del back y el nombre de la tabla del front 
	const fields = {
		id_premio: "id premio",
		id_usuario: "id usuario",
		id_inscripcion: "id inscripcion",
		created_at: "Fecha creación",
	}

	//funcion que llama la funcion getall
	async function getData(){
		try {
			let res = await getAllPremiados(1,10)

		if(!res?.valid){
			console.log(res?.error)
			return
		}

		setData(res?.premiado?.data)
		} catch (error) {
		console.log(error?.message)
		}
	}

	// funcion que llama al getdata cuando carga la pagina
	useEffect(() => {
		getData()
	}, [])

	// función para llamar al delete  
	const onDelete = async (id) => {
		try {
			let res = await deletePremiado(id)

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
				titulo={"Administración de Premiados"}
				texto={"Administra los Premiados"}
				linkCrear={"/admin/premiados/crear"}
				linkEditar={"/admin/premiados/editar"}
				onDelete={onDelete}
				getData={getData}
			></AdminPanel>
		</div>
  	)
}

export default AwardedIndex
