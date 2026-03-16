import { Link } from "react-router-dom"

const AdminIndex = () => {
    return (
        <div className='page-container'> 
            <section className='section-links-admin'>
                <h1 className="titulo-por-h1">Centro de administración</h1>
                
                <div className="links-administración">
                    <div>
                        <Link to={"/admin/roles"}>Administrar roles</Link>
                    </div>

                    <div>
                        <Link to={"/admin/users"}>Administrar usuarios</Link>
                    </div>

                    <div>
                        <Link to={"/admin/categories"}>Administrar categorias</Link>
                    </div>

                    <div>
                        <Link to={"/admin/brands"}>Administrar marcas</Link>
                    </div>

                    <div>
                        <Link to={"/admin/referenciaProductos"}>Administrar referencia productos</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar guia regalos</Link>
                    </div>

                    <div>
                        <Link to={"/admin/products"}>Administrar productos</Link>
                    </div>

                    <div>
                        <Link to={"/admin/imagenes"}>Administrar imagenes</Link>
                    </div>

                    <div>
                        <Link to={"/admin/gift-cards"}>Administrar tarjetas regalo</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar factura pedidos</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar carritos</Link>
                    </div>

                    <div>
                        <Link to={"/admin/gift_registrations"}>Administrar inscripciones regalo</Link>
                    </div>

                    <div>
                        <Link to={"/admin/premios"}>Administrar premios</Link>
                    </div>

                    <div>
                        <Link to={"/admin/premiados"}>Administrar premiados</Link>
                    </div>

                    <div>
                        <Link to={"/admin/reviews"}>Administrar reseñas</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminIndex