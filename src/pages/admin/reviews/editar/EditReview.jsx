import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { updateReview,getReview } from "../../../../services/reviewsService"
import { Link } from "react-router-dom"

const EditReview = () => {

	const { id } = useParams()

	const [loading,setLoading] = useState(false)
	const [error,setError] = useState("")
	const [fieldErrors,setFieldErrors] = useState({})
	const [mostrarDatos,setMostrarDatos] = useState(false)

	const [resena,setResena] = useState("")
	const [idProducto,setIdProducto] = useState("")
	const [idUsuario,setIdUsuario] = useState("")

	function validateFields(){

		const errors = {}

		if(resena.trim().length < 3){
			errors.resena = "La reseña debe tener mínimo 3 caracteres"
		}

		setFieldErrors(errors)

		return Object.keys(errors).length > 0

	}

	async function sendData(){

		try{

			const validation = validateFields()

			if(validation) return

			setLoading(true)

			let res = await updateReview(id,resena,idProducto,idUsuario)

			if(!res?.valid){
				setError("Error al actualizar reseña")
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

				const res = await getReview(id)

				if(!res?.valid){
					setError("Error al obtener reseña")
					return
				}

				setResena(res?.review?.resena)
				setIdProducto(res?.review?.id_producto)
				setIdUsuario(res?.review?.id_usuario)

			}catch(error){

				setError(error.message)

			}

		}

		getData()

	},[])

	const campos = {

		resena:{
			titulo:"Reseña",
			name:"resena",
			type:"text",
			value:resena,
			onChange:setResena
		},

		id_producto:{
			titulo:"ID Producto",
			name:"id_producto",
			type:"number",
			value:idProducto,
			onChange:setIdProducto
		},

		id_usuario:{
			titulo:"ID Usuario",
			name:"id_usuario",
			type:"number",
			value:idUsuario,
			onChange:setIdUsuario
		}

	}

	return(

		<div className="page-container">

			{!mostrarDatos && (
				<div className="back-link-container">
					<Link className="link-regresar" to="/admin/reviews">Regresar</Link>
				</div>
			)}

			<section className="section-editar">

				{!mostrarDatos ? (

					<>

						<h1 className="titulo-por-h1">
							Detalles de la reseña
						</h1>

						<div className="contenedor-campos">

							<strong><p>Reseña: {resena}</p></strong>
							<p>ID Producto: {idProducto}</p>
							<p>ID Usuario: {idUsuario}</p>

						</div>

					</>

				) : (

					<AdminFormEdit
						titulo="Editar reseña"
						campos={campos}
						onSendForm={sendData}
						linkRegresar="/admin/reviews"
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

export default EditReview