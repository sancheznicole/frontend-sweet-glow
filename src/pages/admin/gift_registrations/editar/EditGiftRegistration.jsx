import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getGiftRegistration, updateGiftRegistration } from '../../../../services/giftRegistrationService'

const estadoOptions = {
    'pendiente':  '⏳ Pendiente',
    'activa':     '✅ Activa',
    'completada': '🎁 Completada',
    'cancelada':  '❌ Cancelada'
}

const EditGiftRegistration = () => {

    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [mostrarDatos, setMostrarDatos] = useState(false)

    // Editable
    const [estado, setEstado] = useState('')

    // Solo lectura
    const [usuarioNombre, setUsuarioNombre] = useState('')
    const [facturaId, setFacturaId] = useState('')

    useEffect(() => {
        const fetchInscripcion = async () => {
            try {
                const res = await getGiftRegistration(id)
                if (!res?.valid) {
                    setError("Error al obtener la inscripción")
                    return
                }
                const i = res.inscripcion
                setEstado(i.estado ?? 'pendiente')
                setUsuarioNombre(
                    i.usuario
                        ? `${i.usuario.nombres} ${i.usuario.apellidos}`
                        : `Usuario #${i.id_usuario}`
                )
                setFacturaId(i.id_factura_pedido)
            } catch (e) {
                setError(e.message)
            }
        }
        fetchInscripcion()
    }, [id])

    async function sendData() {
        try {
            if (!estado) {
                setError("Selecciona un estado")
                return
            }
            setLoading(true)
            setError('')

            const res = await updateGiftRegistration(id, estado)

            if (!res?.valid) {
                setError("Error al actualizar la inscripción")
                return
            }

            setMostrarDatos(false)

        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="page-container">

            {!mostrarDatos && (
                <div className="back-link-container">
                    <Link className="link-regresar" to="/admin/gift_registrations">Regresar</Link>
                </div>
            )}

            <section className="section-editar">

                {!mostrarDatos ? (

                    <>
                        <h1 className="titulo-por-h1">Detalles de la inscripción #{id}</h1>
                        <div className="contenedor-campos">
                            <p><strong>Usuario:</strong> {usuarioNombre}</p>
                            <p><strong>Factura:</strong> #{facturaId}</p>
                            <p><strong>Estado:</strong> {estadoOptions[estado] ?? estado}</p>
                        </div>
                    </>

                ) : (

                    <div>
                        <h1 className="titulo-por-h1">Editar inscripción #{id}</h1>

                        {/* Solo lectura */}
                        <div className="contenedor-campos" style={{ marginBottom: '20px' }}>
                            <p><strong>Usuario:</strong> {usuarioNombre}</p>
                            <p><strong>Factura:</strong> {facturaId}</p>
                        </div>

                        {/* Estado editable */}
                        <div className="campo-grupo">
                            <label className="campo-label">Estado</label>
                            <select
                                className="input-busqueda"
                                value={estado}
                                onChange={e => setEstado(e.target.value)}
                            >
                                {Object.entries(estadoOptions).map(([val, label]) => (
                                    <option key={val} value={val}>{label}</option>
                                ))}
                            </select>
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

export default EditGiftRegistration