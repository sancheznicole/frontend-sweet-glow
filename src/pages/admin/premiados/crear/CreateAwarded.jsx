import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import { createWinner } from "../../../../services/winnersService"
import { getAllAwards } from "../../../../services/awardsService"

const CreateAwarded = () => {

    const navigate = useNavigate()

    const [id_premio, setIdPremio] = useState("")
    const [id_usuario, setIdUsuario] = useState("")
    const [id_inscripcion, setIdInscripcion] = useState("")
    const [premios, setPremios] = useState({})
    const [usuarios, setUsuarios] = useState({})
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})

    useEffect(() => {
        async function fetchData() {
            try {
                const resPremios = await getAllAwards(1, 1000)
                if (resPremios?.valid) {
                    const lista = resPremios?.awards?.data ?? resPremios?.awards ?? []
                    const opciones = {}
                    lista.forEach(p => {
                        opciones[p.id_premio] = p.producto?.nombre ?? `Premio ${p.id_premio}`
                    })
                    setPremios(opciones)
                }
            } catch (error) {
                console.log(error?.message)
            }
        }
        fetchData()
    }, [])

    function validateFields() {
        const errors = {}
        if (id_premio === "") errors.id_premio = "El premio es obligatorio"
        if (id_usuario === "") errors.id_usuario = "El usuario es obligatorio"
        if (id_inscripcion === "") errors.id_inscripcion = "La inscripción es obligatoria"
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
            type: "select",
            options: premios,
            onChange: setIdPremio
        },
        id_usuario: {
            titulo: "ID Usuario",
            name: "id_usuario",
            type: "number",
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