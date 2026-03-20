import React from 'react'

const ProductCard = ({titulo, imagen, precio, stock, referencia, marca, categoria}) => {
    return (
        <div className='proyect-card'>
            <div>
                <img src={imagen} alt={`${titulo} portada`} />
            </div>
            <div>
                <h2>{titulo}</h2>
                <div>
                    <p>{precio}</p>
                    <p>{stock}</p>
                </div>
                <p>{referencia}</p>

                <div>
                    <p>{marca}</p>
                    <p>{categoria}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard