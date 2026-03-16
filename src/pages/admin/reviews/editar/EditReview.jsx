import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getReview, updateReview } from "../../../../services/reviewsService"

const EditReview = () => {

    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [mostrarDatos, setMostrarDatos] = useState(false)

    // Datos de solo lectura (no se pueden cambiar)
    const [productoNombre, setProductoNombre] = useState('')
    const [usuarioNombre, setUsuarioNombre] = useState('')

    // Solo la calificación es editable (el backend solo acepta resena en update)
    const [calificacion, setCalificacion] = useState(3)

    const stars = [1, 2, 3, 4, 5]

    const etiqueta = {
        1: '😞 Muy malo',
        2: '😕 Malo',
        3: '😐 Regular',
        4: '😊 Bueno',
        5: '🤩 Excelente',
    }

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const res = await getReview(id)
                if (!res?.valid) {
                    setError("Error al obtener la reseña")
                    return
                }
                const rev = res.review
                setCalificacion(Number(rev.resena))
                setProductoNombre(rev.producto?.nombre ?? `Producto #${rev.id_producto}`)
                setUsuarioNombre(
                    rev.usuario
                        ? `${rev.usuario.nombres} ${rev.usuario.apellidos}`
                        : `Usuario #${rev.id_usuario}`
                )
            } catch (err) {
                setError(err.message)
            }
        }
        fetchReview()
    }, [id])

    async function sendData() {
        try {
            if (!calificacion || calificacion < 1 || calificacion > 5) {
                setError("Selecciona una calificación entre 1 y 5")
                return
            }
            setLoading(true)
            setError("")
            const res = await updateReview(id, calificacion)
            if (!res?.valid) {
                setError("Error al actualizar la reseña")
                return
            }
            setMostrarDatos(false)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="page-container">

            {!mostrarDatos && (
                <div className="back-link-container">
                    <Link className="link-regresar" to="/admin/reviews">
                        Regresar
                    </Link>
                </div>
            )}

            <section className="section-editar">

                {!mostrarDatos ? (

                    <>
                        <h1 className="titulo-por-h1">
                            Detalles de la reseña #{id}
                        </h1>

                        <div className="contenedor-campos">
                            <strong><p>{productoNombre}</p></strong>
                            <p>{usuarioNombre}</p>
                            <p>
                                {'★'.repeat(calificacion)}{'☆'.repeat(5 - calificacion)}{' '}
                                ({calificacion}/5) — {etiqueta[calificacion]}
                            </p>
                        </div>
                    </>

                ) : (

                    <div className="stepper-panel">
                        <h1 className="titulo-por-h1">Editar reseña #{id}</h1>

                        {/* Info de solo lectura */}
                        <div className="contenedor-campos" style={{ marginBottom: '24px' }}>
                            <p><strong>Producto:</strong> {productoNombre}</p>
                            <p><strong>Usuario:</strong> {usuarioNombre}</p>
                        </div>

                        {/* Slider de calificación */}
                        <div className="stepper-estrellas">
                            <div className="estrellas-display">
                                {stars.map(s => (
                                    <span
                                        key={s}
                                        className={`estrella ${s <= calificacion ? 'activa' : ''}`}
                                        onClick={() => setCalificacion(s)}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>

                            <input
                                type="range"
                                min="1"
                                max="5"
                                step="1"
                                value={calificacion}
                                onChange={e => setCalificacion(Number(e.target.value))}
                                className="slider-estrellas"
                            />

                            <p className="calificacion-texto">{etiqueta[calificacion]}</p>
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button
                            className="modificar-profile"
                            onClick={sendData}
                            disabled={loading}
                            style={{ marginTop: '24px', width: '100%' }}
                        >
                            {loading ? 'Guardando...' : 'Guardar cambios'}
                        </button>
                    </div>

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

export default EditReview