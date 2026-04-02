import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getProduct } from "../../services/productsService"
import Loader from "../../components/Loader"
import { getCategory } from "../../services/categoriesService"
import { getBrand } from "../../services/brands"
import { createReview, searchReviewsByProductId } from "../../services/reviewsService"
import ProductsCards from "../../components/ProductsCards"
import { addToCart } from "../../services/cartService"
import { createImageURL } from "../../services/imagesService"
import { parsePrice } from "../../helpers/json.helpers"
import { addToWishList } from "../../services/wishlist"
import { useAuth } from "../../contexts/AuthContext"

const ProductsDetails = () => {
    const { isAuthenticated, user } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState({})
    const [category, setCategory] = useState({})
    const [brand, setBrand] = useState({})
    const [reviews, setReviews] = useState({})

    const [quantity, setQuantity] = useState(1)
    const [cartError, setCartError] = useState('')
    const [currentImage, setCurrentImage] = useState(0)
    const [addReview, setAddReview] = useState(false)
    
    const [calificacion, setCalificacion] = useState(3)
    const stars = [1, 2, 3, 4, 5]
    const [loadingNewReview, setLoadingNewReview] = useState(false)
    const [reviewError, setReviewError] = useState("")
    const [reviewAverage, setReviewAverage] = useState(0)

    const getData = async () => {
        try {
            setLoading(true)
            let res = await getProduct(id)

            if(!res?.valid){
                console.log(res?.error)
            }

            setProduct(res?.product)
        } catch (error) {
            console.log(error.message)
        }
    }

    const nextImage = () => {
        setCurrentImage(prev =>
            (prev + 1) % product.imagenes.length
        )
    }

    const prevImage = () => {
        setCurrentImage(prev =>
            prev === 0 ? product.imagenes.length - 1 : prev - 1
        )
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
    }

    const handleAddToWishList = async () => {
        const res = await addToWishList(product)

        if(!res?.valid){
            setCartError(res?.error)
        }

        navigate("/wishlist")
    }

    console.log(reviewAverage)

    useEffect(() => {
        const promedio = reviews.length
        ? reviews.reduce((acc, item) => acc + item.resena, 0) / reviews.length
        : 0;

        setReviewAverage(promedio)
    }, [reviews])

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if(product){
            getBrandAndCategory()
        }
    }, [product])

    const handleChangeReviewsView = () => {
        if(!isAuthenticated) return navigate("/login")

        setAddReview(!addReview)
    }

    const handleSendReview = async () => {
        try {
            setLoadingNewReview(true)

            let res = await createReview(calificacion, id, user?.id_usuario)

            if(!res?.valid){
                setReviewError("No se pudo guardar la reseña")
                return
            }

            getData()
            setAddReview(false)
        } catch (error) {
            console.log(error?.message)
        } finally {
            setLoadingNewReview(false)
        }
    }

    return (
        <div>
            {loading ? (
                <Loader text="Regalanos unos instantes mientras cargamos la informacion del producto" />
            ) : (
                <>
                    {/* productos */}
                    <div className="product-details">
                        <div className="images-container">
                            {product?.imagenes?.map((i, index) => (
                                <>
                                    <img
                                        src={createImageURL(product.imagenes[currentImage]?.filename)}
                                        alt={product?.nombre}
                                        className="main-image"
                                    />

                                    {product.imagenes.length > 1 && (
                                        <>
                                            <button className="prev" onClick={prevImage}>‹</button>
                                            <button className="next" onClick={nextImage}>›</button>
                                        </>
                                    )}
                                </>
                            ))}
                        </div>
                        <div className="details">
                            <div className="details-menu-header">
                                <h1>{product?.nombre}</h1>
                                <button title="Agregar a la lista de deseos" onClick={() => {handleAddToWishList()}} className="button-add-to-wishlist">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
                                </button>
                            </div>
                            {product?.stock == 0 ? (
                                <p>Agotado</p>
                            ) : (
                                <p>{product?.stock} unidad{product?.stock > 1 && 'es'}</p>
                            )}
                            <p>{brand?.nombre} - {category?.nombre}</p>

                            <p>
                                Reseñas ({reviews.length}) 
                                <div className="estrellas-display estrellas-display-details">
                                    {stars.map(s => {
                                        if (reviewAverage >= s) {
                                            return <span key={s} className="estrella activa">★</span>
                                        } else if (reviewAverage >= s - 0.5) {
                                            return <span key={s} className="estrella media">★</span>
                                        } else {
                                            return <span key={s} className="estrella">☆</span>
                                        }
                                    })}
                                </div>

                                <p>({reviewAverage.toFixed(1)} / 5)</p>    
                            </p>


                            <div className="add-to-cart">
                                <div className="quantity-buttons">
                                    <button onClick={() => {if(quantity > 1) setQuantity(quantity-1)}}>
                                       <p>-</p> 
                                    </button>
                                    <p>
                                        {quantity}
                                    </p>
                                    <button onClick={() => {setQuantity(quantity+1)}}>
                                        <p>+</p>
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => {handleAddToCart()}}>
                                        añadir al carrito {parsePrice(quantity*product?.precio)} COP
                                    </button>
                                </div>
                            </div>

                            <h2>Detalles</h2>
                            <p>{product?.descripcion}</p>
                        </div>
                    </div>
                    
                    {/* reseñas */}
                    <div className="reviews-details-container">

                        {addReview ? (
                            <div className="section-login">
                                 <div>
                                    <h1 className="titulo-por-h1">Reseñas</h1>
                                </div>

                                <div className="stepper-estrellas">
                                    <div className="estrellas-display">
                                        {stars.map(s => (
                                            <span
                                                key={s}
                                                className={`estrella ${s <= calificacion ? 'activa' : ''}`}
                                                onClick={() => {
                                                    setCalificacion(s)
                                                    setStepErrors({})
                                                }}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>

                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        step="1"
                                        value={calificacion}
                                        onChange={e => {
                                            setCalificacion(Number(e.target.value))
                                            setStepErrors({})
                                        }}
                                        className="slider-estrellas"
                                    />

                                    <p className="calificacion-texto">
                                        {calificacion === 1 && 'Muy malo'}
                                        {calificacion === 2 && 'Malo'}
                                        {calificacion === 3 && 'Regular'}
                                        {calificacion === 4 && 'Bueno'}
                                        {calificacion === 5 && 'Excelente'}
                                    </p>
                                </div>
                                <p className="highlight">Dejanos saber tu opinion sobre este producto</p>
                                <p className="highlight">¿De 1 a 5 que opinas del producto?</p>

                                {reviewError && (<p className="form-input-error">{reviewError}</p>)}
                            </div>
                        ) : (
                            reviews.length > 0 ? (
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
                            ) : (
                                <div className="not-reviews-container">
                                    <h1>Sin reseñas</h1>
                                    <p>Parece que este producto no cuenta con reseñas, se el primero en agregar una</p>
                                </div>
                            )
                        )}

                        <div>
                            {addReview && (
                                <button className="secondary-btn" onClick={() => {handleSendReview()}} disabled={loadingNewReview}>{loadingNewReview ? "Guardando..." : "Guardar"}</button>
                            )}
                            <button onClick={() => {handleChangeReviewsView()}}>{addReview ? "Cancelar" : "Agregar Reseña"}</button>
                        </div>

                    </div>

                    {/* productos  */}
                    <div className="more-products-container">
                        <h2 className="">Mas de nustros productos</h2>
                        <ProductsCards 
                        ></ProductsCards>
                    </div>
                </>
            )}
        </div>
    )
}

export default ProductsDetails