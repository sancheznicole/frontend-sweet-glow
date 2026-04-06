import React from 'react'
import { Link } from 'react-router-dom'

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL

const Recommended = () => {
  return (
    <div className='recomendaciones'>

      {/* HERO */}
      <div className="blog-hero">
        <img
          src={`/assets/recomendaciones.jpg`}
          alt="recomendaciones"
          className="blog-hero-img"
        />
        <div className="blog-hero-overlay">
          <h1>Productos recomendados </h1>
        </div>
      </div>

      <div className="skin-contenido">

        <p className='parrafo-titulo'>En esta sección se destacan algunos productos de belleza que suelen ser recomendados según el tipo de piel, 
          el tono de piel o las preferencias personales. Elegir los productos adecuados ayuda a mejorar la apariencia de la piel, mantenerla saludable 
          y lograr mejores resultados en el maquillaje o cuidado personal.
          En Sweet Glow se pueden presentar recomendaciones organizadas por categorías para que cada persona encuentre fácilmente lo que necesita.
        </p>

        {/* Productos recomendados para piel grasa */}
        <div className="skin-seccion">
          <div className="skin-texto">
            <h3 className='productos'>Productos recomendados para piel grasa</h3>
            <p className='prod'>Las personas con piel grasa necesitan productos que ayuden a controlar el exceso de sebo, 
              reducir el brillo y mantener los poros limpios, sin resecar demasiado la piel.
              <h4>Productos recomendados</h4>
              Limpiadores faciales en gel que eliminan el exceso de grasa, Tónicos equilibrantes que ayudan a minimizar los poros,
              Hidratantes ligeros libres de aceite (oil-free), Sérums con ingredientes que regulen la producción de sebo.
            </p>
          </div>
          
          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`/assets/limpiador.jpg`} alt="Fragancias dulces" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver productos de skincare</Link>
            </div>
          </div>
        </div>

        {/* Productos recomendados para piel seca */}
        <div className="skin-seccion invertida">
          <div className="skin-texto">
            <h3 className='productos'>Productos recomendados para piel seca</h3>
            <p className='prod'>La piel seca necesita productos que aporten hidratación profunda y nutrientes, para evitar la sensación de tirantez y descamación.
              <h4>Productos recomendados</h4>
              Cremas hidratantes intensivas, Sérums con ácido hialurónico, Limpiadores cremosos que no resequen la piel, Mascarillas nutritivas.
            </p>
          </div>

          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`/assets/piel-seca.jpg`} alt="Fragancias florales" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver productos de skincare</Link>
            </div>
          </div>
        </div>

        {/* Maquillaje según tu tono de piel */}
        <div className="skin-seccion">
          <div className="skin-texto">
            <h3 className='productos'>Maquillaje según tu tono de piel</h3>
            <p className='prod'>Elegir el maquillaje adecuado según el tono y subtono de piel permite lograr un resultado más natural y armonioso.
              <h4>Recomendaciones</h4>
              Piel clara: bases ligeras, rubores rosados y tonos suaves.
              Piel media: tonos durazno, coral o dorados.
              Piel oscura: colores intensos como vino, ciruela o bronce.
            </p>
          </div>

          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`/assets/subtono-frio.jpg`} alt="Fragancias cítricas" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver productos de maquillaje</Link>
            </div>
          </div>
        </div>

        {/* Fragancias más populares */}
        <div className="skin-seccion">
          <div className="skin-texto">
            <h3 className='productos'>Fragancias más populares</h3>
            <p className='prod'>Las fragancias también forman parte del estilo personal.
              Existen perfumes que se han vuelto muy populares gracias a sus aromas distintivos y duraderos.
              <h4>Ejemplos de fragancias populares</h4>
              Chanel No. cinco de Chanel, un perfume clásico con notas florales elegantes.
              Black Opium de Yves Saint Laurent, fragancia intensa con notas dulces y de café.
              Light Blue de Dolce & Gabbana, perfume fresco con notas cítricas.

              Estas fragancias son conocidas por su aroma característico y su popularidad en el mundo de la perfumería
            </p>
          </div>

          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`/assets/fragancias-florales.jpg`} alt="Fragancias intensas" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver Fragancias</Link>
            </div>
          </div>
        </div>

        {/* IMPORTANCIA */}
        <h3 className='fragancia'>Importancia de elegir productos adecuados</h3>
        <p className='p'>Cada persona tiene necesidades diferentes en cuanto al cuidado de la piel y el maquillaje. Por eso, elegir productos adecuados según el tipo de piel,
           tono de piel y preferencias personales permite obtener mejores resultados.
           En Sweet Glow, esta sección puede servir como guía para descubrir productos que ayuden a mejorar la rutina de belleza y encontrar opciones que se adapten a cada estilo.
        </p>

      </div>
    </div>
  )
}

export default Recommended







/*
  
  

      <h3 className='productos'>Importancia de elegir productos adecuados</h3>
        <p className='prod'></p>
       
    </div>
  )
}

export default Recommended*/
