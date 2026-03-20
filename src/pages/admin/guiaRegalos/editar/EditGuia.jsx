import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { getGuia, updateGuia } from "../../../../services/giftGuideService"

const EditGuia = () => {

    const { id } = useParams()

    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})
    const [mostrarDatos, setMostrarDatos] = useState(false)

    useEffect(() => {
        async function getData() {
            try {
                const res = await getGuia(id)
                if (!res?.valid) {
                    setError("Error al obtener la guía")
                    return
                }
                setNombre(res?.data?.nombre)
                setDescripcion(res?.data?.descripcion)
            } catch (error) {
                setError(error.message)
            }
        }
        getData()
    }, [id])

    async function sendData() {
        try {
            const errors = {}
            if (nombre.trim().length < 1) errors.nombre = "El nombre es obligatorio"

            if (Object.keys(errors).length > 0) {
                setFieldErrors(errors)
                return
            }

            setLoading(true)
            setError("")

            const res = await updateGuia(id, nombre, descripcion)

            if (!res?.valid) {
                setError("Error al actualizar la guía")
                return
            }

            setMostrarDatos(false)

        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const campos = {
        nombre: {
            titulo: "Nombre",
            name: "nombre",
            type: "text",
            value: nombre,
            onChange: setNombre
        },
        descripcion: {
            titulo: "Descripción",
            name: "descripcion",
            type: "text",
            value: descripcion,
            onChange: setDescripcion
        }
    }

    return (
        <div className="page-container">

            {!mostrarDatos && (
                <div className="back-link-container">
                    <Link className="link-regresar" to="/admin/guiaRegalos">Regresar</Link>
                </div>
            )}

            <section className="section-editar">

                {!mostrarDatos ? (
                    <>
                        <h1 className="titulo-por-h1">Detalles de la guía</h1>
                        <div className="contenedor-campos">
                            <p><strong>Nombre:</strong> {nombre}</p>
                            <p><strong>Descripción:</strong> {descripcion}</p>
                        </div>
                    </>
                ) : (
                    <AdminFormEdit
                        titulo={"Editar guía de regalos"}
                        campos={campos}
                        onSendForm={sendData}
                        linkRegresar={"/admin/guiaRegalos"}
                        error={error}
                        fieldErrors={fieldErrors}
                        button={"Guardar cambios"}
                        loading={loading}
                    />
                )}

                <div className="contenedor-editar-botones">
                    <button
                        className={mostrarDatos ? "cancelar-profile" : "modificar-profile"}
                        onClick={() => setMostrarDatos(!mostrarDatos)}
                    >
                        {mostrarDatos ? "Cancelar" : "Modificar"}
                    </button>
                </div>

            </section>
        </div>
    )
}

export default EditGuia