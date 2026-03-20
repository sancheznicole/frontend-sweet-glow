import { useState } from "react"
import { createCategory } from "../../../../services/categoriesService"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import { useNavigate } from "react-router-dom"

const CreateCategory = () => {

	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState("")
	const [fieldErrors, setFieldErrors] = useState({})

	const [nombre, setNombre] = useState("")

	const campos = {

		nombre:{
			onChange:setNombre,
			type:"text",
			name:"nombre",
			titulo:"Nombre"
		}

	}

	function validateFields() {
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

	const sendData = async ()=>{

		try{

			const validation = validateFields()

			if(validation) return

			setLoading(true)

			setError("")

			let res = await createCategory(nombre)

			if(!res?.valid){
				setError("Error al enviar el formulario")
				return
			}

			navigate("/admin/categories")

		}catch(error){

			setError("Error al enviar el formulario")

		}
		finally{

			setLoading(false)

		}

	}

	return(

		<AdminFormCreate
			titulo={"Crear categoría"}
			campos={campos}
			linkRegresar={"/admin/categories"}
			onSendForm={sendData}
			error={error}
			fieldErrors={fieldErrors}
			button={"Crear categoría"}
			loading={loading}
		/>

	)

}

export default CreateCategory