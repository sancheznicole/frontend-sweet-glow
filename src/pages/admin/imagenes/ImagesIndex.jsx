import { useState, useEffect } from "react"
import { getAllImagenes, deleteImagen } from "../../../services/imagesService"
import AdminPanel from "../../../components/admin/AdminPanel"

const ImagesIndex = () => {
	const [data, setData] = useState({})
	// los campos que se reciben del back y el nombre de la tabla del front 
	const fields = {
		id_imagen: "id imagen",
		filename: "filename",
		id_producto: "id producto",
		created_at: "Fecha creación",
	}

	//funcion que llama la funcion getall
	async function getData(){
		try {
			let res = await getAllImagenes(1,10)

		if(!res?.valid){
			console.log(res?.error)
			return
		}

		setData(res?.imagen?.data)
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
			let res = await deleteImagen(id)

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
				titulo={"Administración de imagenes"}
				texto={"Administra los tipos de imagenes"}
				linkCrear={"/admin/imagen/crear"}
				linkEditar={"/admin/imagen/editar"}
				onDelete={onDelete}
				getData={getData}
			></AdminPanel>
		</div>
  	)
}

export default ImagesIndex