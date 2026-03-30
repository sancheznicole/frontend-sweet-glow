import React from 'react'
import { Link } from 'react-router-dom'

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL

const Colorimetria = () => {
  return (
    <div className='colorimetria'>

      {/* HERO */}
      <div className="blog-hero">
        <img
          src={`${STORAGE_URL}/imagenes_productos/blogcolorimetria.jpg`}
          alt="Colorimetria"
          className="blog-hero-img"
        />
        <div className="blog-hero-overlay">
          <h1>Colorimetría y Tonos Ideales</h1>
        </div>
      </div>

      <div className="skin-contenido">

        <p className='parrafo-titulo'>La colorimetría es una técnica utilizada en belleza y maquillaje para identificar qué colores favorecen más a cada persona según el subtono de su piel. 
          Conocer el subtono permite elegir mejor productos como base, corrector, rubor, labial o sombras, logrando un maquillaje más natural y armonioso.
          Subtono de piel: es el matiz que se encuentra debajo de la superficie de la piel y generalmente se clasifica en cálido, frío o neutro.
          Identificar correctamente el subtono ayuda a seleccionar colores que resalten la belleza natural del rostro.
        </p>

        {/* SUBTONO CALIDO */}
        <div className="skin-seccion">
          <div className="skin-texto">
            <h3 className='piel'>Subtono Cálido</h3>
            <p className='tonos'>Las personas con subtono cálido tienen matices amarillos, dorados o ligeramente anaranjados en la piel. 
              Este tipo de subtono suele verse más luminoso con colores cálidos.
              <h4>Cómo identificarlo</h4>
              Las venas de la muñeca suelen verse verdosas. Los accesorios dorados suelen favorecer más que los plateados. La piel se broncea con facilidad.
              <h4>Tonos de maquillaje recomendados</h4>
              Base con subtonos amarillos o dorados, Rubor coral o durazno, Sombras doradas o en tonos tierra, Labiales rojo anaranjado o nude cálido.
            </p>
          </div>
          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`${STORAGE_URL}/imagenes_productos/subtono-calido.jpg`} alt="Subtono cálido" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver productos de maquillaje</Link>
            </div>
          </div>
        </div>

        {/* SUBTONO FRIO */}
        <div className="skin-seccion invertida">
          <div className="skin-texto">
            <h3 className='piel'>Subtono Frío</h3>
            <p className='tonos'>Las personas con subtono frío presentan matices rosados, rojizos o azulados en la piel.
              Este tipo de subtono suele combinar mejor con colores más suaves o fríos.
              <h4>Cómo identificarlo</h4>
              Las venas se ven azules o moradas. Los accesorios plateados suelen favorecer más. La piel puede quemarse con facilidad.
              <h4>Tonos de maquillaje recomendados</h4>
              Base con subtonos rosados, Rubor rosado o frambuesa, Sombras plateadas o moradas, Labiales rojo cereza o vino.
            </p>
          </div>
          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`${STORAGE_URL}/imagenes_productos/subtono-frio.jpg`} alt="Subtono frío" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver productos de maquillaje</Link>
            </div>
          </div>
        </div>

        {/* SUBTONO NEUTRO */}
        <div className="skin-seccion">
          <div className="skin-texto">
            <h3 className='piel'>Subtono Neutro</h3>
            <p className='tonos'>Las personas con subtono neutro tienen una mezcla equilibrada de matices cálidos y fríos en la piel. 
              Esto hace que puedan usar una mayor variedad de colores en maquillaje.
              <h4>Cómo identificarlo</h4>
              Las venas pueden verse azules y verdes al mismo tiempo. Tanto dorados como plateados se ven bien. La piel se broncea de forma moderada.
              <h4>Tonos de maquillaje recomendados</h4>
              Base con subtono neutro, Rubor rosa suave o coral, Sombras en tonos tierra o champagne, Labiales nude o rojo clásico.
            </p>
          </div>
          <div className="skin-imagen-con-boton">
            <div className="skin-imagen-tipo">
              <img src={`${STORAGE_URL}/imagenes_productos/subtono-neutro.jpg`} alt="Subtono neutro" />
            </div>
            <div className="skin-boton-container">
              <Link to="/categories" className="skin-boton">Ver productos de maquillaje</Link>
            </div>
          </div>
        </div>

        {/* IMPORTANCIA */}
        <h3 className='piel'>Importancia de conocer la colorimetría</h3>
        <p className='tonos'>Comprender la colorimetría ayuda a elegir productos que realmente favorezcan el tono natural de la piel. 
          Además, permite crear maquillajes más equilibrados, mejorar la apariencia del rostro y evitar colores que apaguen la piel.
          En Sweet Glow buscamos ayudar a cada persona a descubrir los tonos que mejor se adaptan a su piel, para que puedan elegir productos de belleza 
          de forma más segura y obtener mejores resultados en su rutina de maquillaje.
        </p>

      </div>
    </div>
  )
}

export default Colorimetria









/*import React from 'react'




      <h3 className='piel'>Subtono frío</h3>
        <p className='tonos'>

          <h4>Cómo identificarlo:</h4>
          Las venas de la muñeca se ven azules o moradas.
          Los accesorios plateados suelen favorecer más que los dorados.
          La piel puede quemarse con facilidad al exponerse al sol.

          <h4>Tonos de maquillaje recomendados</h4>
          Base de maquillaje: con subtonos rosados o neutros fríos
          Rubor: rosado, frambuesa o rosa suave
          Sombras de ojos: plateado, gris, morado, azul
          Labiales: rojo cereza, vino, rosa intenso
          Estos tonos ayudan a equilibrar los matices fríos de la piel y resaltan la luminosidad natural del rostro.</p>

      <h3 className='piel'>Subtono neutro</h3>
        <p className='tonos'>Las personas con subtono neutro tienen una mezcla equilibrada de matices cálidos y fríos en la piel. 
          Esto hace que puedan usar una mayor variedad de colores en maquillaje.

          <h4>Cómo identificarlo:</h4>
          Las venas pueden verse azules y verdes al mismo tiempo.
          Tanto los accesorios dorados como los plateados suelen verse bien.
          La piel puede broncearse de forma moderada.

          <h4>Tonos de maquillaje recomendados</h4>
          Las personas con subtono neutro tienen mayor flexibilidad al elegir colores.
          Base de maquillaje: subtono neutro
          Rubor: rosa suave, durazno o coral
          Sombras de ojos: tonos tierra, rosados, dorados o champagne
          Labiales: nude, rosa, rojo clásico
          Esto permite experimentar con diferentes estilos de maquillaje sin perder la armonía con el tono natural de la piel.</p>


      <h3 className='piel'>Importancia de conocer la colorimetría</h3>
        <p className='tonos'> </p>
       
    </div>
  )
}

export default Colorimetria
*/