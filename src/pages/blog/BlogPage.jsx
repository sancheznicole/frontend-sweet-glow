import React from "react"
import { Link } from "react-router-dom"

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL

const BlogPage = () => {
  return (
    <div>
      <div className="blog-header">
        <h1>CONSEJOS Y TENDENCIAS DE BELLEZA</h1>
      </div>

      <div className="blog-container">

        <div className="Blog">
          <img className="img"
            src={`${STORAGE_URL}/imagenes_productos/skinn.jpg`}
            alt="Cuidado de la Piel"
          />
          <div className="blog-overlay">
            <Link to="/blog/Skincare">Cuidado de la piel</Link>
          </div>
        </div>

        <div className="Blog">
          <img className="img"
            src={`${STORAGE_URL}/imagenes_productos/tonosideales.jpg`}
            alt="Tonos ideales"
          />
          <div className="blog-overlay">
            <Link to="/blog/Colorimetria">Colorimetria y tonos ideales</Link>
          </div>
        </div>

        <div className="Blog">
          <img className="img"
            src={`${STORAGE_URL}/imagenes_productos/fragancia.jpg`}
            alt="Fragancia"
          />
          <div className="blog-overlay">
            <Link to="/blog/Fragrance">Fragancias</Link>
          </div>
        </div>

        <div className="Blog">
          <img className="img"
            src={`${STORAGE_URL}/imagenes_productos/productos.jpg`}
            alt="Productos"
          />
          <div className="blog-overlay">
            <Link to="/blog/Recommended">Productos recomendados</Link>
          </div>
        </div>

        <div className="Blog">
          <img className="img"
            src={`${STORAGE_URL}/imagenes_productos/bellezaa.jpg`}
            alt="Consejos"
          />
          <div className="blog-overlay">
            <Link to="/blog/Advice">Consejos de belleza</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BlogPage