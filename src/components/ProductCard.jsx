import { Link } from "react-router-dom"
import { createImageURL } from "../services/imagesService"
import { parsePrice } from "../helpers/json.helpers"
import { useState, useEffect } from "react"
import { addToCart } from "../services/cartService"
import { useNavigate } from "react-router-dom"
import { removeFromWishList } from "../services/wishlist"

const ProductCard = ({titulo, imagen, precio, stock, referencia, marca, categoria, id, product, showDeletion}) => {
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(quantity*precio)

    useEffect(() => {
        setTotal(quantity*precio)
    }, [quantity])

    const handleRemoveFromWishList = () => {
        removeFromWishList(id)
    }

    return (
        <div className='proyect-card'>
            <div className="images-container">
                <Link to={`/products/details/${id}`}>
                    <img src={createImageURL(imagen[0]?.filename)} alt={`${titulo} portada`} />
                </Link>
            </div>
            <div className="main-content">
                <h2>
                    {showDeletion && (
                        <button className="delete-from-whislist-button" title="Eliminar de la lista de deseos" onClick={() => {handleRemoveFromWishList()}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                        </button>
                    )}

                    {titulo}
                </h2>
                <div>
                    <p>{parsePrice(precio)}</p>
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
                <div>
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
                <div>
                    <button onClick={() => {addToCart(product, quantity); navigate("/cart")}}>
                        <span>Agregar al carrito</span> 
                        <span>{parsePrice(total)}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard