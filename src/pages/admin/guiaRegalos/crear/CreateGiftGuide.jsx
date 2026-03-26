import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import { createGiftGuide } from "../../../../services/giftGuideService"

const CreateGiftGuide = () => {

    const navigate = useNavigate()

    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})

    function validateFields() {
        const errors = {}
        if (nombre.trim().length < 1) errors.nombre = "El nombre es obligatorio"
        setFieldErrors(errors)
        return Object.keys(errors).length > 0
    }

    const sendData = async () => {
        try {
            const validation = validateFields()
            if (validation) return

            setLoading(true)
            setError("")

            const res = await createGiftGuide(nombre, descripcion)

            if (!res?.valid) {
                setError("Error al crear la guía de regalos")
                return
            }

            navigate(-1)

        } catch (error) {
            setError("Error al enviar el formulario")
        } finally {
            setLoading(false)
        }
    }

    const campos = {
        nombre: {
            titulo: "Nombre",
            name: "nombre",
            type: "text",
            onChange: setNombre
        },
        descripcion: {
            titulo: "Descripción",
            name: "descripcion",
            type: "text",
            onChange: setDescripcion
        }
    }

    return (
        <AdminFormCreate
            titulo={"Crear guía de regalos"}
            campos={campos}
            linkRegresar={"/admin/giftGuide"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={"Crear guía"}
            loading={loading}
        />
    )
}

export default CreateGiftGuide