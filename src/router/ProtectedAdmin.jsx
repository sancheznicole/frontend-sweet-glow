import { useAuth } from "../contexts/AuthContext"
import { Navigate  } from "react-router-dom"

const ProtectedAdmin = ({children}) => {
    const { isAuthenticated, user } = useAuth()

    if (!isAuthenticated || user?.id_rol !== 1) {
        return <Navigate to="/login" replace />
    }

  return children
}

export default ProtectedAdmin