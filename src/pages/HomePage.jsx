import { useAuth } from "../contexts/AuthContext"
import ProductsCards from "../components/ProductsCards"
import ProductsCarousel from "../components/ProductsCarousel"

const HomePage = () => {

    return (

        <div className='page-container'>
            {/* imagen */}
            <div className="main-banner">
                <div className="contenedor-desc-home">
                    <h2>Ya disponible!</h2>
                    <h1 className="h1-home">Hair & Body Mists</h1>
                    <p>“Nuestros sprays para cabello y cuerpo inspirados en postres,<p>
                    </p>los favoritos de nuestros clientes,</p>
                    <p>ahora llegan para acompañarte a donde vayas.”</p>
                </div>
            </div>

            <div className="view-cleaner-important-div"></div>

            {/* ultimos productos */}
            <h2 className="titulo-por-h2">Nuestros ultimos productos</h2>
            <ProductsCards 
            ></ProductsCards>

            {/* productos en tendencia */}
            <h2 className="titulo-por-h2">Nuestros productos en tendencia</h2>
            <ProductsCarousel tendency={true}></ProductsCarousel>

            {/* productos en descuento */}
            <h2 className="titulo-por-h2">Nuestros productos en descuento</h2>
            <ProductsCarousel discount={true}></ProductsCarousel>

            {/* banner publicitario */}

            {/* about  */}
            <h2 className="titulo-por-h2">Look icónico </h2>
            <div className="about-sweet-glow">
                <div>
                    <img src="assets/kylie-look.png" alt="Sweet glow" />
                </div>
                <div>
                    <p className="titulo-por-h2">Kylie y Stassie</p>
                    <p className="titulo-por-h2">estilo icónico sin esfuerzo</p>
                    <p className="descripcion-look">
                        Inspírate en el look natural y luminoso de Kylie y Stassie para lograr un acabado relajado pero memorable. Realza tu piel con nuestro colorete híbrido más vendido y define tus labios con el delineador de precisión en tonos fríos para un resultado suave, fresco y perfectamente equilibrado.    
                    </p>
                </div>
            </div>

            {/* gallery */}
            <h2 className="titulo-por-h2">Galería icónica de nuestras marcas</h2>
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