import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import { createImage } from "../../../../services/imagesService"
import { searchProduct } from "../../../../services/productsService"

const CreateImages = () => {

    const navigate = useNavigate()

    const [file, setFile] = useState(null)
    const [id_producto, setIdProducto] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})

    function validateFields() {
        const errors = {}
        if (!file) errors.filename = "La imagen es obligatoria"
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

            const res = await createImage(file, id_producto)

            if (!res?.valid) {
                setError("Error al subir la imagen")
                return
            }

            navigate("/admin/imagenes")

        } catch (error) {
            setError("Error al enviar el formulario")
        } finally {
            setLoading(false)
        }
    }

    const campos = {
        filename: {
            titulo: "Imagen",
            name: "filename",
            type: "file",
            onChange: (e) => setFile(e)
        },
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
            titulo={"Subir imagen"}
            campos={campos}
            linkRegresar={"/admin/imagenes"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={"Subir imagen"}
            loading={loading}
        />
    )
}

export default CreateImages