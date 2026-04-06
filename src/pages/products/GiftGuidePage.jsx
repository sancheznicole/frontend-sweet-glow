import { useState, useEffect } from 'react'
import { getUserData } from "../../services/authService";
import { createGiftCard, getAllGiftCards, deleteGiftCard } from "../../services/giftCardService";
import { useNavigate } from "react-router-dom"
import { createGFPreference } from '../../services/paymentService';

const API_URL = import.meta.env.VITE_API_URL
const STORAGE_URL = import.meta.env.VITE_STORAGE_URL

const MONTOS_FIJOS = [80000, 100000, 200000, 300000]

const formatCOP = (n) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
    }).format(n)

const getToken = () => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored)?.access_token : null
}

const useToast = () => {
    const [toast, setToast] = useState({ msg: '', type: '', show: false })
    const show = (msg, type = 'success') => {
        setToast({ msg, type, show: true })
        setTimeout(() => setToast((t) => ({ ...t, show: false })), 3200)
    }
    return { toast, show }
}

// ── Sección Guía de Regalos ───────────────────────────────────────────────────
const GiftGuideSection = () => {
    const [guides, setGuides] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchGuides() {
            try {
                const res = await getAllGiftGuides()
                if (res?.valid) setGuides(res?.giftGuides?.data ?? [])
            } catch (error) {
                console.log(error?.message)
            } finally {
                setLoading(false)
            }
        }
        fetchGuides()
    }, [])

    return (
        <div className="gg-section">
            <div className="gg-header">
                <p className="gc-eyebrow">Sweet Glow · Inspiración</p>
                <h2 className="gg-titulo">GUÍA DE REGALOS</h2>
                <p className="gg-desc">Encuentra la inspiración perfecta para regalar en cada ocasión.</p>
            </div>

            {loading ? (
                <p className="gg-cargando">Cargando guías...</p>
            ) : guides.length === 0 ? (
                <p className="gg-vacio">No hay guías disponibles por el momento.</p>
            ) : (
                <div className="gg-grid">
                    {guides.map((guide) => (
                        <div key={guide.id_guia} className="gg-card">
                            <div className="gg-card-overlay">
                                <h3 className="gg-card-nombre">{guide.nombre}</h3>
                                <p className="gg-card-desc">{guide.descripcion}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const GiftCardPage = () => {

    const [usuario, setUsuario] = useState(null)
    const [montoSeleccionado, setMontoSeleccionado] = useState(null)
    const [montoCustom, setMontoCustom] = useState('')
    const navigate = useNavigate()
    const [comprando, setComprando] = useState(false)
    const [misTarjetas, setMisTarjetas] = useState([])
    const [cargando, setCargando] = useState(true)
    const { toast, show } = useToast()
    const montoFinal = montoSeleccionado ?? (montoCustom ? Number(montoCustom) : null)

    useEffect(() => {
        const token = getToken()
        if (!token) return
        getUserData(token).then((res) => {
            if (res?.valid) {
                console.log('👤 Usuario cargado:', res.user)
                setUsuario(res.user)
            }
        })
    }, [])

    useEffect(() => {
        if (!usuario) return
        cargarTarjetas()
    }, [usuario])

    const cargarTarjetas = async () => {
        try {
            setCargando(true)
            const res = await getAllGiftCards(1, 100, usuario?.id_usuario)
            if (res?.valid) {
                const todasLasTarjetas = res.tarjetas ?? []
                console.log('Todas las tarjetas:', todasLasTarjetas)
                const idUsuario = usuario?.id_usuario ?? usuario?.id ?? null
                const mias = todasLasTarjetas
                console.log('Mis tarjetas filtradas:', mias)
                setMisTarjetas(mias)
            }
        } catch (e) {
            console.error('Error cargando tarjetas:', e)
        } finally {
            setCargando(false)
        }
    }

    // ── Comprar tarjeta ───────────────────────────────────────────────────────
    const handleComprar = async () => {
        if (!montoFinal || montoFinal < 1000) {
            show('Ingresa un monto válido (mínimo $1.000)', 'error')
            return
        }
        if (!usuario) {
            navigate("/login")
            return
        }
        try {
            setComprando(true)
            const token = getToken()
            const fechaExp = new Date()
            fechaExp.setFullYear(fechaExp.getFullYear() + 1)
            const fechaExpStr = fechaExp.toISOString().split('T')[0]
            const idUsuario = usuario?.id_usuario ?? usuario?.id ?? usuario?.user_id

            let res = await createGiftCard(montoFinal, fechaExpStr, idUsuario)

            if(!res?.valid){
                show('No se pudo crear la tarjeta de regalo', 'error')
                return
            }

            let preference = await createGFPreference(res?.tarjeta?.id_tarjeta)

            if(!preference?.valid){
                return
            }

            window.location.href = preference?.preference?.init_point

            show('¡Tarjeta regalo creada con éxito! ', 'success')
            setMontoSeleccionado(null)
            setMontoCustom('')
            cargarTarjetas()
        } catch (e) {
            show('Error al crear la tarjeta regalo', 'error')
        } finally {
            setComprando(false)
        }
    }

    const handleAgregarAlCarrito = (tarjeta) => {
        console.log('🛒 Agregar al carrito — tarjeta:', tarjeta)
        show('Función pendiente de conectar con el carrito 🛒', 'success')
        localStorage.setItem("gift-card-to-apply", JSON.stringify(tarjeta))
        show('La tarjeta se agregará al carrito como descuento', 'success')
    }

    const tarjetaEsActiva = (t) => {
        const s = String(t.estado ?? '').toLowerCase().trim()
        return s === 'activa'
    }

    const handleDeleteCard = async (eliminar_tarjeta_id) => {
        try {
            console.log("🗑 Eliminando tarjeta:", eliminar_tarjeta_id)

            let res = await deleteGiftCard(eliminar_tarjeta_id);

            console.log("📩 Respuesta delete:", res)

            if (!res?.valid) {
                show("No se pudo eliminar la tarjeta", "error")
                return
            }

            show("Tarjeta eliminada correctamente", "success")
            cargarTarjetas()

        } catch (error) {
            console.error("❌ Error eliminando:", error)
            show("Error al eliminar la tarjeta", "error")
        }
    }

    return (
        <>
            <div className="gc-page page-container">

                <div className="gc-hero">
                    <div className="gc-hero-visual-col">
                        <div className="gc-card-visual">
                            <div className="gc-card-visual-brand">
                                Sweet Glow
                                <span>xoxo · tarjeta regalo</span>
                            </div>
                            <div className="gc-card-visual-bottom">
                                <span className="gc-card-visual-label">e-gift card</span>
                                <span className="gc-card-visual-amount">
                                    {montoFinal ? formatCOP(montoFinal) : '𐙚'} 
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="gc-hero-form-col">
                        {/* <span className="gc-eyebrow">Sweet Glow · Tarjeta Regalo</span> */}
                        <h1 className="gc-hero-title">
                            El regalo perfecto
                            siempre existe
                        </h1>
                        <p className="gc-hero-sub">
                            Regala libertad para elegir. Nuestra tarjeta regalo se asigna
                            al instante y se puede usar en toda la tienda.
                        </p>

                        <label className="gc-field-label">Montos sugeridos</label>
                        <div className="gc-pills">
                            {MONTOS_FIJOS.map((m) => (
                                <button
                                    key={m}
                                    className={`gc-pill${montoSeleccionado === m ? ' gc-pill--active' : ''}`}
                                    onClick={() => {
                                        setMontoSeleccionado(m)
                                        setMontoCustom('')
                                    }}
                                >
                                    {formatCOP(m)}
                                </button>
                            ))}
                        </div>

                        <label className="gc-field-label" style={{ marginTop: '16px' }}>
                            O ingresa otro valor
                        </label>
                        <div className="gc-input-wrap">
                            <span className="gc-input-prefix">$</span>
                            <input
                                className="gc-input"
                                type="number"
                                min="80000"
                                placeholder="Ej: 75000"
                                value={montoCustom}
                                onChange={(e) => {
                                    let value = e.target.value

                                    if (value.startsWith('-')) return

                                    const numericValue = Number(value)

                                    if (numericValue > 10000000) return

                                    setMontoCustom(value)
                                    setMontoSeleccionado(null)
                                }}
                            />
                        </div>

                        <div className="gc-summary-box">
                            <div className="gc-summary-row">
                                <span>Valor de la tarjeta</span>
                                <strong>{montoFinal ? formatCOP(montoFinal) : '—'}</strong>
                            </div>
                            <div className="gc-summary-row">
                                <span>Asignada a</span>
                                <strong>
                                    {usuario
                                        ? `${usuario.nombres} ${usuario.apellidos}`
                                        : 'Tu cuenta'}
                                </strong>
                            </div>
                            <div className="gc-summary-row">
                                <span>Vigencia</span>
                                <strong>1 año</strong>
                            </div>
                        </div>

                        <button
                            className="gc-btn-primary"
                            onClick={handleComprar}
                            disabled={comprando || !montoFinal}
                        >
                            {comprando
                                ? 'Procesando...'
                                : `Obtener tarjeta${montoFinal ? ` · ${formatCOP(montoFinal)}` : ''}`}
                        </button>
                    </div>
                </div>

                <div className="gc-body">
                    <div className="gc-sep">
                        <div className="gc-sep-line" />
                        <div className="gc-sep-dot" />
                        <div className="gc-sep-line" />
                    </div>

                    <p className="gc-panel-title">Mis tarjetas regalo</p>
                    <p className="gc-panel-desc" style={{ marginBottom: '28px' }}>
                        Aquí puedes ver y agregar al carrito tus tarjetas activas.
                    </p>

                    {cargando ? (
                        <div className="gc-empty">
                            <span className="gc-empty-icon">𐙚</span>
                            <p>Cargando tarjetas...</p>
                        </div>
                    ) : misTarjetas.length === 0 ? (
                        <div className="gc-empty">
                            <span className="gc-empty-icon"></span>
                            <p>Aún no tienes tarjetas regalo.<br />¡Obtén la tuya arriba!</p>
                        </div>
                    ) : (
                        <div className="gc-cards-grid">
                            {misTarjetas.map((t) => {
                                const activa = tarjetaEsActiva(t)
                                const vence = t.fecha_expiracion
                                    ? t.fecha_expiracion.split('T')[0]
                                    : '—'
                                const usada = t.fecha_de_uso
                                    ? t.fecha_de_uso.split('T')[0]
                                    : null

                                console.log("estado tarjeta:", t.estado)

                                return (
                                    <div
                                        key={t.id_tarjeta}
                                        className={`gc-user-card${t?.status == "paid" ? ' gc-user-card--activa' : ' gc-user-card--usada'}`}
                                    >
                                        <span className={`gc-badge${t?.status == "paid" ? ' gc-badge--activa' : ' gc-badge--usada'}`}>
                                            {activa && t?.status == "paid" ? ' ✦ Activa' : ''}
                                            {t?.status == "unpaid" ? " No pagada" : ""}
                                            {!activa ? " ✓ Usada" : ""}
                                        </span>

                                        <div className="gc-card-amount">
                                            <sup>$</sup>
                                            {Number(t.monto).toLocaleString('es-CO')}
                                        </div>

                                        <div className="gc-card-meta">
                                            <p><strong>Vence:</strong> {vence}</p>
                                            {usada && (
                                                <p><strong>Usada el:</strong> {usada}</p>
                                            )}
                                            <p className="gc-card-id">#{t.id_tarjeta}</p>
                                        </div>

                                        {activa && (
                                            <div className="gc-card-actions">

                                                {t?.status == "unpaid" ? ( 
                                                    <button
                                                        className="gc-btn-cart"
                                                        disabled={t?.status != "paid" || t?.estado == "usada"}
                                                        onClick={() => handleDeleteCard(t?.id_tarjeta)}
                                                    >
                                                        Tarjeta no usable
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="gc-btn-cart"
                                                        disabled={t?.status != "paid" || t?.estado == "usada"}
                                                        onClick={() => handleAgregarAlCarrito(t)}
                                                    >
                                                        Agregar al carrito
                                                    </button>
                                                )}

                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* ── Guía de Regalos ──────────────────────────────────── */}
                <GiftGuideSection />

            </div>

            <div className={`gc-toast${toast.show ? ' gc-toast--show' : ''}${toast.type === 'error' ? ' gc-toast--error' : ''}`}>
                {toast.msg}
            </div>
        </>
    )
}

export default GiftCardPage