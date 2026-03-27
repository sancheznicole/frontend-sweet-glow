import { useState, useEffect } from "react"
import { getAllRoles, deleteRole } from "../../../services/rolesService"
import AdminPanel from "../../../components/admin/AdminPanel"
import Loader from "../../../components/Loader"

const RolesIndex = () => {
	const [data, setData] = useState({})
	const [loading, setLoading] = useState(true)
	// los campos que se reciben del back y el nombre de la tabla del front 
	const fields = {
		id_rol: "Id rol",
		nombre: "Rol",
		created_at: "Fecha creación",
	}

	//funcion que llama la funcion getall
	async function getData(){
		try {
			let res = await getAllRoles()

			if(!res?.valid){
				console.log(res?.error)
				return
			}

			setData(res?.roles?.data)
		} catch (error) {
			console.log(error?.message)
		} finally {
			setLoading(false)
		}
	}

	// funcion que llama al getdata cuando carga la pagina
	useEffect(() => {
		getData()
	}, [])

	// función para llamar al delete rol 
	const onDelete = async (id) => {
		try {
			let res = await deleteRole(id)

			if(!res?.valid) return res?.error

		} catch (error) {
			return error.message
		}
	}

	//retornamos la plantilla para administradores 
  	return (
		<div>
			{loading ? (
				<Loader text="Cargando roles..."></Loader>
			) : (
				<AdminPanel 
					data={data}
					campos={fields}
					titulo={"Administración de roles"}
					texto={"Administra los tipos de usuario y asigna los permisos correspondientes dentro del sistema."}
					linkCrear={"/admin/roles/create"}
					linkEditar={"/admin/roles/edit"}
					onDelete={onDelete}
					getData={getData}
				></AdminPanel>
			)}
		</div>
  	)
}

export default RolesIndex