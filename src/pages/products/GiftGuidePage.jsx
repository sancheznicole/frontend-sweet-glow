import { useState, useEffect } from 'react'
import { getUserData } from "../../services/authService";
import { getAllGiftCards } from "../../services/giftCardService";
import axios from 'axios'
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const API_URL = import.meta.env.VITE_API_URL

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

    // ── Cargar usuario ────────────────────────────────────────────────────────
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

    // ── Cargar tarjetas del usuario ───────────────────────────────────────────
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

    console.log(usuario)

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

            await axios.post(
                `${API_URL}/gift_cards`,
                {
                    monto: montoFinal,
                    fecha_expiracion: fechaExpStr,
                    id_usuario: idUsuario,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )

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

    // ── Agregar tarjeta al carrito ────────────────────────────────────────────
    // TODO (compañera): reemplaza el console.log con tu función del carrito.
    // La tarjeta `t` contiene: id_tarjeta, monto, estado, fecha_expiracion, id_usuario
    const handleAgregarAlCarrito = (tarjeta) => {
        console.log('Agregar al carrito — tarjeta:', tarjeta)
        // agregarAlCarrito({
        //     tipo: 'gift_card',
        //     id_tarjeta: tarjeta.id_tarjeta,
        //     monto: tarjeta.monto,
        //     id_usuario: usuario?.id_usuario ?? usuario?.id,
        // })
        show('Función pendiente de conectar con el carrito', 'success')
    }

    // ── Determinar si una tarjeta está activa ─────────────────────────────────
    // Cubre los valores más comunes que puede devolver el backend
        const tarjetaEsActiva = (t) => {
            const s = String(t.estado ?? '').toLowerCase().trim()
            return s === 'activa'
        }

    return (
        <>
            <div className="gc-page page-container">

                {/* ── Hero: dos columnas ────────────────────────────────── */}
                <div className="gc-hero">

                    {/* Columna izquierda — tarjeta visual */}
                    <div className="gc-hero-visual-col">
                        <div className="gc-card-visual">
                            <div className="gc-card-visual-brand">
                                Sweet Glow
                                <span>xoxo · tarjeta regalo</span>
                            </div>
                            <div className="gc-card-visual-bottom">
                                <span className="gc-card-visual-label">e-gift card</span>
                                <span className="gc-card-visual-amount">
                                    {montoFinal ? formatCOP(montoFinal) : '✦'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha — formulario */}
                    <div className="gc-hero-form-col">
                        <span className="gc-eyebrow">Sweet Glow · Tarjeta Regalo</span>
                        <h1 className="gc-hero-title">
                            El regalo perfecto<br />
                            <em>siempre existe</em>
                        </h1>
                        <p className="gc-hero-sub">
                            Regala libertad para elegir. Nuestra tarjeta regalo se asigna
                            al instante y se puede usar en toda la tienda.
                        </p>

                        {/* Montos sugeridos */}
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

                        {/* Monto custom */}
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

                                    setMontoCustom(value)
                                    setMontoSeleccionado(null)
                                }}
                            />
                        </div>

                        {/* Resumen */}
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

                {/* ── Mis tarjetas ──────────────────────────────────────── */}
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
                            <span className="gc-empty-icon">✦</span>
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

                                return (
                                    <div
                                        key={t.id_tarjeta}
                                        className={`gc-user-card${activa ? ' gc-user-card--activa' : ' gc-user-card--usada'}`}
                                    >
                                        <span className={`gc-badge${activa ? ' gc-badge--activa' : ' gc-badge--usada'}`}>
                                            {activa ? '✦ Activa' : '✓ Usada'}
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
                                                {/*
                                                    TODO (compañera): reemplaza handleAgregarAlCarrito
                                                    con tu función del servicio de carrito.
                                                    La tarjeta `t` contiene:
                                                      - t.id_tarjeta
                                                      - t.monto
                                                      - t.estado
                                                      - t.fecha_expiracion
                                                      - t.id_usuario
                                                */}
                                                <button
                                                    className="gc-btn-cart"
                                                    onClick={() => handleAgregarAlCarrito(t)}
                                                >
                                                    Agregar al carrito
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Toast ────────────────────────────────────────────────── */}
            <div className={`gc-toast${toast.show ? ' gc-toast--show' : ''}${toast.type === 'error' ? ' gc-toast--error' : ''}`}>
                {toast.msg}
            </div>
        </>
    )
}

export default GiftCardPage
