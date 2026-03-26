import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import { createAward } from "../../../../services/awardsService"
import { searchProduct } from "../../../../services/productsService"

const CreateAward = () => {

    const navigate = useNavigate()

    const [id_producto, setIdProducto] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})

    function validateFields() {
        const errors = {}
        if (!id_producto) errors.id_producto = "El producto es obligatorio"
        setFieldErrors(errors)
        return Object.keys(errors).length > 0
    }

    const sendData = async () => {
        try {
            const validation = validateFields()
            if (validation) return

            setLoading(true)
            setError("")

            const res = await createAward(id_producto)

            if (!res?.valid) {
                setError("Error al crear el premio")
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
        id_producto: {
            titulo: "Producto",
            name: "id_producto",
            type: "text-search",
            searchFunction: searchProduct,
            data_key: "products",
            save_data_key: "id_producto",
            text_keys: "nombre",
            onChange: setIdProducto
        }
    }

    return (
        <AdminFormCreate
            titulo={"Crear premio"}
            campos={campos}
            linkRegresar={"/admin/premios"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={"Crear premio"}
            loading={loading}
        />
    )
}

export default CreateAward