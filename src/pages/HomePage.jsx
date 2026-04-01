import { useAuth } from "../contexts/AuthContext"
import ProductsCards from "../components/ProductsCards"
import ProductsCarousel from "../components/ProductsCarousel"

const HomePage = () => {

    return (

        <div className='page-container'>
            {/* imagen */}
            <div className="main-banner">
                <h1>Cosmic Universe</h1>
                <p>Limpio, fresco y cremoso - descubre nuestras fragancias cosmicas</p>
                <p>A demás personaliza el empaquetado de cualquier tamaño de nuestros perfumes</p>
            </div>

            <div className="view-cleaner-important-div"></div>

            {/* productos en tendencia */}
            <h1 className="page-title">Nuestros productos en tendencia</h1>
            <ProductsCarousel tendency={true}></ProductsCarousel>

            {/* productos en descuento */}
            <h1 className="page-title">Nuestros productos en descuento</h1>
            <ProductsCarousel discount={true}></ProductsCarousel>

            {/* ultimos productos */}
            <h1 className="page-title">Nuestros ultimos productos</h1>
            <ProductsCards 
            ></ProductsCards>

            {/* banner publicitario */}

            {/* about  */}
            <h1 className="page-title">Más sobre Sweet glow</h1>
            <div className="about-sweet-glow">
                <div>
                    <img src="assets/esa_qcha.webp" alt="Sweet glow" />
                </div>
                <div>
                    <h1>kylie's oscars look</h1>
                    <p>
                        recreate kylie’s oscars glam featuring our best-selling hybrid blush and a new cool-toned precision pout lip liner.
                    </p>
                </div>
            </div>

            {/* gallery */}
            <h1 className="page-title">Galería</h1>
            <div className="gallery">
                <div className="big-photo"><img src="/assets/sorteos.jpeg" alt="sweet-glow gallery photo" /></div>
                <div><img src="/assets/sorteos.jpeg" alt="sweet-glow gallery photo" /></div>
                <div><img src="/assets/sorteos.jpeg" alt="sweet-glow gallery photo" /></div>
                <div><img src="/assets/sorteos.jpeg" alt="sweet-glow gallery photo" /></div>
                <div><img src="/assets/sorteos.jpeg" alt="sweet-glow gallery photo" /></div>
                <div><img src="/assets/sorteos.jpeg" alt="sweet-glow gallery photo" /></div>
                <div className="big-photo"><img src="/assets/sorteos.jpeg" alt="sweet-glow gallery photo" /></div>
                <div><img src="/assets/sorteos.jpeg" alt="sweet-glow gallery photo" /></div>
                <div><img src="/assets/sorteos.jpeg" alt="sweet-glow gallery photo" /></div>
                <div><img src="/assets/sorteos.jpeg" alt="sweet-glow gallery photo" /></div>
                <div><img src="/assets/sorteos.jpeg" alt="sweet-glow gallery photo" /></div>
                <div><img src="/assets/sorteos.jpeg" alt="sweet-glow gallery photo" /></div>
            </div>
        </div>
    )
}

export default HomePage