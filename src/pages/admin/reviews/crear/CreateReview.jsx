import { useState, useEffect } from "react"
import { createReview } from "../../../../services/reviewsService"
import { getAllProducts } from "../../../../services/productsService"
import { getAllUsers } from "../../../../services/authService"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import { useNavigate } from "react-router-dom"

const CreateReview = () => {

	const navigate = useNavigate()

	const [loading,setLoading] = useState(false)
	const [error,setError] = useState("")
	const [fieldErrors,setFieldErrors] = useState({})

	const [resena,setResena] = useState("")
	const [idProducto,setIdProducto] = useState("")
	const [idUsuario,setIdUsuario] = useState("")

	const [productos,setProductos] = useState([])
	const [usuarios,setUsuarios] = useState([])

	useEffect(()=>{

		async function cargarDatos(){

			try{

				const productosRes = await getAllProducts(1,100)
				const usuariosRes = await getAllUsers(1,100)

				if(productosRes?.valid){
					setProductos(productosRes.products || [])
				}

				if(usuariosRes?.valid){
					setUsuarios(usuariosRes.users?.data || [])
				}

			}catch(error){
				console.error(error)
			}

		}

		cargarDatos()

	},[])

	const campos = {

		resena:{
			onChange:setResena,
			type:"text",
			name:"resena",
			titulo:"Reseña"
		},

		id_producto:{
			onChange:setIdProducto,
			type:"select",
			name:"id_producto",
			titulo:"Producto",
			options: productos.map(p => ({
				value: p.id_producto,
				label: p.nombre
			}))
		},

		id_usuario:{
			onChange:setIdUsuario,
			type:"select",
			name:"id_usuario",
			titulo:"Usuario",
			options: usuarios.map(u => ({
                value: u.id,
                label: `${u.nombres} ${u.apellidos}`
            }))
		}

	}

	function validateFields(){

		const errors = {}

		if(resena.trim().length < 3){
			errors.resena = "La reseña debe tener mínimo 3 caracteres"
		}

		if(!idProducto){
			errors.id_producto = "El producto es obligatorio"
		}

		if(!idUsuario){
			errors.id_usuario = "El usuario es obligatorio"
		}

		setFieldErrors(errors)

		return Object.keys(errors).length > 0

	}

	const sendData = async ()=>{

		try{

			const validation = validateFields()

			if(validation) return

			setLoading(true)

			let res = await createReview(resena,idProducto,idUsuario)

			if(!res?.valid){
				setError("Error al crear reseña")
				return
			}

			navigate("/admin/reviews")

		}catch(error){

			setError(error.message)

		}
		finally{

			setLoading(false)

		}

	}

	return(

		<AdminFormCreate
			titulo={"Crear reseña"}
			campos={campos}
			linkRegresar={"/admin/reviews"}
			onSendForm={sendData}
			error={error}
			fieldErrors={fieldErrors}
			button={"Crear reseña"}
			loading={loading}
		/>

	)

}

export default CreateReview