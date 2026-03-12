import { useState } from "react"
import { createBrand } from "../../../../services/brands"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import { useNavigate } from "react-router-dom"

const CreateBrand = () => {

	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [fieldErrors, setFieldErrors] = useState({})

	const [nombre, setNombre] = useState("")
	const [paisOrigen, setPaisOrigen] = useState("")

	const campos = {

		nombre:{
			onChange:setNombre,
			type:"text",
			name:"nombre",
			titulo:"Nombre de la marca"
		},

		pais_origen:{
			onChange:setPaisOrigen,
			type:"text",
			name:"pais_origen",
			titulo:"País de origen"
		}

	}

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

	const sendData = async ()=>{

		try{

			const validation = validateFields()

			if(validation) return

			setLoading(true)

			setError("")

			let res = await createBrand(nombre, paisOrigen)

			if(!res?.valid){
				setError("Error al enviar el formulario")
				return
			}

			navigate("/admin/brands")

		}catch(error){

			setError("Error al enviar el formulario")

		}
		finally{

			setLoading(false)

		}

	}

	return(

		<AdminFormCreate
			titulo={"Crear marca"}
			campos={campos}
			linkRegresar={"/admin/brands"}
			onSendForm={sendData}
			error={error}
			fieldErrors={fieldErrors}
			button={"Crear marca"}
			loading={loading}
		/>

	)

}

export default CreateBrand