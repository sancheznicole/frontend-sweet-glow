import { Link } from "react-router-dom"

const AdminIndex = () => {
    return (
        <div>
            <Link to={"/admin/roles"}>Administrar roles</Link>
        </div>
    )
}

export default AdminIndex