import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getGiftCard, updateGiftCard } from '../../../../services/giftCardService'

const estadoOptions = {
    'activa': '✅ Activa',
    'usada':  '❌ Usada'
}

const EditGiftCard = () => {

    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState({})
    const [mostrarDatos, setMostrarDatos] = useState(false)

    // Campos editables
    const [monto, setMonto] = useState('')
    const [fechaExpiracion, setFechaExpiracion] = useState('')
    const [estado, setEstado] = useState('activa')

    // Solo lectura
    const [usuarioNombre, setUsuarioNombre] = useState('')
    const [fechaUso, setFechaUso] = useState('')
    const [fechaCreacion, setFechaCreacion] = useState('')

    useEffect(() => {
        const fetchTarjeta = async () => {
            try {
                const res = await getGiftCard(id)
                if (!res?.valid) {
                    setError("Error al obtener la tarjeta")
                    return
                }
                const t = res.tarjeta
                setMonto(t.monto)
                setFechaExpiracion(t.fecha_expiracion?.split('T')[0] ?? t.fecha_expiracion ?? '')
                setEstado(t.estado)
                setUsuarioNombre(
                    t.usuario
                        ? `${t.usuario.nombres} ${t.usuario.apellidos}`
                        : `Usuario #${t.id_usuario}`
                )
                setFechaUso(t.fecha_de_uso ?? '—')
                setFechaCreacion(t.created_at ?? '—')
            } catch (e) {
                setError(e.message)
            }
        }
        fetchTarjeta()
    }, [id])

    function validateFields() {
        const errors = {}

        if (!monto || isNaN(monto) || Number(monto) < 1) {
            errors.monto = "El monto debe ser mayor a 0"
        }

        if (!fechaExpiracion) {
            errors.fechaExpiracion = "La fecha de vencimiento es requerida"
        }

        if (!estado) {
            errors.estado = "Selecciona un estado"
        }

        setFieldErrors(errors)
        return Object.keys(errors).length > 0
    }

    async function sendData() {
        try {
            if (validateFields()) return

            setLoading(true)
            setError('')

            const res = await updateGiftCard(id, Number(monto), fechaExpiracion, estado)

            if (!res?.valid) {
                setError("Error al actualizar la tarjeta")
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
                    <Link className="link-regresar" to="/admin/gift-cards">Regresar</Link>
                </div>
            )}

            <section className="section-editar">

                {!mostrarDatos ? (

                    <>
                        <h1 className="titulo-por-h1">Detalles de la tarjeta #{id}</h1>

                        <div className="contenedor-campos">
                            <p><strong>Usuario:</strong> {usuarioNombre}</p>
                            <p><strong>Monto:</strong> ${Number(monto).toLocaleString()}</p>
                            <p><strong>Estado:</strong> {estadoOptions[estado] ?? estado}</p>
                            <p><strong>Vencimiento:</strong> {fechaExpiracion}</p>
                            <p><strong>Fecha de uso:</strong> {fechaUso}</p>
                            <p><strong>Creada:</strong> {fechaCreacion}</p>
                        </div>
                    </>

                ) : (

                    <div>
                        <h1 className="titulo-por-h1">Editar tarjeta #{id}</h1>

                        {/* Usuario — solo lectura */}
                        <div className="contenedor-campos" style={{ marginBottom: '20px' }}>
                            <p><strong>Usuario:</strong> {usuarioNombre}</p>
                        </div>

                        <div className="contenedor-campos">

                            {/* Monto */}
                            <div className="campo-grupo">
                                <label className="campo-label">Monto</label>
                                <input
                                    type="number"
                                    min="1"
                                    className="input-busqueda"
                                    value={monto}
                                    onChange={e => setMonto(e.target.value)}
                                />
                                {fieldErrors.monto && <p className="error-field">{fieldErrors.monto}</p>}
                            </div>

                            {/* Fecha expiración */}
                            <div className="campo-grupo">
                                <label className="campo-label">Fecha de vencimiento</label>
                                <input
                                    type="date"
                                    className="input-busqueda"
                                    value={fechaExpiracion}
                                    onChange={e => setFechaExpiracion(e.target.value)}
                                />
                                {fieldErrors.fechaExpiracion && <p className="error-field">{fieldErrors.fechaExpiracion}</p>}
                            </div>

                            {/* Estado */}
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
                                {fieldErrors.estado && <p className="error-field">{fieldErrors.estado}</p>}
                            </div>

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

export default EditGiftCard