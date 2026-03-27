import { useEffect, useState } from "react"
import { latestInTendency, getDiscountProducts } from "../services/productsService"
import Loader from "./Loader"
import ProductCard from "./ProductCard"

const ProductsCarousel = ({tendency = false, discount = false}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const [index, setIndex] = useState(0)
    const visibleCards = 4


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
            <div className="carousel-container">
            
                {/* BOTON IZQUIERDA */}
                {data.length > visibleCards && (
                    <button className="carousel-btn left" onClick={prev}>◀</button>
                )}

                {/* TRACK */}
                <div className="carousel-wrapper">
                    <div 
                        className="carousel-track products-cards-container"
                        style={{
                            transform: `translateX(-${index * (100 / visibleCards)}%)`
                        }}
                    >
                        {data.map((p, i) => (
                            <div className="carousel-item" key={i}>
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
        )
    )
}

export default ProductsCarousel