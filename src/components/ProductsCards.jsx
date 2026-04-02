import { getAllProducts } from '../services/productsService'
import ProductCard from './ProductCard'
import { useState, useEffect } from 'react'
import Loader from './Loader'
import { Link } from 'react-router-dom'

const ProductsCards = ({ elementsLimit = 6, data = undefined, showDeletion = false }) => {
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
        if (data) {
            setProducts(data)
            setLoading(false)
        } else {
            getContent()
        }
    }, [data])

    useEffect(() => {
        if(!data) getContent()
    }, [page])

    const handleGetMore = () => {
        setPage(prev => prev + 1)
        setAttemps(prev => prev + 1)
    }
    
    return (
        <>
            {loading ? (
                <Loader text={"Estamos cargando los productos"}></Loader>
            ) : (
                <>
                    {success ? (
                        products && products.length > 0 ? (
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
                                                showDeletion={showDeletion}
                                                referencia={`${p?.referencia_producto?.color} | ${p?.referencia_producto?.tamano}`}
                                                product={p}
                                            ></ProductCard>
                                        )
                                    })}
                                </div>

                                {!data && lastPage > page && attemps < maxAttemps && (
                                    <button onClick={() => {handleGetMore()}}>
                                        Cargar mas...
                                    </button>
                                )}

                                {!data && attemps >= maxAttemps && (
                                    <div>
                                        <p>Te invitamos a ver nuestra lista completa de productos</p>

                                        <Link to={"/"}>
                                            Ver mas productos
                                        </Link>
                                    </div>

                                )}
                            </div>
                        ) : (
                            <p>Sin productos para mostrar</p>
                        )
                    ) : (
                        <p>Ocurrió un error al cargar los productos</p>
                    )} 
                </>
            )}
        </>
    )
}

export default ProductsCards