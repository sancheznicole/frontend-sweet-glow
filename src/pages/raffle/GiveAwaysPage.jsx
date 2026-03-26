import React, { useState } from 'react'
import { getAllFacturas, createGiftRegistration } from '../../services/giftRegistrationService'
import { useAuth } from '../../contexts/AuthContext'

const GiveAwaysPage = () => {

    const { user } = useAuth()

    const [modalAbierto, setModalAbierto] = useState(false)
    const [facturas, setFacturas]         = useState([])
    const [facturaId, setFacturaId]       = useState('')
    const [loadingFacturas, setLoadingFacturas] = useState(false)
    const [loading, setLoading]           = useState(false)
    const [error, setError]               = useState('')
    const [exito, setExito]               = useState(false)

    const abrirModal = async () => {
        setError('')
        setExito(false)
        setFacturaId('')
        setFacturas([])
        setModalAbierto(true)

        if (!user?.id_usuario) {
            setError('Debes iniciar sesión para inscribirte.')
            return
        }

        setLoadingFacturas(true)
        try {
            const res = await getAllFacturas(user.id_usuario)
            if (res?.valid) setFacturas(res.facturas)
            else setError('No se pudieron cargar tus facturas.')
        } catch (e) {
            setError('Error al cargar facturas.')
        } finally {
            setLoadingFacturas(false)
        }
    }

    const cerrarModal = () => {
        if (loading) return
        setModalAbierto(false)
        setError('')
        setExito(false)
        setFacturaId('')
    }

    const handleInscribirse = async () => {
        if (!facturaId) {
            setError('Selecciona una factura para continuar.')
            return
        }

        if (!user?.id_usuario) {
            setError('Debes iniciar sesión para inscribirte.')
            return
        }

        setLoading(true)
        setError('')
        try {
            const res = await createGiftRegistration(user.id_usuario, facturaId)
            if (res?.valid) {
                setExito(true)
            } else {
                setError(res?.error || 'No se pudo completar la inscripción.')
            }
        } catch (e) {
            setError('Error al inscribirse.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="giveaways-page">

            <div className="giveaways-split">

                {/* Lado izquierdo — imagen */}
                <div className="giveaways-split-imagen">
                    <img
                        src="/assets/sorteos.jpeg"
                        alt="Sorteo Sweet Glow"
                        className="giveaways-imagen-real"
                    />
                </div>

                {/* Lado derecho — título + requisitos + botón */}
                <div className="giveaways-split-contenido">
                    <p className="giveaways-eyebrow">✦ sorteo especial</p>
                    <h1 className="giveaways-titulo">Inscríbete<br />y participa</h1>
                    <p className="giveaways-tag">¿Cómo participar?</p>

                    <ol className="giveaways-requisitos-lista">
                        <li>
                            <span className="req-numero">01</span>
                            <div>
                                <strong>Realiza una compra</strong>
                                <p>Debes tener al menos una compra registrada en Sweet Glow para poder participar.</p>
                            </div>
                        </li>
                        <li>
                            <span className="req-numero">02</span>
                            <div>
                                <strong>Usa tu factura</strong>
                                <p>Al inscribirte, selecciona la factura de tu compra. Cada factura solo puede usarse una vez.</p>
                            </div>
                        </li>
                        <li>
                            <span className="req-numero">03</span>
                            <div>
                                <strong>Espera el sorteo</strong>
                                <p>Una vez inscrito, estarás participando automáticamente. Te notificaremos si eres el ganador.</p>
                            </div>
                        </li>
                    </ol>

                    <button className="giveaways-btn" onClick={abrirModal}>
                        Inscribirme ahora
                    </button>
                </div>

            </div>

            {/* Modal */}
            {modalAbierto && (
                <div className="giveaways-modal-overlay" onClick={cerrarModal}>
                    <div className="giveaways-modal" onClick={e => e.stopPropagation()}>

                        <button className="giveaways-modal-cerrar" onClick={cerrarModal}>✕</button>

                        {exito ? (
                            <div className="giveaways-modal-exito">
                                <span className="exito-icon"></span>
                                <h3>¡Inscripción exitosa!</h3>
                                <p>Ya estás participando en el sorteo. ¡Buena suerte!</p>
                                <button className="giveaways-btn" onClick={cerrarModal}>Cerrar</button>
                            </div>
                        ) : (
                            <>
                                <p className="giveaways-tag" style={{ marginBottom: '8px' }}>sorteo Sweet Glow</p>
                                <h3 className="giveaways-modal-titulo">Selecciona tu factura</h3>
                                <p className="giveaways-modal-desc">
                                    Elige una de tus facturas para participar. Cada factura solo puede usarse una vez.
                                </p>

                                {loadingFacturas ? (
                                    <p className="giveaways-cargando">Cargando tus facturas...</p>
                                ) : facturas.length === 0 && !error ? (
                                    <p className="giveaways-vacio">No tienes facturas disponibles para inscribirte.</p>
                                ) : (
                                    <select
                                        className="giveaways-select"
                                        value={facturaId}
                                        onChange={e => {
                                            setFacturaId(e.target.value)
                                            setError('')
                                        }}
                                    >
                                        <option value="">Selecciona una factura</option>
                                        {facturas.map(f => (
                                            <option key={f.id_factura_pedido} value={f.id_factura_pedido}>
                                                #{f.id_factura_pedido}{f.neto ? ` — $${Number(f.neto).toLocaleString()}` : ''}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                {error && <p className="giveaways-error">{error}</p>}

                                <button
                                    className="giveaways-btn"
                                    style={{ width: '100%', marginTop: '20px' }}
                                    onClick={handleInscribirse}
                                    disabled={loading || loadingFacturas || facturas.length === 0}
                                >
                                    {loading ? 'Inscribiendo...' : 'Confirmar inscripción'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    )
}

export default GiveAwaysPage
