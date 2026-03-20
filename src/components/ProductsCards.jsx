import React from 'react'
import ProductCard from './ProductCard'

const ProductsCards = ({products}) => {
    
    return (
        <div className='products-cards-container'>
            {products?.map((p, index) => {
                return (
                    <ProductCard 
                        key={index}
                        categoria={p?.categoria?.nombre}
                        marca={p?.marca?.nombre}
                        precio={p?.precio}
                        titulo={p?.nombre}
                        stock={p?.stock}
                        referencia={`${p?.referencia_producto?.color} | ${p?.referencia_producto?.tamano}`}
                    ></ProductCard>
                )
            })}
        </div>
    )
}

export default ProductsCards