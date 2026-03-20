import React from "react"
import { Link } from "react-router-dom";

const BlogPage = () => {
  return (
    <div className="blog-container">

      <div className="Blog">
        <img className="img"
          src="http://127.0.0.1:8000/storage/imagenes_productos/skin.jpg" 
          alt="Cuidado de la Piel" 
        />
        <Link to="/blog/Skincare">Cuidado de la piel</Link>
      </div>

      <div className="Blog">
        <img className="img"
          src="http://127.0.0.1:8000/storage/imagenes_productos/tonosideales.jpg" 
          alt="Tonos ideales" 
        />
        <Link to="/blog/Colorimetria">Colorimetria y tonos ideales</Link>
      </div>

      <div className="Blog">
        <img className="img"
          src="http://127.0.0.1:8000/storage/imagenes_productos/fragancia.jpg" 
          alt="Fragancia" 
        />
        <Link to="/blog/Fragrance">Fragancias</Link>
      </div>

      <div className="Blog">
        <img className="img"
          src="http://127.0.0.1:8000/storage/imagenes_productos/productos.jpg" 
          alt="Productos" 
        />
        <Link to="/blog/Recommended">Productos recomendados</Link>
      </div>

      <div className="Blog">
        <img className="img"
          src="http://127.0.0.1:8000/storage/imagenes_productos/belleza.jpg" 
          alt="Consejos" 
        />
        <Link to="/blog/Advice">Consejos de belleza</Link>
      </div>

    </div>
  )
}

export default BlogPage