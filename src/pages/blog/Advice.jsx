import React from 'react'
import { Link } from 'react-router-dom'

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL

const Advice = () => {
  return (
    <div className='consejos'>

      {/* HERO */}
      <div className="blog-hero">
        <img
          src={`/assets/blogconsejos.jpg`}
          alt="Consejos de belleza"
          className="blog-hero-img"
        />
        <div className="blog-hero-overlay">
          <h1>Consejos de Belleza</h1>
        </div>
      </div>

      <div className="skin-contenido">

        <p className='parrafo-titulo'>En esta sección se comparten consejos prácticos y fáciles de aplicar para mejorar la rutina de cuidado personal.
          Los tips de belleza ayudan a aprovechar mejor los productos de skincare, maquillaje y fragancias, logrando resultados más duraderos y favorecedores.</p>

        {/* RUTINA SKINCARE */}
        <div className="skin-seccion">
          <div className="skin-texto">
            <h3 className='belleza'>Cómo crear una rutina de skincare</h3>
            <p className='pb'>Tener una rutina de cuidado de la piel es fundamental para mantenerla saludable, limpia e hidratada.
              <h4>Pasos básicos</h4>
              <li><b>Limpieza:</b> eliminar impurezas, maquillaje y exceso de grasa.</li>
              <li><b>Tónico:</b> equilibra el pH de la piel.</li>
              <li><b>Sérum:</b> trata necesidades específicas como hidratación o manchas.</li>
              <li><b>Hidratación:</b> mantiene la piel suave y nutrida.</li>
              <li><b>Protector solar:</b> protege contra el sol y el envejecimiento prematuro.</li>
            </p>
          </div>
          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`/assets/rutina-skincare.jpg`} alt="Rutina skincare" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver productos de skincare</Link>
            </div>
          </div>
        </div>

        {/* MAQUILLAJE DURADERO */}
        <div className="skin-seccion invertida">
          <div className="skin-texto">
            <h3 className='belleza'>Cómo hacer que el maquillaje dure más</h3>
            <p className='pb'>Existen algunos consejos que pueden ayudar a prolongar la duración del maquillaje.
              <h4>Tips para que dure más</h4>
              <li><b>Preparar la piel:</b> limpiar e hidratar antes de maquillarse.</li>
              <li><b>Usar primer:</b> crea una base uniforme para el maquillaje.</li>
              <li><b>Aplicar capas ligeras:</b> varias capas delgadas en lugar de una gruesa.</li>
              <li><b>Sellar con polvo:</b> el polvo traslúcido fija la base y reduce el brillo.</li>
              <li><b>Usar spray fijador:</b> mantiene todo en su lugar por más tiempo.</li>
            </p>
          </div>
          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`/assets/maquillaje-duradero.jpg`} alt="Maquillaje duradero" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver productos de maquillaje</Link>
            </div>
          </div>
        </div>

        {/* FRAGANCIAS */}
        <div className="skin-seccion">
          <div className="skin-texto">
            <h3 className='belleza'>Cómo elegir la fragancia adecuada</h3>
            <p className='pb'>Las fragancias pueden variar según el momento del día o la ocasión.
              <h4>Fragancias para el día</h4>
              Aromas cítricos, Fragancias florales suaves, Perfumes frescos y ligeros.
              <h4>Fragancias para la noche</h4>
              Aromas dulces, Fragancias orientales, Perfumes amaderados o especiados.
            </p>
          </div>
          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`/assets/blogfragancias.jpg`} alt="Fragancias" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver fragancias</Link>
            </div>
          </div>
        </div>

        {/* IMPORTANCIA */}
        <h3 className='belleza'>Importancia de los consejos de belleza</h3>
        <p className='pb'>Aplicar pequeños consejos en la rutina diaria puede marcar una gran diferencia en la apariencia y cuidado personal.
          En Sweet Glow, estos consejos buscan ayudar a cada persona a sentirse más segura y a descubrir nuevas formas de cuidar su piel y su estilo personal.
        </p>

      </div>
    </div>
  )
}

export default Advice
