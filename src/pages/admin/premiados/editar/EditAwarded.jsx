import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { getWinner, updateWinner } from "../../../../services/winnersService"
import { getAllAwards } from "../../../../services/awardsService"

const EditAwarded = () => {

    const { id } = useParams()

    const [id_premio, setIdPremio] = useState("")
    const [id_usuario, setIdUsuario] = useState("")
    const [id_inscripcion, setIdInscripcion] = useState("")
    const [premios, setPremios] = useState({})
    const [nombreUsuario, setNombreUsuario] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})
    const [mostrarDatos, setMostrarDatos] = useState(false)

    useEffect(() => {

        async function getData() {
            try {
                const res = await getWinner(id)
                if (!res?.valid) {
                    setError("Error al obtener el premiado")
                    return
                }
                setIdPremio(res?.winner?.id_premio)
                setIdUsuario(res?.winner?.id_usuario)
                setIdInscripcion(res?.winner?.id_inscripcion)
                setNombreUsuario(res?.winner?.usuario?.nombres)
            } catch (error) {
                setError(error.message)
            }
        }

        async function fetchPremios() {
            try {
                const res = await getAllAwards(1, 1000)
                if (!res?.valid) return
                const lista = res?.awards?.data ?? res?.awards ?? []
                const opciones = {}
                lista.forEach(p => {
                    opciones[p.id_premio] = p.producto?.nombre ?? `Premio ${p.id_premio}`
                })
                setPremios(opciones)
            } catch (error) {
                console.log(error?.message)
            }
        }

        getData()
        fetchPremios()

    }, [id])

    async function sendData() {
        try {
            const errors = {}
            if (id_premio === "") errors.id_premio = "El premio es obligatorio"
            if (id_usuario === "") errors.id_usuario = "El usuario es obligatorio"
            if (id_inscripcion === "") errors.id_inscripcion = "La inscripción es obligatoria"

            if (Object.keys(errors).length > 0) {
                setFieldErrors(errors)
                return
            }

            setLoading(true)
            setError("")

            const res = await updateWinner(id, id_premio, id_usuario, id_inscripcion)

            if (!res?.valid) {
                setError("Error al actualizar el premiado")
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
        id_premio: {
            titulo: "Premio",
            name: "id_premio",
            type: "select",
            value: id_premio,
            options: premios,
            onChange: setIdPremio
        },
        id_usuario: {
            titulo: "ID Usuario",
            name: "id_usuario",
            type: "number",
            value: id_usuario,
            onChange: setIdUsuario
        },
        id_inscripcion: {
            titulo: "ID Inscripción",
            name: "id_inscripcion",
            type: "number",
            value: id_inscripcion,
            onChange: setIdInscripcion
        }
    }

    return (
        <div className="page-container">

            {!mostrarDatos && (
                <div className="back-link-container">
                    <Link className="link-regresar" to="/admin/premiados">Regresar</Link>
                </div>
            )}

            <section className="section-editar">

                {!mostrarDatos ? (
                    <>
                        <h1 className="titulo-por-h1">Detalles del premiado</h1>
                        <div className="contenedor-campos">
                            <p><strong>Usuario:</strong> {nombreUsuario}</p>
                            <p><strong>ID Premio:</strong> {id_premio}</p>
                            <p><strong>ID Inscripción:</strong> {id_inscripcion}</p>
                        </div>
                    </>
                ) : (
                    <AdminFormEdit
                        titulo={"Editar premiado"}
                        campos={campos}
                        onSendForm={sendData}
                        linkRegresar={"/admin/premiados"}
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

export default EditAwarded