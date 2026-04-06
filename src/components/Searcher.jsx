import { useState, useEffect } from "react"
import ProductsCards from "../components/ProductsCards"
import { searcherForProductsAndFilters, latestInTendency } from "../services/productsService"

const Searcher = ({ setShowSearch, showSearch }) => {
    const [showInTendencyInitialData, setShhowInTendencyInitialData] = useState(true)
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [descuento, setDescuento] = useState(0)
    const [tendencia, setTendencia] = useState(0)
    const [regalo, setRegalo] = useState(0)
    const [premio, setPremio] = useState(0)
    const [limit, setLimit] = useState(20)

    async function getInitialData() {
        let res = await latestInTendency()

        if(!res?.valid){
            return
        }

        setProducts(res?.products)
    }

    useEffect(() => {
        if(search.trim() == "")getInitialData()
    }, [search])
    
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search.trim() !== "") {
                setShhowInTendencyInitialData(false)
                fetchProducts()
            } else {
                setShhowInTendencyInitialData(true)
                getInitialData()
            }
        }, 500)

        return () => clearTimeout(delayDebounce)
    }, [search, descuento, tendencia, regalo, premio])

    const fetchProducts = async () => {
        setLoading(true)

        const res = await searcherForProductsAndFilters(
            descuento,
            tendencia,
            regalo,
            premio,
            search,
            limit
        )

        if (res.valid) {
            setProducts(res.products.data || [])
        }

        setLoading(false)
    }

    console.log(products)

    return (
        <div className="searcher-container">
            
            {/* Barra principal */}
            <div className="main-bar-container">
                <div className="input-searcher-container">
                    <input 
                        type="text" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar productos..."
                    />

                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                </div>

                <button className="close-search-btn" onClick={() => {setShowSearch(!showSearch)}} title="Salir">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="40" viewBox="0 0 24 24" fill="none" stroke="#010101" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </button>
            </div>

            {/* Resultados */}
            <div className="results-container">

                {/* Filtros laterales */}
                <div className="categories-container">
                    <h3>Filtros</h3>

                    <label>
                        <input 
                            type="checkbox"
                            checked={descuento === 1}
                            onChange={() => setDescuento(descuento === 1 ? 0 : 1)}
                        />
                        Descuento
                    </label>

                    <label>
                        <input 
                            type="checkbox"
                            checked={tendencia === 1}
                            onChange={() => setTendencia(tendencia === 1 ? 0 : 1)}
                        />
                        Tendencia
                    </label>

                    <label>
                        <input 
                            type="checkbox"
                            checked={regalo === 1}
                            onChange={() => setRegalo(regalo === 1 ? 0 : 1)}
                        />
                        Regalo
                    </label>

                    <label>
                        <input 
                            type="checkbox"
                            checked={premio === 1}
                            onChange={() => setPremio(premio === 1 ? 0 : 1)}
                        />
                        Premio
                    </label>
                </div>

                {/* Productos */}
                <div className="products-search-results">
                    {showInTendencyInitialData && <p className="titulo-search">Productos en tendencia</p>}
                    {loading && <p className="title">Cargando...</p>}

                    {!loading && products.length === 0 && search && (
                        <p className="title">No se encontraron productos</p>
                    )}

                    {!loading && (
                        <div className="cards-searcher-container">
                            <ProductsCards data={products} showDeletion={false} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Searcher