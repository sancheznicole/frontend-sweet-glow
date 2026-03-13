import React from "react"
import { Link } from "react-router-dom";

const BlogPage = () => {
  return (
    <div className="page-container">

      <div className="Blog">
        
        <img className="img"
          src="http://127.0.0.1:8000/storage/skin.jpg" 
          alt="Cuidado de la Piel" 
        />
        <Link to="/Skincare.jsx">Cuidado de la piel</Link> y{" "}
        

      </div>
    </div>
  )

}

export default BlogPage