import React from 'react'
import { Link } from 'react-router-dom'

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL

const Advice = () => {
  return (
    <div className='consejos'>

      {/* HERO */}
      <div className="blog-hero">
        <img
          src={`${STORAGE_URL}/imagenes_productos/blogconsejos.jpg`}
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
              <img src={`${STORAGE_URL}/imagenes_productos/rutina-skincare.jpg`} alt="Rutina skincare" />
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
              <img src={`${STORAGE_URL}/imagenes_productos/maquillaje-duradero.jpg`} alt="Maquillaje duradero" />
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
              <img src={`${STORAGE_URL}/imagenes_productos/blogfragancias.jpg`} alt="Fragancias" />
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



/*import React from 'react'

const Advice = () => {
  return (
    <div className='consejos'>

      <h1 className="titulo">Consejos de belleza ✨</h1>
        <p className='parrafo-titulo'>En esta sección se comparten consejos prácticos y fáciles de aplicar para mejorar la rutina de cuidado personal.
          Los tips de belleza ayudan a aprovechar mejor los productos de skincare, maquillaje y fragancias, logrando resultados más duraderos y favorecedores.

          Los siguientes consejos pueden ayudarte a mejorar tu rutina diaria de belleza.</p>

      <h3 className='belleza'>Cómo crear una rutina de skincare</h3>
        <p className='pb'>Tener una rutina de cuidado de la piel es fundamental para mantenerla saludable, limpia e hidratada. No es necesario usar muchos productos; 
          lo importante es seguir algunos pasos básicos de forma constante.

          <h4>Pasos básicos de una rutina de skincare</h4>
          <ol>Seguir estos pasos diariamente puede mejorar notablemente la apariencia y salud de la piel:</ol>
          <li><b>Limpieza: </b>El primer paso es limpiar la piel para eliminar impurezas, maquillaje y exceso de grasa. Se recomienda usar un limpiador adecuado para el tipo de piel.</li>
          <li><b>Tónico: </b>El tónico ayuda a equilibrar el pH de la piel y a prepararla para recibir otros productos.</li>
          <li><b>Sérum: </b>Los sérums contienen ingredientes concentrados que ayudan a tratar necesidades específicas como hidratación, manchas o control de grasa.</li>
          <li><b>Hidratación: </b>La crema hidratante ayuda a mantener la piel suave, nutrida y protegida.</li>
          <li><b>Protector solar: </b>El protector solar es uno de los pasos más importantes, ya que protege la piel de los daños causados por el sol y previene el envejecimiento prematuro.</li>

          
          </p>


      <h3 className='belleza'>Cómo hacer que el maquillaje dure más</h3>
        <p className='pb'>Muchas personas buscan que su maquillaje se mantenga intacto durante más tiempo. 
          Existen algunos consejos que pueden ayudar a prolongar su duración.

          <h4>Características</h4>
          Zona T grasa
          Mejillas normales o secas
          Poros visibles en la nariz o frente
          Brillo en algunas áreas del rostro

          <ol className='pb'></ol>
          <h4>Tips para que el maquillaje dure más</h4>
          Estos pasos pueden ayudar a que el maquillaje luzca fresco por más horas:
          <li><b>Preparar la piel:</b> limpiar e hidratar la piel antes de maquillarse ayuda a que los productos se adhieran mejor.</li>
          <li><b>Usar primer:</b>el primer ayuda a crear una base uniforme para el maquillaje.</li>
          <li><b>Aplicar capas ligeras:</b>es mejor aplicar varias capas delgadas que una capa muy gruesa.</li>
          <li><b>Sellar con polvo:</b>el polvo traslúcido ayuda a fijar la base y reducir el brillo.</li>
          <li><b>Usar spray fijador:</b>el fijador de maquillaje ayuda a mantener todo en su lugar durante más tiempo.</li>
          </p>


      <h3 className='belleza'>Cómo elegir la fragancia adecuada para el día o la noche</h3>
        <p className='pb'>Las fragancias pueden variar según el momento del día o la ocasión. 
          Elegir el perfume adecuado puede hacer que el aroma sea más agradable y apropiado para cada situación.

          <h4>Fragancias para el día</h4>
          Durante el día se recomiendan fragancias ligeras y frescas, que no sean demasiado intensas,
          Son perfectas para actividades diarias como trabajar, estudiar o salir durante el día.

          Aromas cítricos
          Fragancias florales suaves
          Perfumes frescos y ligeros

          <h4>Fragancias para la noche</h4>
          Por la noche se pueden usar perfumes más intensos y duraderos, que destaquen más,
          Este tipo de fragancias suele utilizarse en eventos, salidas o ocasiones especiales.

          Aromas dulces
          Fragancias orientales
          Perfumes amaderados o especiadoss</p>


      <h3 className='belleza'>Importancia de los consejos de belleza</h3>
        <p className='pb'>Aplicar pequeños consejos en la rutina diaria puede marcar una gran diferencia en la apariencia y cuidado personal.
          Desde una buena rutina de skincare hasta elegir la fragancia correcta, cada detalle contribuye a resaltar la belleza natural.

          En Sweet Glow, estos consejos buscan ayudar a cada persona a sentirse más segura y a descubrir nuevas formas de cuidar su piel y su estilo personal.</p>
       
    </div>
  )
}

export default Advice*/