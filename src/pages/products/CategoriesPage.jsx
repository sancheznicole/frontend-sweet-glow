import { useState, useEffect } from 'react'
import { getAllCategories } from '../../services/categoriesService'
import CategoryProducts from './CategoryProducts'
import Loader from '../../components/Loader'

const CATEGORY_ASSETS = {
    1:  { imagen: '/assets/maquillaje.jpeg',    video: '/assets/maquillaje.mp4' },
    2:  { imagen: '/assets/haircare.jpeg',   video: '/assets/haircare.mp4' },
    3: { imagen: '/assets/skincare.jpeg', video: '/assets/skincare.mp4' },
    4: { imagen: '/assets/perfume.jpeg',   video: '/assets/perfume.mp4' },
}

const CategoryCard = ({ categoria, onSelect }) => {
    const [hovered, setHovered] = useState(false)
    const assets = CATEGORY_ASSETS[categoria.id_categoria] ?? {}

    return (
        <div
            className="category-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onSelect(categoria)}
        >
            {hovered && assets.video ? (
                <video
                    src={assets.video}
                    autoPlay
                    muted
                    loop
                    className="category-card-media"
                />
            ) : (
                <img
                    src={assets.imagen}
                    alt={categoria.nombre}
                    className="category-card-media"
                />
            )}
            <div className="category-card-overlay">
                <h2 className="category-card-nombre">{categoria.nombre}</h2>
            </div>
        </div>
    )
}

const CategoriesPage = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)

    useEffect(() => {
        getAllCategories(1, 4).then(res => {
            if (res?.valid) setCategories(res.categories)
        }).finally(() => setLoading(false))
    }, [])

    if (categoriaSeleccionada) {
        return (
            <CategoryProducts
                categoria={categoriaSeleccionada}
                onVolver={() => setCategoriaSeleccionada(null)}
            />
        )
    }

    return (
        <div className="categories-page">
            <h1 className="categories-titulo">Compra por Categorías</h1>
            {loading ? (
                <Loader text=''></Loader>
            ) : (
                <div className="categories-grid">
                    {categories.map(cat => (
                        <CategoryCard
                            key={cat.id_categoria}
                            categoria={cat}
                            onSelect={setCategoriaSeleccionada}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default CategoriesPage