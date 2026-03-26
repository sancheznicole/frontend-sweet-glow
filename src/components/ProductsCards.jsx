import { getAllProducts } from '../services/productsService'
import ProductCard from './ProductCard'
import { useState, useEffect } from 'react'
import Loader from './Loader'
import { Link } from 'react-router-dom'

const ProductsCards = ({ elementsLimit = 6 }) => {
    const [products, setProducts] = useState([])
    const [success, setSuccess] = useState(true)
    const [loading, setLoading] = useState(true)
    const limit = elementsLimit
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const maxAttemps = 3
    const [attemps, setAttemps] = useState(0)

    async function getContent() {
        try {
            let res = await getAllProducts(page, limit)

            if(!res.valid){
                setSuccess(false)
                console.log(res?.error)
                return 
            }

            setProducts(prev => {
                const newProducts = res?.products?.data || []

                const unique = newProducts.filter(
                    np => !prev.some(p => p.id_producto === np.id_producto)
                )

                return [...prev, ...unique]
            })
            setLastPage(res?.products?.last_page)
        } catch (error) {
            setSuccess(false)
            console.log(error?.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getContent()
    }, [])

    useEffect(() => {
        getContent()
    }, [page])

    const handleGetMore = () => {
        setPage(prev => prev + 1)
        setAttemps(prev => prev + 1)
    }
    
    return (
        <>
            {loading ? (
                <Loader key={"Estamos cargando los productos"}></Loader>
            ) : (
                <>
                    {success ? (
                        <div>
                            <div className='products-cards-container'>
                                {products?.map((p, index) => {
                                    return (
                                        <ProductCard 
                                            key={index}
                                            id={p?.id_producto}
                                            imagen={p?.imagenes}
                                            categoria={p?.categoria?.nombre}
                                            marca={p?.marca?.nombre}
                                            precio={p?.precio}
                                            titulo={p?.nombre}
                                            stock={p?.stock}
                                            referencia={`${p?.referencia_producto?.color} | ${p?.referencia_producto?.tamano}`}
                                            product={p}
                                        ></ProductCard>
                                    )
                                })}
                            </div>

                            {lastPage > page && attemps < maxAttemps && (
                                <button onClick={() => {handleGetMore()}}>
                                    Cargar mas...
                                </button>
                            )}

                            {attemps >= maxAttemps && (
                                <div>
                                    <p>Te invitamos a ver nuestra lista completa de productos</p>

                                    <Link to={"/"}>
                                        Ver mas productos
                                    </Link>
                                </div>

                            )}
                        </div>
                    ) : (
                        <p>Ocurrió un error al cargar los procutos </p>
                    )} 
                </>
            )}
        </>
    )
}

export default ProductsCards