import { Link } from "react-router-dom"
import { createImageURL } from "../services/imagesService"
import { parsePrice } from "../helpers/json.helpers"
import { useState, useEffect } from "react"
import { addToCart } from "../services/cartService"
import { removeFromWishList } from "../services/wishlist"

const ProductCard = ({titulo, imagen, precio, stock, referencia, marca, categoria, id, product, showDeletion}) => {
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(quantity*precio)

    // PROMEDIO DE RESEÑAS
    const reviewAverage = product?.reviews?.length
        ? product.reviews.reduce((acc, r) => acc + r.resena, 0) / product.reviews.length
        : 0

    const reviewsCount = product?.reviews?.length || 0

    useEffect(() => {
        setTotal(quantity*precio)
    }, [quantity])

    const handleRemoveFromWishList = () => {
        removeFromWishList(id)
    }

    return (
        <div className='proyect-card'>
            <div className="images-container">

                {showDeletion && (
                    <button className="delete-from-whislist-button" title="Eliminar de la lista de deseos" onClick={() => {handleRemoveFromWishList()}}>
                        x
                    </button>
                )}

                <Link to={`/products/details/${id}`}>
                    <img src={createImageURL(imagen[0]?.filename)} alt={`${titulo} portada`} />
                </Link>
            </div>

            <div className="main-content">
                
                {/* ESTRELLAS */}
                <div className="product-rating">
                    {Array.from({ length: 5 }, (_, i) => {
                        if (reviewAverage >= i + 1) {
                            return <span key={i} className="star active">★</span>
                        } else if (reviewAverage >= i + 0.5) {
                            return <span key={i} className="star half">★</span>
                        } else {
                            return <span key={i} className="star">☆</span>
                        }
                    })}
                    <span className="reviews-count">({reviewsCount})</span>
                </div>

                <div className="title-price">
                    <p>
                    {titulo}
                    </p>
                    
                    <div>
                        <p>{parsePrice(precio)}</p>
                    </div>
                </div>
            </div>

            <div className="hidden-content">
                <p>{referencia}</p>

                <div>
                    <p>{marca}</p>
                    <p>{categoria}</p>
                </div>
            </div>

            {/* cart elements */}
            <div className="second-hidden-content">
                <div className="mas-menos">
                    <button onClick={() => {if(quantity > 1) setQuantity(quantity-1)}}>
                        -
                    </button>
                    <button>
                        {quantity}
                    </button>
                    <button onClick={() => {setQuantity(quantity+1)}}>
                        +
                    </button>
                </div>
                <div className="agregar-carrito">
                    <button onClick={() => {addToCart(product, quantity);}}>
                        <span>agregar al carrito - {parsePrice(total)}</span> 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard