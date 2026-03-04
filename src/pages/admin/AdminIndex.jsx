import { Link } from "react-router-dom"

const AdminIndex = () => {
    return (
        <div className='page-container'> 
            <div className="link-panel-administrativo">
                <Link to={"/admin/roles"}>Administrar roles</Link>
            </div>

            <section>

            </section>
        </div>
    )
}

export default AdminIndex