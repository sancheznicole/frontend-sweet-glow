import { Link } from "react-router-dom"

const AdminIndex = () => {
    return (
        <div className='page-container'> 
            <section className='contenedor-links-admin'>
                <div className="link-administrar-roles">
                    <Link to={"/admin/roles"}>Administrar roles</Link>
                </div>

                <div className="link-administrar-usuarios">
                    <Link to={"/admin/users"}>Administrar usuarios</Link>
                </div>

                <div className="link-administrar-categorias">
                    <Link to={"/admin/categories"}>Administrar categorias</Link>
                </div>

                <div className="link-administrar-marcas">
                    <Link to={"/admin/brands"}>Administrar marcas</Link>
                </div>

                <div className="link-administrar-referencia-productos">
                    <Link to={"/admin/brands"}>Administrar referencia productos</Link>
                </div>

                <div className="link-administrar-guia-regalos">
                    <Link to={"/admin/brands"}>Administrar guia regalos</Link>
                </div>

                <div className="link-administrar-productos">
                    <Link to={"/admin/brands"}>Administrar productos</Link>
                </div>
            </section>
        </div>
    )
}

export default AdminIndex