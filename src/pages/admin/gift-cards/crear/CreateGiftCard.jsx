import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createGiftCard, buscarUsuariosGiftCard } from '../../../../services/giftCardService'

const CreateGiftCard = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState({})

    const [monto, setMonto] = useState('')
    const [fechaExpiracion, setFechaExpiracion] = useState('')
    const [usuarioId, setUsuarioId] = useState('')
    const [usuarioNombre, setUsuarioNombre] = useState('')

    // Búsqueda de usuario
    const [busqueda, setBusqueda] = useState('')
    const [resultados, setResultados] = useState([])
    const [buscando, setBuscando] = useState(false)

    // Debounce búsqueda de usuarios
    useEffect(() => {
        if (!busqueda.trim()) {
            setResultados([])
            return
        }
        const timer = setTimeout(async () => {
            setBuscando(true)
            try {
                const res = await buscarUsuariosGiftCard(busqueda)
                if (res?.valid) setResultados(res.usuarios)
            } catch (e) {
                console.log(e.message)
            } finally {
                setBuscando(false)
            }
        }, 400)
        return () => clearTimeout(timer)
    }, [busqueda])

    const handleSelectUsuario = (id, nombre) => {
        setUsuarioId(id)
        setUsuarioNombre(nombre)
        setBusqueda(nombre)
        setResultados([])
    }

    function validateFields() {
        const errors = {}

        if (!monto || isNaN(monto) || Number(monto) < 1) {
            errors.monto = "El monto debe ser mayor a 0"
        }

        if (!fechaExpiracion) {
            errors.fechaExpiracion = "La fecha de vencimiento es requerida"
        } else if (new Date(fechaExpiracion) <= new Date()) {
            errors.fechaExpiracion = "La fecha debe ser futura"
        }

        if (!usuarioId) {
            errors.usuario = "Selecciona un usuario"
        }

        setFieldErrors(errors)
        return Object.keys(errors).length > 0
    }

    const sendData = async () => {
        try {
            if (validateFields()) return

            setLoading(true)
            setError('')

            const res = await createGiftCard(Number(monto), fechaExpiracion, usuarioId)

            if (!res?.valid) {
                setError('Error al crear la tarjeta regalo')
                return
            }

            navigate('/admin/gift-cards')

        } catch (e) {
            setError('Error al enviar el formulario')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="page-container">

            <div className="back-link-container">
                <Link className="link-regresar" to="/admin/gift-cards">Regresar</Link>
            </div>

            <section className="section-editar">
                <h1 className="titulo-por-h1">Crear tarjeta regalo</h1>

                <div className="contenedor-campos">

                    {/* Monto */}
                    <div className="campo-grupo">
                        <label className="campo-label">Monto</label>
                        <input
                            type="number"
                            min="1"
                            className="input-busqueda"
                            placeholder="Ej: 50000"
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
                            min={new Date().toISOString().split('T')[0]}
                        />
                        {fieldErrors.fechaExpiracion && <p className="error-field">{fieldErrors.fechaExpiracion}</p>}
                    </div>

                    {/* Búsqueda de usuario */}
                    <div className="campo-grupo">
                        <label className="campo-label">Usuario</label>
                        <input
                            type="text"
                            className="input-busqueda"
                            placeholder="Escribe nombre o apellido..."
                            value={busqueda}
                            onChange={e => {
                                setBusqueda(e.target.value)
                                setUsuarioId('')
                                setUsuarioNombre('')
                            }}
                        />
                        {buscando && <p className="stepper-cargando">Buscando...</p>}
                        {fieldErrors.usuario && <p className="error-field">{fieldErrors.usuario}</p>}

                        {resultados.length > 0 && (
                            <div className="stepper-lista" style={{ marginTop: '8px' }}>
                                {resultados.map(u => (
                                    <button
                                        key={u.id_usuario}
                                        className={`stepper-item ${String(usuarioId) === String(u.id_usuario) ? 'seleccionado' : ''}`}
                                        onClick={() => handleSelectUsuario(u.id_usuario, `${u.nombres} ${u.apellidos}`)}
                                    >
                                        <strong>{u.nombres} {u.apellidos}</strong>
                                        <span style={{ marginLeft: '8px', opacity: 0.6, fontSize: '13px' }}>
                                            {u.correo}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {busqueda && !buscando && resultados.length === 0 && !usuarioId && (
                            <p className="stepper-vacio">No se encontraron usuarios con "{busqueda}"</p>
                        )}

                        {usuarioId && (
                            <p className="stepper-seleccion-confirmada" style={{ marginTop: '8px' }}>
                                ✓ <strong>{usuarioNombre}</strong>
                            </p>
                        )}
                    </div>

                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="contenedor-editar-botones">
                    <button
                        className="modificar-profile"
                        onClick={sendData}
                        disabled={loading}
                    >
                        {loading ? 'Creando...' : 'Crear tarjeta regalo'}
                    </button>
                </div>

            </section>
        </div>
    )
}

export default CreateGiftCard