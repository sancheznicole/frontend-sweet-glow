import React from 'react'
import { Link } from 'react-router-dom'

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL

const Fragrance = () => {
  return (
    <div className='fragancias'>

      {/* HERO */}
      <div className="blog-hero">
        <img
          src={`${STORAGE_URL}/imagenes_productos/blogfragancias.jpg`}
          alt="fragancias"
          className="blog-hero-img"
        />
        <div className="blog-hero-overlay">
          <h1>Fragancias para cada estilo</h1>
        </div>
      </div>

      <div className="skin-contenido">

        <p className='parrafo-titulo'>Las fragancias forman parte importante del estilo personal, ya que el aroma que usamos puede reflejar nuestra personalidad, 
          estado de ánimo o incluso el momento del día. Existen diferentes tipos de fragancias que se caracterizan por sus notas y aromas predominantes, como las dulces, florales, cítricas e intensas.
          Cada una tiene características únicas y puede adaptarse mejor a ciertos gustos o situaciones.
          Elegir la fragancia adecuada permite expresar la identidad personal y dejar una impresión agradable.
        </p>

        {/* Fragancias dulces */}
        <div className="skin-seccion">
          <div className="skin-texto">
            <h3 className='fragancia'>Fragancias dulces</h3>
            <p className='p'>Las fragancias dulces se caracterizan por aromas suaves, cálidos y envolventes. Suelen contener notas como vainilla, caramelo, chocolate o frutas maduras. 
              Este tipo de perfume transmite una sensación acogedora, femenina y juvenil.
              <h4>Características</h4>
              Aromas cálidos y agradables, Sensación dulce y envolvente, Suelen ser muy duraderas
              <h4>Para quiénes son ideales</h4>
              Las fragancias dulces suelen gustar a personas que tienen una personalidad alegre,
              romántica o que disfrutan aromas más llamativos.
              <h4>Cuándo usarlas</h4>
              Salidas nocturnas, Citas especiales, Eventos o momentos donde se quiere destacar
            </p>
          </div>
          
          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`${STORAGE_URL}/imagenes_productos/fragancias-dulces.jpg`} alt="Fragancias dulces" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver Fragancias</Link>
            </div>
          </div>
        </div>

        {/* Fragancias florales */}
        <div className="skin-seccion invertida">
          <div className="skin-texto">
            <h3 className='fragancia'>Fragancias florales</h3>
            <p className='p'>Las fragancias florales son una de las familias más populares en perfumería. Están inspiradas en el aroma de flores como la rosa, jazmín, lavanda o lirio.
              Suelen transmitir frescura, elegancia y feminidad.
              <h4>Características</h4>
              Aromas suaves y delicados, Sensación fresca y natural, Muy versátiles para diferentes ocasiones
              <h4>Para quiénes son ideales</h4>
              Son perfectas para personas que prefieren aromas clásicos, elegantes y femeninos.
              <h4>Cuándo usarlas</h4>
              Uso diario, Trabajo o universidad, Reuniones o actividades sociales
            </p>
          </div>

          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`${STORAGE_URL}/imagenes_productos/fragancias-florales.jpg`} alt="Fragancias florales" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver Fragancias</Link>
            </div>
          </div>
        </div>

        {/* Fragancias cítricas */}
        <div className="skin-seccion">
          <div className="skin-texto">
            <h3 className='fragancia'>Fragancias cítricas</h3>
            <p className='p'>Las fragancias cítricas contienen notas frescas provenientes de frutas como limón, naranja, mandarina o bergamota.
              Este tipo de perfume se caracteriza por ser ligero, refrescante y energético.
              <h4>Características</h4>
              Aromas frescos y ligeros, Sensación de limpieza y energía, Generalmente más suaves
              <h4>Para quiénes son ideales</h4>
              Son ideales para personas activas que prefieren aromas frescos y naturales.
              <h4>Cuándo usarlas</h4>
              Durante el día, Actividades al aire libre, Climas cálidos o temporadas de verano
            </p>
          </div>

          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`${STORAGE_URL}/imagenes_productos/fragancias-cítricas.jpg`} alt="Fragancias cítricas" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver Fragancias</Link>
            </div>
          </div>
        </div>

        {/* Fragancias intensas */}
        <div className="skin-seccion">
          <div className="skin-texto">
            <h3 className='fragancia'>Fragancias intensas</h3>
            <p className='p'>Las fragancias intensas tienen aromas más profundos y sofisticados. 
              Suelen contener notas amaderadas, especiadas o orientales como sándalo, ámbar, almizcle o canela.
              <h4>Características</h4>
              Aromas fuertes y duraderos, Sensación elegante y sofisticada, Mayor concentración de perfume
              <h4>Para quiénes son ideales</h4>
              Son perfectas para personas con personalidad fuerte o que prefieren perfumes más elegantes y llamativos.
              <h4>Cuándo usarlas</h4>
              Eventos especiales, Salidas nocturnas, Ocasiones formales
            </p>
          </div>

          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`${STORAGE_URL}/imagenes_productos/fragancias-intensas.jpg`} alt="Fragancias intensas" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver Fragancias</Link>
            </div>
          </div>
        </div>

        {/* IMPORTANCIA */}
        <h3 className='fragancia'>Cómo elegir la fragancia ideal</h3>
        <p className='p'>Al elegir un perfume es importante tener en cuenta no solo el aroma, sino también el estilo personal y el momento en que se va a usar.
          Algunas personas prefieren fragancias frescas para el día y aromas más intensos para la noche.
          En Sweet Glow buscamos ayudar a cada persona a descubrir fragancias que se adapten a su estilo, personalidad y rutina diaria, 
          para que puedan sentirse cómodas y seguras con el aroma que elijan.
        </p>

      </div>
    </div>
  )
}

export default Fragrance


