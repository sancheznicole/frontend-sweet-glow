import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createGiftRegistration, buscarUsuariosInscripcion, getAllFacturas } from '../../../../services/giftRegistrationService'

const CreateGiftRegistration = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState({})

    // Usuario
    const [usuarioId, setUsuarioId] = useState('')
    const [usuarioNombre, setUsuarioNombre] = useState('')
    const [busqueda, setBusqueda] = useState('')
    const [resultados, setResultados] = useState([])
    const [buscando, setBuscando] = useState(false)

    // Factura
    const [facturaId, setFacturaId] = useState('')
    const [facturas, setFacturas] = useState([])
    const [loadingFacturas, setLoadingFacturas] = useState(false)

    // Debounce búsqueda de usuarios
    useEffect(() => {
        if (!busqueda.trim()) {
            setResultados([])
            return
        }
        const timer = setTimeout(async () => {
            setBuscando(true)
            try {
                const res = await buscarUsuariosInscripcion(busqueda)
                if (res?.valid) setResultados(res.usuarios)
            } catch (e) {
                console.log(e.message)
            } finally {
                setBuscando(false)
            }
        }, 400)
        return () => clearTimeout(timer)
    }, [busqueda])

    // Cargar facturas cuando se selecciona un usuario
    const handleSelectUsuario = async (id, nombre) => {
        setUsuarioId(id)
        setUsuarioNombre(nombre)
        setBusqueda(nombre)
        setResultados([])
        setFacturaId('')
        setFacturas([])

        setLoadingFacturas(true)
        try {
            const res = await getAllFacturas(id)
            if (res?.valid) setFacturas(res.facturas)
        } catch (e) {
            console.log(e.message)
        } finally {
            setLoadingFacturas(false)
        }
    }

    function validateFields() {
        const errors = {}
        if (!usuarioId) errors.usuario = "Selecciona un usuario"
        if (!facturaId) errors.factura = "Selecciona una factura"
        setFieldErrors(errors)
        return Object.keys(errors).length > 0
    }

    const sendData = async () => {
        try {
            if (validateFields()) return
            setLoading(true)
            setError('')

            const res = await createGiftRegistration(usuarioId, facturaId)

            if (!res?.valid) {
                setError(res?.error ?? 'Error al crear la inscripción')
                return
            }

            navigate(-1)

        } catch (e) {
            setError('Error al enviar el formulario')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="page-container">

            <div className="back-link-container">
                <button className="link-regresar" onClick={() => {navigate(-1)}}>Regresar</button>
            </div>

            <section className="section-editar">
                <h1 className="titulo-por-h1">Crear inscripción regalo</h1>

                <div className="contenedor-campos">

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
                                setFacturaId('')
                                setFacturas([])
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

                    {/* Select de factura */}
                    <div className="campo-grupo">
                        <label className="campo-label">Factura / Pedido</label>
                        {loadingFacturas ? (
                            <p className="stepper-cargando">Cargando facturas...</p>
                        ) : (
                            <select
                                className="input-busqueda"
                                value={facturaId}
                                onChange={e => setFacturaId(e.target.value)}
                                disabled={!usuarioId}
                            >
                                <option value="">
                                    {usuarioId ? 'Selecciona una factura' : 'Primero selecciona un usuario'}
                                </option>
                                {facturas.map(f => (
                                    <option key={f.id_factura_pedido} value={f.id_factura_pedido}>
                                        #{f.id_factura_pedido}
                                        {f.neto ? ` — $${Number(f.neto).toLocaleString()}` : ''}
                                    </option>
                                ))}
                            </select>
                        )}
                        {!usuarioId && !loadingFacturas && (
                            <p className="stepper-vacio">Selecciona un usuario para ver sus facturas</p>
                        )}
                        {usuarioId && !loadingFacturas && facturas.length === 0 && (
                            <p className="stepper-vacio">Este usuario no tiene facturas disponibles</p>
                        )}
                        {fieldErrors.factura && <p className="error-field">{fieldErrors.factura}</p>}
                    </div>

                </div>

                {error && <p className="error-message">{error}</p>}

                <div className="contenedor-editar-botones">
                    <button
                        className="modificar-profile"
                        onClick={sendData}
                        disabled={loading}
                    >
                        {loading ? 'Creando...' : 'Crear inscripción'}
                    </button>
                </div>

            </section>
        </div>
    )
}

export default CreateGiftRegistration