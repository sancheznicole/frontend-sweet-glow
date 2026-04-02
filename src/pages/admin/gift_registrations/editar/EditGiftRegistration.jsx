import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getGiftRegistration, updateGiftRegistration } from '../../../../services/giftRegistrationService'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../../components/Loader'

const estadoOptions = {
    'pendiente':  'Pendiente',
    'activa':     'Activa',
    'completada': 'Completada',
    'cancelada':  'Cancelada'
}

const EditGiftRegistration = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [loadingData, setLoadingData] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [fieldErrors, setFieldErrors] = useState({})   // ← nuevo
    const [mostrarDatos, setMostrarDatos] = useState(false)

    const [estado, setEstado] = useState('')
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
            } finally {
                setLoadingData(false)
            }
        }
        fetchInscripcion()
    }, [id])

    // ← función de validación
    function validateFields() {
        const errors = {}

        if (!estado || estado.trim() === '') {
            errors.estado = "Debes seleccionar un estado"
        } else if (!Object.keys(estadoOptions).includes(estado)) {
            errors.estado = "El estado seleccionado no es válido"
        }

        setFieldErrors(errors)
        return Object.keys(errors).length > 0
    }

    async function sendData() {
        try {
            if (validateFields()) return   // ← validar antes de enviar

            setLoading(true)
            setError('')

            const res = await updateGiftRegistration(id, estado)

            if (!res?.valid) {
                setError("Error al actualizar la inscripción")
                return
            }

            setMostrarDatos(false)
            setFieldErrors({})   // ← limpiar errores al guardar exitosamente

        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="page-container">

            {loadingData ? (
                <Loader text='Cargando informacion de la inscripcion regalo...'></Loader>
            ) : (
                <>
                    {!mostrarDatos && (
                        <div className="back-link-container">
                            <button className="link-regresar" onClick={() => navigate(-1)}>Regresar</button>
                        </div>
                    )}

                    <section className="section-editar">

                        {!mostrarDatos ? (

                            <>
                                <h1 className="titulo-por-h1">Detalles de la inscripción de {usuarioNombre}</h1>
                                <div className="contenedor-campos">
                                    <p><strong>Usuario:</strong> {usuarioNombre}</p>
                                    <p><strong>Factura:</strong> #{facturaId}</p>
                                    <p><strong>Estado:</strong> {estadoOptions[estado] ?? estado}</p>
                                </div>
                            </>

                        ) : (

                            <div>
                                <h1 className="titulo-por-h1">Editar inscripción</h1>

                                <div className="contenedor-campos" style={{ marginBottom: '20px' }}>
                                    <p><strong>Usuario:</strong> {usuarioNombre}</p>
                                    <p><strong>Factura:</strong> {facturaId}</p>
                                </div>

                                <div className="campo-grupo">
                                    <label className="campo-label">Estado</label>
                                    <select
                                        className="input-busqueda"
                                        value={estado}
                                        onChange={e => {
                                            setEstado(e.target.value)
                                            setFieldErrors({})   // ← limpiar error al cambiar
                                        }}
                                    >
                                        <option value="">Selecciona un estado</option>   {/* ← opción vacía para forzar selección */}
                                        {Object.entries(estadoOptions).map(([val, label]) => (
                                            <option key={val} value={val}>{label}</option>
                                        ))}
                                    </select>
                                    {fieldErrors.estado && <p className="error-field">{fieldErrors.estado}</p>}  {/* ← error del campo */}
                                </div>

                                {error && <p className="error-message">{error}</p>}

                                <button
                                    className="modificar-profile guardar-cambios"
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
                                className={mostrarDatos ? "cancelar-profile cancelar-tarjeta" : "modificar-profile"}
                                onClick={() => {
                                    setMostrarDatos(!mostrarDatos)
                                    setFieldErrors({})   // ← limpiar errores al cancelar
                                }}
                            >
                                {mostrarDatos ? "Cancelar" : "Modificar"}
                            </button>
                        </div>

                    </section>
                </>
            )}

        </div>
    )
}

export default EditGiftRegistration