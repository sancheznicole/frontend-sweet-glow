import { useState, useEffect } from 'react'
import { getProductosByCategoria, getMarcasByCategoria } from '../../services/categoriesService'
import ProductsCards from '../../components/ProductsCards'
import Loader from '../../components/Loader'

const API_URL = import.meta.env.VITE_API_URL
const SOTAGE_URL = import.meta.env.VITE_STORAGE_URL

const CATEGORY_BANNERS = {
    1:  '/assets/kylie.jpeg',
    2:  '/assets/banner.jpeg',
    3: '/assets/cuidadoPiel.jpeg',
    4: '/assets/cosmic.jpeg',
}

const CategoryProducts = ({ categoria, onVolver }) => {

    const [productos, setProductos] = useState([])
    const [marcas, setMarcas] = useState([])
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('')
    const [orden, setOrden] = useState('nombre_asc')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMarcasByCategoria(categoria.id_categoria).then(res => {
            if (res?.valid) setMarcas(res.marcas)
        })
    }, [categoria.id_categoria])

    useEffect(() => {
        setLoading(true)
        getProductosByCategoria(categoria.id_categoria, marcaSeleccionada || null, orden)
            .then(res => {
                if (res?.valid) setProductos(res.productos)
            })
            .finally(() => setLoading(false))
    }, [categoria.id_categoria, marcaSeleccionada, orden])

    const getImagenUrl = (producto) => {
        const filename = producto.imagenes?.[0]?.filename
        if (!filename) return null
        return `${SOTAGE_URL}/${filename}`
    }

    const getColor = (producto) => {
        return producto.referencia_producto?.color ?? null
    }

    const bannerImg = CATEGORY_BANNERS[categoria.id_categoria] ?? null

    return (
        <div className="category-products-page">

            {/* Banner */}
            <div
                className="category-banner"
                style={{ backgroundImage: bannerImg ? `url(${bannerImg})` : 'none' }}
            >
                <div className="category-banner-overlay">
                    <button className="category-banner-volver" onClick={onVolver}>← Volver</button>
                    <h1 className="category-banner-titulo">{categoria.nombre}</h1>
                </div>
            </div>

            {/* Filtros */}
            <div className="category-filtros">
                <div className="filtro-grupo">
                    <label className="campo-label">Marca</label>
                    <select
                        className="input-busqueda"
                        value={marcaSeleccionada}
                        onChange={e => setMarcaSeleccionada(e.target.value)}
                    >
                        <option value="">Todas las marcas</option>
                        {marcas.map(m => (
                            <option key={m.id_marca} value={m.id_marca}>
                                {m.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filtro-grupo">
                    <label className="campo-label">Ordenar por</label>
                    <select
                        className="input-busqueda"
                        value={orden}
                        onChange={e => setOrden(e.target.value)}
                    >
                        <option value="nombre_asc">Nombre A→Z</option>
                        <option value="nombre_desc">Nombre Z→A</option>
                        <option value="precio_asc">Precio menor a mayor</option>
                        <option value="precio_desc">Precio mayor a menor</option>
                        <option value="fecha_desc">Más recientes</option>
                        <option value="fecha_asc">Más antiguos</option>
                    </select>
                </div>
            </div>

            {/* Productos */}
            {loading ? (
                <Loader text="Cargando productos..."></Loader>
            ) : productos.length === 0 ? (
                <p className="stepper-vacio">No hay productos disponibles en esta categoría aún.</p>
            ) : (
                <ProductsCards data={productos}></ProductsCards>
            )}
        </div>
    )
}

export default CategoryProducts