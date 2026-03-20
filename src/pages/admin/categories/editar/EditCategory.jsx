import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { updateCategory, getCategory } from "../../../../services/categoriesService"
import { Link } from "react-router-dom"

const EditCategory = () => {

	const { id } = useParams()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [fieldErrors, setFieldErrors] = useState({})

	const [mostrarDatos, setMostrarDatos] = useState(false)

	const [nombre, setNombre] = useState("")

	function validateFields(){

		const errors = {}

		const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/

		if (!nombre || nombre.trim() === '') {
        errors.nombre = "El nombre no puede ir vacío"
		} else if (!nameRegex.test(nombre)) {
			errors.nombre = "El nombre solo debe contener letras"
		}

		setFieldErrors(errors)

		return Object.keys(errors).length > 0

	}

	async function sendData(){

		try{

			const validation = validateFields()

			if(validation) return

			setLoading(true)

			setError("")

			let res = await updateCategory(id, nombre)

			if(!res?.valid){
				setError("Error al enviar el formulario")
				return
			}

			setMostrarDatos(false)

		}catch(error){

			setError(error.message)

		}
		finally{

			setLoading(false)

		}

	}

	useEffect(()=>{

		const getData = async()=>{

			try{

				const res = await getCategory(id)

				if(!res?.valid){
					setError("Error al obtener dato")
					return
				}

				setNombre(res?.category?.nombre)

			}catch(error){

				setError(error.message)

			}

		}

		getData()

	},[])

	const campos = {

		nombre:{
			titulo:"Nombre de la categoría",
			name:"nombre",
			type:"text",
			value:nombre,
			onChange:setNombre
		}

	}

	return(

		<div className="page-container">

			{!mostrarDatos && (
				<div className="back-link-container">
					<Link className="link-regresar" to="/admin/categories">Regresar</Link>
				</div>
			)}

			<section className="section-editar">

				{!mostrarDatos ? (

					<>

						<h1 className="titulo-por-h1">
							Detalles de la categoría {nombre}
						</h1>

						<div className="contenedor-campos">
							<p><strong>Nombre:</strong> {nombre}</p>
						</div>

					</>

				) : (

					<AdminFormEdit
						titulo="Editar categoría"
						campos={campos}
						onSendForm={sendData}
						linkRegresar="/admin/categories"
						error={error}
						fieldErrors={fieldErrors}
						button="Guardar cambios"
						loading={loading}
					/>

				)}

				<div className="contenedor-editar-botones">

					<button
						className={mostrarDatos ? "cancelar-profile" : "modificar-profile"}
						onClick={()=>{setMostrarDatos(!mostrarDatos)}}
					>

						{mostrarDatos ? "Cancelar" : "Modificar"}

					</button>

				</div>

			</section>

		</div>

	)

}

export default EditCategory