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

        <Link to="/blog/Skincare" className="Blog">
          <img className="img"
            src={`/assets/skinn.jpg`}
            alt="Cuidado de la Piel"
          />
          <div className="blog-overlay">
            <span>Cuidado de la piel</span>
          </div>
        </Link>

        <Link to="/blog/Colorimetria" className="Blog">
          <img className="img"
            src={`/assets/tonosideales.jpg`}
            alt="Tonos ideales"
          />
          <div className="blog-overlay">
            <span>Colorimetria y tonos ideales</span>
          </div>
        </Link>

        <Link to="/blog/Fragrance" className="Blog">
          <img className="img"
            src={`/assets/fragancia.jpg`}
            alt="Fragancia"
          />
          <div className="blog-overlay">
            <span>Fragancias</span>
          </div>
        </Link>

        <Link to="/blog/Recommended" className="Blog">
          <img className="img"
            src={`/assets/productos.jpg`}
            alt="Productos"
          />
          <div className="blog-overlay">
            <span>Productos recomendados</span>
          </div>
        </Link>

        <Link to="/blog/Advice" className="Blog">
          <img className="img"
            src={`/assets/bellezaa.jpg`}
            alt="Consejos"
          />
          <div className="blog-overlay">
            <span>Consejos de belleza</span>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default BlogPage