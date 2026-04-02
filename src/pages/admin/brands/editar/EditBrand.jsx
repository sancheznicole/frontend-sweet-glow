import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { updateBrand, getBrand } from "../../../../services/brands"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Loader from "../../../../components/Loader"


const EditBrand = () => {

	const { id } = useParams()
	const navigate = useNavigate()
	const [loadingData, setLoadingData] = useState(true)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [fieldErrors, setFieldErrors] = useState({})

	const [mostrarDatos, setMostrarDatos] = useState(false)

	const [nombre, setNombre] = useState("")
	const [paisOrigen, setPaisOrigen] = useState("")

	function validateFields(){

		const errors = {}

		if(nombre.trim().length < 2){
			errors.nombre = "El nombre debe tener mínimo 2 caracteres"
		}

		if(paisOrigen.trim().length < 2){
			errors.pais_origen = "El país de origen es obligatorio"
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

			let res = await updateBrand(id, nombre, paisOrigen)

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

				const res = await getBrand(id)

				if(!res?.valid){
					setError("Error al obtener dato")
					return
				}

				setNombre(res?.brand?.nombre)
				setPaisOrigen(res?.brand?.pais_origen)

			}catch(error){

				setError(error.message)

			} finally {
				setLoadingData(false)
			}

		}

		getData()

	},[])

	const campos = {

		nombre:{
			titulo:"Nombre de la marca",
			name:"nombre",
			type:"text",
			value:nombre,
			onChange:setNombre
		},

		pais_origen:{
			titulo:"País de origen",
			name:"pais_origen",
			type:"text",
			value:paisOrigen,
			onChange:setPaisOrigen
		}

	}

	return(

		<div className="page-container">

			{loadingData ? (
				<Loader text="Cargando informacion de la marca..."></Loader>
			) : (

				<>
					{!mostrarDatos && (
						<div className="back-link-container">
							<button className="link-regresar" onClick={() => navigate(-1)}>
								Regresar
							</button>
						</div>
					)}

					<section className="section-editar">

						{!mostrarDatos ? (

							<>

								<h1 className="titulo-por-h1">
									Detalles de la marca {nombre}
								</h1>

								<div className="contenedor-campos">

									<p><strong>Nombre: </strong>{nombre}</p>
									<p><strong>País de origen:</strong> {paisOrigen}</p>

								</div>

							</>

						) : (

							<AdminFormEdit
								titulo="Editar marca"
								campos={campos}
								onSendForm={sendData}
								linkRegresar="/admin/brands"
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
				</>
			)}

		</div>

	)

}

export default EditBrand