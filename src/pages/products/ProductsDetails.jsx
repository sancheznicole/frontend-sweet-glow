import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProduct, getAllProducts } from "../../services/productsService"
import Loader from "../../components/Loader"
import { getCategory } from "../../services/categoriesService"
import { getBrand } from "../../services/brands"
import { searchReviewsByProductId } from "../../services/reviewsService"
import ProductsCards from "../../components/ProductsCards"
import { addToCart } from "../../services/cartService"

const ProductsDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState({})
    const [brand, setBrand] = useState({})
    const [reviews, setReviews] = useState({})

    const [products, setProducts] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [cartError, setCartError] = useState('')

    const getData = async () => {
        try {
            let res = await getProduct(id)

            if(!res?.valid){
                console.log(res?.error)
            }

            let allRes = await getAllProducts() 

            if(!allRes?.valid){
                console.log(res?.error)
            }

            setProducts(allRes?.products?.data)
            setProduct(res?.product)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getBrandAndCategory = async () => {
        try {
            const catRes = await getCategory(product?.id_categoria)

            if(!catRes?.valid){
                console.log(catRes?.error)
            }

            const brandRes = await getBrand(product?.id_marca)

            if(!brandRes?.valid){
                console.log(brandRes?.error)
            }

            const rewRes = await searchReviewsByProductId(id)

            if(!rewRes?.valid){
                console.log(rewRes?.error)
            }

            setBrand(brandRes?.brand)
            setCategory(catRes?.category)
            setReviews(rewRes?.data)
        } catch (error) {
            console.log(error?.message)
        } finally {
            setLoading(false)
        }
    }

    const handleAddToCart = async () => {
        const res = await addToCart(product, quantity)

        if(!res?.valid){
            setCartError(res?.error)
        }

        navigate("/cart")
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if(product){
            getBrandAndCategory()
        }
    }, [product])

    return (
        <div>
            {loading ? (
                <Loader text="Regalanos unos instantes mientras cargamos la informacion del producto" />
            ) : (
                <>
                    {/* productos */}
                    <div className="product-details">
                        <div>
                            <img src="" alt={`${product?.nombre} imagen sweet glow`} />
                        </div>
                        <div className="details">
                            <h1>{product?.nombre}</h1>
                            {product?.stock == 0 ? (
                                <p>Agotado</p>
                            ) : (
                                <p>{product?.stock} unidad{product?.stock > 1 && 'es'}</p>
                            )}
                            <p>{brand?.nombre} - {category?.nombre}</p>

                            <p>Reseñas ({reviews.length})</p>

                            <div className="add-to-cart">
                                <div className="quantity-buttons">
                                    <button onClick={() => {if(quantity > 1) setQuantity(quantity-1)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#996c74" className="icon icon-tabler icons-tabler-filled icon-tabler-crop-16-9"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 7a3 3 0 0 1 3 3v4a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-4a3 3 0 0 1 3 -3z" /></svg>
                                    </button>
                                    <p>
                                        {quantity}
                                    </p>
                                    <button onClick={() => {setQuantity(quantity+1)}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#996c74" className="icon icon-tabler icons-tabler-filled icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 0 1 0 2h-6v6a1 1 0 0 1 -2 0v-6h-6a1 1 0 0 1 0 -2h6v-6a1 1 0 0 1 1 -1" /></svg>
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => {handleAddToCart()}}>
                                        Añadir al carrito ${quantity*product?.precio} COP
                                    </button>
                                </div>
                            </div>

                            <h2>Descripcion</h2>
                            <p>{product?.descripcion}</p>
                        </div>
                    </div>
                    
                    {/* reseñas */}
                    <div className="details-reviews-container">
                        {reviews.map((r, index) => {
                            return (
                                <div key={index}>
                                    <h2>{r?.usuario?.nombres} {r?.usuario?.apellidos}</h2>
                                    <p>{`${'★'.repeat(r.resena)}${'☆'.repeat(5 - r.resena)} (${r.resena}/5)`}</p>
                                    <h3>{r?.created_at.split("T")[0]}</h3>
                                </div>
                            )
                        })}
                    </div>

                    {/* productos  */}
                    <div className="more-products-container">
                        <h2 className="">Mas de nustros productos</h2>
                        <ProductsCards 
                            products={products}
                        ></ProductsCards>
                    </div>
                </>
            )}
        </div>
    )
}

export default ProductsDetails