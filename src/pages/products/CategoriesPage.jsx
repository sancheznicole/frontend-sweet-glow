import { useState, useEffect } from 'react' 
import { getAllCategories } from '../../services/categoriesService'
import { sarchByBrandAndCategory, latestInTendency } from "../../services/productsService"
import ProductsCards from '../../components/ProductsCards'
import { getAllBrands } from '../../services/brands'
import Loader from '../../components/Loader'

const CategoriesPage = () => {
    const [categories, setCategories] = useState([])
    const [marcas, setMarcas] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedBrands, setSelectedBrands] = useState([])

    const [showInTendencyInitialData, setShowInTendencyInitialData] = useState(true)
    const [limit, setLimit] = useState(20)

    // Carga inicial
    useEffect(() => {
        const init = async () => {
            setLoading(true)

            const [catRes, brandRes, tendencyRes] = await Promise.all([
                getAllCategories(1, 20),
                getAllBrands(1, 20),
                latestInTendency(1, limit)
            ])

            if (catRes?.valid) setCategories(catRes.categories)
            if (brandRes?.valid) setMarcas(brandRes.brands)
            if (tendencyRes?.valid) setProducts(tendencyRes.products || [])

            setLoading(false)
        }

        init()
    }, [])

    // Manejar selección categorías
    const handleCategoryChange = (id) => {
        setSelectedCategories(prev =>
            prev.includes(id)
                ? prev.filter(c => c !== id)
                : [...prev, id]
        )
    }

    // Manejar selección marcas
    const handleBrandChange = (id) => {
        setSelectedBrands(prev =>
            prev.includes(id)
                ? prev.filter(m => m !== id)
                : [...prev, id]
        )
    }

    // Aplicar filtros
    const applyFilters = async () => {
        setLoading(true)
        setShowInTendencyInitialData(false)

        const res = await sarchByBrandAndCategory(selectedBrands, selectedCategories, limit)

        if (res?.valid) {
            setProducts(res.products || [])
        } else {
            setProducts([])
        }

        setLoading(false)
    }

    const clearFilters = async () => {
        setLoading(true)
        
        setSelectedCategories([])
        setSelectedBrands([])

        const res = await latestInTendency(1, limit)

        if (res?.valid) {
            setProducts(res.products || [])
            setShowInTendencyInitialData(true)
        } else {
            setProducts([])
        }

        setLoading(false)
    }

    return (
        <div className="categories-page">
            <h1 className="categories-titulo">Compra por Categorías</h1>

            {loading ? (
                <Loader text='' />
            ) : (
                <div className="searcher-container searcher-categorie-container">
                    <div className="results-container">

                        {/* FILTROS */}
                        <div className="categories-container">
                            <h3>Categorías</h3>

                            {categories.length > 0 ? (
                                categories.map((c) => (
                                    <label key={c.id_categoria}>
                                        <input 
                                            type="checkbox"
                                            checked={selectedCategories.includes(c.id_categoria)}
                                            onChange={() => handleCategoryChange(c.id_categoria)}
                                        />
                                        {c?.nombre}
                                    </label>
                                ))
                            ) : <p>Sin categorías</p>}

                            <h3>Marcas</h3>

                            {marcas.length > 0 ? (
                                marcas.map((m) => (
                                    <label key={m.id_marca}>
                                        <input 
                                            type="checkbox"
                                            checked={selectedBrands.includes(m.id_marca)}
                                            onChange={() => handleBrandChange(m.id_marca)}
                                        />
                                        {m?.nombre}
                                    </label>
                                ))
                            ) : <p>Sin marcas</p>}

                            {/* BOTÓN APLICAR */}
                            <button 
                                className="btn-aplicar-filtros"
                                onClick={applyFilters}
                            >
                                Aplicar filtros
                            </button>
                            {(selectedCategories.length > 0 || selectedBrands.length > 0 && !showInTendencyInitialData) && (
                                <button 
                                    className="btn-aplicar-filtros btn-limpiar-filtros"
                                    onClick={clearFilters}
                                >
                                    Limpiar filtros
                                </button>
                            )}
                        </div>

                        {/* PRODUCTOS */}
                        <div className="products-search-results">
                            {showInTendencyInitialData && (
                                <p className="initial-title">Productos en tendencia</p>
                            )}

                            {loading && <p className="title">Cargando...</p>}

                            {!loading && products.length === 0 && (
                                <p className="title">No se encontraron productos</p>
                            )}

                            {!loading && products.length > 0 && (
                                <div className="cards-searcher-container">
                                    <ProductsCards data={products} showDeletion={false} />
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default CategoriesPage