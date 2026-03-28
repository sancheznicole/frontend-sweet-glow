import { Link } from "react-router-dom"
import { createImageURL } from "../services/imagesService"
import { parsePrice } from "../helpers/json.helpers"
import { useState, useEffect } from "react"
import { addToCart } from "../services/cartService"
import { useNavigate } from "react-router-dom"

const ProductCard = ({titulo, imagen, precio, stock, referencia, marca, categoria, id, product}) => {
    const navigate = useNavigate()
    const [quantity, setQuantity] = useState(1)
    const [total, setTotal] = useState(quantity*precio)

    useEffect(() => {
        setTotal(quantity*precio)
    }, [quantity])

    return (
        <div className='proyect-card'>
            <div className="images-container">
                <Link to={`/products/details/${id}`}>
                    <img src={createImageURL(imagen[0]?.filename)} alt={`${titulo} portada`} />
                </Link>
            </div>
            <div className="main-content">
                <h2>{titulo}</h2>
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
                        añadir al carrito {parsePrice(total)}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard