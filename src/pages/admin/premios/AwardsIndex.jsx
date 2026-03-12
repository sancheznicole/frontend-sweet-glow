import { useState, useEffect } from "react"
import { getAllPremios, deletePremio } from "../../../services/awardsService"
import AdminPanel from "../../../components/admin/AdminPanel"

const AwardsIndex = () => {
	const [data, setData] = useState({})
	// los campos que se reciben del back y el nombre de la tabla del front 
	const fields = {
		id_premio: "id premio",
		id_producto: "id producto",
		created_at: "Fecha creación",
	}

	//funcion que llama la funcion getall
	async function getData(){
		try {
			let res = await getAllPremios()

			if(!res?.valid){
				console.log(res?.error)
				return
			}

			setData(res?.premio?.data)
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
			let res = await deletePremio(id)

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
				titulo={"Administración de premios"}
				texto={"Administra los tipos de premios y sus permisos dentro del sistema"}
				linkCrear={"/admin/premios/crear"}
				linkEditar={"/admin/premios/editar"}
				onDelete={onDelete}
				getData={getData}
			></AdminPanel>
		</div>
  	)
}

export default AwardsIndex