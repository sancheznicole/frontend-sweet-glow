import React from 'react'
import { Link } from 'react-router-dom'

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL

const Skincare = () => {
  return (
    <div className='skin'>

      {/* HERO */}
      <div className="blog-hero">
        <img
          src={`${STORAGE_URL}/imagenes_productos/blogskin.jpg`}
          alt="Cuidado de la piel"
          className="blog-hero-img"
        />
        <div className="blog-hero-overlay">
          <h1>Guía para una Piel Perfecta</h1>
        </div>
      </div>

      <div className="skin-contenido">

        <p className='parrafo-titulo'>En Sweet Glow, creemos que tu piel es un reflejo de tu bienestar. Inspirándonos en las rutinas de belleza internacionales,
        hemos diseñado esta guía para que entiendas el lenguaje de tu rostro y le des exactamente lo que pide.</p>

        {/* PIEL SECA */}
        <div className="skin-seccion">
          <div className="skin-texto">
            <h3 className='tipo-piel'>Piel Seca</h3>
            <p className='piel-p'>La piel seca se caracteriza por producir menos aceites naturales de lo normal. Esto puede provocar que la piel se sienta tirante,
              áspera o con descamación.
              <h4>Características</h4>
              Sensación de tirantez, Apariencia opaca o áspera, Posible descamación, Líneas de expresión más visibles.
              <h4>Ingredientes recomendados</h4>
              Ácido hialurónico, Ceramidas, Glicerina, Manteca de karité.
              <h4>Productos recomendados</h4>
              Cremas hidratantes intensivas, Sérums hidratantes, Limpiadores suaves o cremosos, Mascarillas nutritivas.
            </p>
          </div>
          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`${STORAGE_URL}/imagenes_productos/piel-seca.jpg`} alt="Piel seca" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver productos de skincare</Link>
            </div>
          </div>
        </div>

        {/* PIEL MIXTA */}
        <div className="skin-seccion invertida">
          <div className="skin-texto">
            <h3 className='tipo-piel'>Piel Mixta</h3>
            <p className='piel-p'>La piel mixta es una combinación de piel grasa y piel seca. Generalmente la zona T del rostro (frente, nariz y mentón) 
          presenta mayor producción de grasa, mientras que las mejillas pueden ser normales o secas.
          Este tipo de piel requiere un equilibrio en el cuidado facial, utilizando productos que hidraten las zonas secas y controlen el exceso de grasa en las zonas más brillantes.
              <h4>Características</h4>
              Zona T grasa, Mejillas normales o secas, Poros visibles en la nariz o frente, Brillo en algunas áreas del rostro.
              <h4>Ingredientes recomendados</h4>
              Niacinamida, Ácido hialurónico, Extractos naturales calmantes.
              <h4>Productos recomendados</h4>
              Limpiadores suaves, Hidratantes ligeros, Tónicos equilibrantes, Mascarillas específicas para cada zona.
            </p>
          </div>
          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`${STORAGE_URL}/imagenes_productos/tonico.jpg`} alt="Piel mixta" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver productos de skincare</Link>
            </div>
          </div>
        </div>

        {/* PIEL GRASA */}
        <div className="skin-seccion">
          <div className="skin-texto">
            <h3 className='tipo-piel'>Piel Grasa</h3>
            <p className='piel-p'>La piel grasa produce una mayor cantidad de sebo (aceite natural). Esto puede provocar brillo excesivo en el rostro, 
          especialmente en la zona T (frente, nariz y mentón). También es común que aparezcan poros dilatados, puntos negros o tendencia al acné.
              <h4>Características</h4>
              Brillo visible, Poros más grandes, Puntos negros o espinillas, Mayor tendencia al acné.
              <h4>Ingredientes recomendados</h4>
              Niacinamida, Ácido salicílico, Zinc, Arcilla.
              <h4>Productos recomendados</h4>
              Limpiadores en gel, Tónicos equilibrantes, Sérums para controlar grasa, Hidratantes ligeros oil-free.
            </p>
          </div>
          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`${STORAGE_URL}/imagenes_productos/limpiador.jpg`} alt="Piel grasa" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver productos de skincare</Link>
            </div>
          </div>
        </div>

        {/* PIEL SENSIBLE */}
        <div className="skin-seccion invertida">
          <div className="skin-texto">
            <h3 className='tipo-piel'>Piel Sensible</h3>
            <p className='piel-p'>La piel sensible reacciona con mayor facilidad a factores externos como el clima, la contaminación o ciertos productos cosméticos.
          Este tipo de piel puede presentar irritación, enrojecimiento o picazón.
          Por esta razón, es importante utilizar productos suaves que ayuden a proteger y calmar la piel.
              <h4>Características</h4>
              Enrojecimiento frecuente, Sensación de ardor o picazón, Irritación con algunos productos, Mayor sensibilidad ambiental.
              <h4>Ingredientes recomendados</h4>
              Aloe vera, Avena coloidal, Manzanilla, Pantenol.
              <h4>Productos recomendados</h4>
              Limpiadores suaves sin fragancia, Cremas calmantes, Productos hipoalergénicos, Protectores solares para piel sensible.
            </p>
          </div>
          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`${STORAGE_URL}/imagenes_productos/serum.jpg`} alt="Piel sensible" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver productos de skincare</Link>
            </div>
          </div>
        </div>

        {/* IMPORTANCIA */}
        <h3 className='tipo-piel'>Importancia de elegir productos adecuados</h3>
        <p className='piel-p'>Utilizar productos adecuados según el tipo de piel es clave para mantener una piel sana. Además,
          una buena rutina de cuidado facial debe incluir tres pasos básicos:
          Limpieza: elimina impurezas y exceso de grasa.
          Hidratación: mantiene la piel saludable y equilibrada.
          Protección solar: protege la piel contra los daños del sol y el envejecimiento prematuro.
          En Sweet Glow buscamos ayudar a cada persona a encontrar productos que se adapten a sus necesidades y contribuyan al cuidado adecuado de su piel.
        </p>

      </div>
    </div>
  )
}

export default Skincare



