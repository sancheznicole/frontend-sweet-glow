import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { createReview, getAllCategorias, getAllMarcas, getAllProductosSinPaginar, buscarUsuarios } from '../../../../services/reviewsService'

const STEPS = ['Categoría', 'Marca', 'Producto', 'Usuario', 'Calificación']

const CreateReview = () => {

    const navigate = useNavigate()

    const [step, setStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loadingOptions, setLoadingOptions] = useState(false)
    const [error, setError] = useState('')

    const [categorias, setCategorias] = useState([])
    const [marcas, setMarcas] = useState([])
    const [productos, setProductos] = useState([])

    const [categoriaId, setCategoriaId] = useState('')
    const [marcaId, setMarcaId] = useState('')
    const [productoId, setProductoId] = useState('')
    const [productoNombre, setProductoNombre] = useState('')
    const [usuarioId, setUsuarioId] = useState('')
    const [usuarioNombre, setUsuarioNombre] = useState('')
    const [calificacion, setCalificacion] = useState(3)

    const [busqueda, setBusqueda] = useState('')
    const [resultadosUsuarios, setResultadosUsuarios] = useState([])
    const [buscando, setBuscando] = useState(false)

    // Paso 0: cargar categorías al montar
    useEffect(() => {
        const fetchCategorias = async () => {
            setLoadingOptions(true)
            try {
                const res = await getAllCategorias()
                if (res?.valid) setCategorias(res.categorias)
            } catch (e) {
                console.log(e.message)
            } finally {
                setLoadingOptions(false)
            }
        }
        fetchCategorias()
    }, [])

    // Paso 1: cargar marcas cuando se elige categoría
    useEffect(() => {
        if (!categoriaId) return
        const fetchMarcas = async () => {
            setLoadingOptions(true)
            try {
                const res = await getAllMarcas()
                if (res?.valid) setMarcas(res.marcas)
            } catch (e) {
                console.log(e.message)
            } finally {
                setLoadingOptions(false)
            }
        }
        fetchMarcas()
    }, [categoriaId])

    // Paso 2: cargar y filtrar productos por categoría + marca
    useEffect(() => {
        if (!marcaId) return
        const fetchProductos = async () => {
            setLoadingOptions(true)
            try {
                const res = await getAllProductosSinPaginar()
                if (res?.valid) {
                    const filtrados = res.productos.filter(p =>
                        String(p.id_categoria) === String(categoriaId) &&
                        String(p.id_marca) === String(marcaId)
                    )
                    setProductos(filtrados)
                }
            } catch (e) {
                console.log(e.message)
            } finally {
                setLoadingOptions(false)
            }
        }
        fetchProductos()
    }, [marcaId])

    // Paso 3: debounce búsqueda de usuarios
    useEffect(() => {
        if (!busqueda.trim()) {
            setResultadosUsuarios([])
            return
        }
        const timer = setTimeout(async () => {
            setBuscando(true)
            try {
                const res = await buscarUsuarios(busqueda)
                if (res?.valid) setResultadosUsuarios(res.usuarios)
            } catch (e) {
                console.log(e.message)
            } finally {
                setBuscando(false)
            }
        }, 400)
        return () => clearTimeout(timer)
    }, [busqueda])

    const handleSelectCategoria = (id) => {
        setCategoriaId(id)
        setMarcaId('')
        setProductoId('')
        setProductoNombre('')
        setUsuarioId('')
        setUsuarioNombre('')
        setStep(1)
    }

    const handleSelectMarca = (id) => {
        setMarcaId(id)
        setProductoId('')
        setProductoNombre('')
        setStep(2)
    }

    const handleSelectProducto = (id, nombre) => {
        setProductoId(id)
        setProductoNombre(nombre)
        setStep(3)
    }

    const handleSelectUsuario = (id, nombre) => {
        setUsuarioId(id)
        setUsuarioNombre(nombre)
        setBusqueda(nombre)
        setResultadosUsuarios([])
    }

    const handleSubmit = async () => {
        if (!productoId || !usuarioId) return
        try {
            setLoading(true)
            setError('')
            const res = await createReview(calificacion, productoId, usuarioId)
            if (!res?.valid) {
                setError('Error al crear la reseña')
                return
            }
            navigate('/admin/reviews')
        } catch (e) {
            setError('Error al enviar el formulario')
        } finally {
            setLoading(false)
        }
    }

    const goToStep = (s) => {
        if (s < step) setStep(s)
    }

    const categoriaSeleccionada = categorias.find(c => String(c.id_categoria) === String(categoriaId))
    const marcaSeleccionada = marcas.find(m => String(m.id_marca) === String(marcaId))
    const stars = [1, 2, 3, 4, 5]

    return (
        <div className="page-container">

            <div className="back-link-container">
                <Link className="link-regresar" to="/admin/reviews">Regresar</Link>
            </div>

            <section className="section-editar">

                <h1 className="titulo-por-h1">Crear reseña</h1>

                {/* Indicador de pasos */}
                <div className="stepper-indicador">
                    {STEPS.map((label, i) => (
                        <div
                            key={i}
                            className={`stepper-paso ${i === step ? 'activo' : ''} ${i < step ? 'completado' : ''}`}
                            onClick={() => goToStep(i)}
                            style={{ cursor: i < step ? 'pointer' : 'default' }}
                        >
                            <div className="stepper-circulo">
                                {i < step ? '✓' : i + 1}
                            </div>
                            <span className="stepper-label">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Resumen de selecciones anteriores */}
                {(categoriaId || marcaId || productoId || usuarioId) && (
                    <div className="stepper-resumen">
                        {categoriaSeleccionada && (
                            <span className="stepper-tag" onClick={() => goToStep(0)}>
                                📁 {categoriaSeleccionada.nombre}
                            </span>
                        )}
                        {marcaSeleccionada && (
                            <span className="stepper-tag" onClick={() => goToStep(1)}>
                                🏷️ {marcaSeleccionada.nombre}
                            </span>
                        )}
                        {productoNombre && (
                            <span className="stepper-tag" onClick={() => goToStep(2)}>
                                📦 {productoNombre}
                            </span>
                        )}
                        {usuarioNombre && (
                            <span className="stepper-tag" onClick={() => goToStep(3)}>
                                👤 {usuarioNombre}
                            </span>
                        )}
                    </div>
                )}

                <div className="stepper-contenido">

                    {/* PASO 0: Categoría */}
                    {step === 0 && (
                        <div className="stepper-panel">
                            <h2 className="stepper-titulo-paso">Selecciona una categoría</h2>
                            {loadingOptions ? (
                                <p className="stepper-cargando">Cargando categorías...</p>
                            ) : (
                                <div className="stepper-lista">
                                    {categorias.map(cat => (
                                        <button
                                            key={cat.id_categoria}
                                            className={`stepper-item ${String(categoriaId) === String(cat.id_categoria) ? 'seleccionado' : ''}`}
                                            onClick={() => handleSelectCategoria(cat.id_categoria)}
                                        >
                                            {cat.nombre}
                                        </button>
                                    ))}
                                    {categorias.length === 0 && (
                                        <p className="stepper-vacio">No hay categorías disponibles</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* PASO 1: Marca */}
                    {step === 1 && (
                        <div className="stepper-panel">
                            <h2 className="stepper-titulo-paso">Selecciona una marca</h2>
                            {loadingOptions ? (
                                <p className="stepper-cargando">Cargando marcas...</p>
                            ) : (
                                <div className="stepper-lista">
                                    {marcas.map(marca => (
                                        <button
                                            key={marca.id_marca}
                                            className={`stepper-item ${String(marcaId) === String(marca.id_marca) ? 'seleccionado' : ''}`}
                                            onClick={() => handleSelectMarca(marca.id_marca)}
                                        >
                                            {marca.nombre}
                                        </button>
                                    ))}
                                    {marcas.length === 0 && (
                                        <p className="stepper-vacio">No hay marcas disponibles</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* PASO 2: Producto */}
                    {step === 2 && (
                        <div className="stepper-panel">
                            <h2 className="stepper-titulo-paso">Selecciona un producto</h2>
                            {loadingOptions ? (
                                <p className="stepper-cargando">Cargando productos...</p>
                            ) : (
                                <div className="stepper-lista">
                                    {productos.map(prod => (
                                        <button
                                            key={prod.id_producto}
                                            className={`stepper-item ${String(productoId) === String(prod.id_producto) ? 'seleccionado' : ''}`}
                                            onClick={() => handleSelectProducto(prod.id_producto, prod.nombre)}
                                        >
                                            {prod.nombre}
                                        </button>
                                    ))}
                                    {productos.length === 0 && (
                                        <p className="stepper-vacio">
                                            No hay productos para esta combinación.{' '}
                                            <span
                                                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                                onClick={() => setStep(0)}
                                            >
                                                Cambiar filtros
                                            </span>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* PASO 3: Búsqueda de usuario */}
                    {step === 3 && (
                        <div className="stepper-panel">
                            <h2 className="stepper-titulo-paso">Busca el usuario</h2>
                            <div className="stepper-buscador">
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
                                    autoFocus
                                />
                                {buscando && <p className="stepper-cargando">Buscando...</p>}
                            </div>

                            {resultadosUsuarios.length > 0 && (
                                <div className="stepper-lista">
                                    {resultadosUsuarios.map(u => (
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

                            {busqueda && !buscando && resultadosUsuarios.length === 0 && !usuarioId && (
                                <p className="stepper-vacio">No se encontraron usuarios con "{busqueda}"</p>
                            )}

                            {usuarioId && (
                                <div className="stepper-seleccion-confirmada">
                                    ✓ Seleccionado: <strong>{usuarioNombre}</strong>
                                    <button
                                        className="modificar-profile"
                                        style={{ marginLeft: '12px' }}
                                        onClick={() => setStep(4)}
                                    >
                                        Continuar →
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* PASO 4: Slider de calificación */}
                    {step === 4 && (
                        <div className="stepper-panel">
                            <h2 className="stepper-titulo-paso">Calificación</h2>

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

                                <p className="calificacion-texto">
                                    {calificacion === 1 && '😞 Muy malo'}
                                    {calificacion === 2 && '😕 Malo'}
                                    {calificacion === 3 && '😐 Regular'}
                                    {calificacion === 4 && '😊 Bueno'}
                                    {calificacion === 5 && '🤩 Excelente'}
                                </p>
                            </div>

                            {error && <p className="error-message">{error}</p>}

                            <button
                                className="modificar-profile"
                                onClick={handleSubmit}
                                disabled={loading}
                                style={{ marginTop: '24px', width: '100%' }}
                            >
                                {loading ? 'Creando...' : 'Crear reseña'}
                            </button>
                        </div>
                    )}

                </div>
            </section>
        </div>
    )
}

export default CreateReview
