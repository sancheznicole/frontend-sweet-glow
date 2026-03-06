import { Link } from "react-router-dom"

const AdminIndex = () => {
    return (
        <div className='page-container'> 
            <section className='section-links-admin'>
                <h1>Centro de administración</h1>
                
                <div className="links-administración">
                    <div>
                        <Link to={"/admin/roles"}>Administrar roles</Link>
                    </div>

                    <div>
                        <Link to={"/admin/users"}>Administrar usuarios</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar categorias</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar marcas</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar referencia productos</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar guia regalos</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar productos</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar imagenes</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar tarjetas regalo</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar factura pedidos</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar carritos</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar inscripciones regalo</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar premios</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar premiados</Link>
                    </div>

                    <div>
                        <Link to={"/admin/"}>Administrar reseñas</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminIndex