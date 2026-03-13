import { useAuth } from "../contexts/AuthContext"
import { Navigate  } from "react-router-dom"

const ProtectedAdmin = ({children}) => {
    const { isAuthenticated, user, loadingUser } = useAuth()

    if(loadingUser){
        return (
          <div className="user-loader">
            <h1>Cargando información...</h1>
            <p>Regalanos unos instantes mientras cargamos la informacion del usuario</p>
          </div>
        )
    }

    if (!isAuthenticated || user?.id_rol !== 1) {
        return <Navigate to="/login" replace />
    }

  return children
}

export default ProtectedAdmin