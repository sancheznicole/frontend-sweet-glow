import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import { createWinner } from "../../../../services/winnersService"
import { searchProduct } from "../../../../services/productsService"
import { searchUsers } from "../../../../services/authService"

const CreateAwarded = () => {

    const navigate = useNavigate()

    const [id_premio, setIdPremio] = useState("")
    const [id_usuario, setIdUsuario] = useState("")
    const [id_inscripcion, setIdInscripcion] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})

    function validateFields() {
        const errors = {}
        if (!id_premio) errors.id_premio = "El premio es obligatorio"
        if (!id_usuario) errors.id_usuario = "El usuario es obligatorio"
        if (!id_inscripcion) errors.id_inscripcion = "La inscripción es obligatoria"
        setFieldErrors(errors)
        return Object.keys(errors).length > 0
    }

    const sendData = async () => {
        try {
            const validation = validateFields()
            if (validation) return

            setLoading(true)
            setError("")

            const res = await createWinner(id_premio, id_usuario, id_inscripcion)

            if (!res?.valid) {
                setError("Error al crear el premiado")
                return
            }

            navigate("/admin/premiados")

        } catch (error) {
            setError("Error al enviar el formulario")
        } finally {
            setLoading(false)
        }
    }

    const campos = {
        id_premio: {
        titulo: "Premio",
        name: "id_premio",
        type: "text-search",
        searchFunction: searchProduct,  // la función que trae los premios
        data_key: "products",           // clave donde viene el array en la respuesta
        save_data_key: "id_producto",   // la propiedad que guardarás al seleccionar
        text_keys: "nombre",            // campos que se muestran en la búsqueda
        onChange: setIdPremio
        },
        id_usuario: {
            titulo: "Usuario",
            name: "id_usuario",
            type: "text-search",
            searchFunction: searchUsers,
            data_key: "users",
            save_data_key: "id_usuario",
            text_keys: "nombres,apellidos,correo",
            onChange: setIdUsuario
        },
        id_inscripcion: {
            titulo: "ID Inscripción",
            name: "id_inscripcion",
            type: "number",
            onChange: setIdInscripcion
        }
    }

    return (
        <AdminFormCreate
            titulo={"Crear premiado"}
            campos={campos}
            linkRegresar={"/admin/premiados"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={"Crear premiado"}
            loading={loading}
        />
    )
}

export default CreateAwarded