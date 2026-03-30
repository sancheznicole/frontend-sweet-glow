import { useEffect, useState } from "react"
import { latestInTendency, getDiscountProducts } from "../services/productsService"
import Loader from "./Loader"
import ProductCard from "./ProductCard"

const ProductsCarousel = ({tendency = false, discount = false}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const [index, setIndex] = useState(0)
    const [visibleCards, setVisibleCards] = useState(4)


    async function getProducts(){
        try {
            let res = undefined

            if(tendency) res = await latestInTendency()

            if(discount) res = await getDiscountProducts()

            if(!res?.valid){
                console.log(res?.error)
            }

            setData(res?.products)
        } catch (error) {
            
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        const updateVisible = () => {
            if (window.innerWidth < 600) setVisibleCards(2)
            else if (window.innerWidth < 1024) setVisibleCards(2)
            else setVisibleCards(4)
        }

        updateVisible()
        window.addEventListener("resize", updateVisible)
        return () => window.removeEventListener("resize", updateVisible)
    }, [])

    useEffect(() => {
        if (index > data.length - visibleCards) {
            setIndex(Math.max(0, data.length - visibleCards))
        }
    }, [visibleCards])

    useEffect(() => {
        getProducts()
    }, [])

    const next = () => {
        if (index < data.length - visibleCards) {
            setIndex(prev => prev + 1)
        }
    }

    const prev = () => {
        if (index > 0) {
            setIndex(prev => prev - 1)
        }
    }

    return (
        loading ? (
            <Loader text="Cargando productos..."></Loader>
        ) : (
            data && data.length > 0 ? (
                <div className="carousel-container">
                
                    {/* BOTON IZQUIERDA */}
                    {data.length > visibleCards && (
                        <button className="carousel-btn left" onClick={prev}>◀</button>
                    )}

                    {/* TRACK */}
                    <div className="carousel-wrapper">
                        <div className="carousel-track products-cards-container responsive-track">
                            {data.map((p, i) => (
                                <div className="carousel-item" key={i} style={{
                                    transform: `translateX(-${index * (100 / visibleCards)}%)`, 
                                    flexShrink: 0 
                                }}>
                                    <ProductCard
                                        id={p?.id_producto}
                                        imagen={p?.imagenes}
                                        categoria={p?.categoria?.nombre}
                                        marca={p?.marca?.nombre}
                                        precio={p?.precio}
                                        titulo={p?.nombre}
                                        stock={p?.stock}
                                        referencia={`${p?.referencia_producto?.color} | ${p?.referencia_producto?.tamano}`}
                                        product={p}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BOTON DERECHA */}
                    {data.length > visibleCards && (
                        <button className="carousel-btn right" onClick={next}>▶</button>
                    )}
                </div>
            ) : (
                <p>No hay productos para mostrar</p>
            )
        )
    )
}

export default ProductsCarousel