import { useAuth } from "../contexts/AuthContext"
import { Navigate  } from "react-router-dom"
import Loader from "../components/Loader"

const ProtectedAdmin = ({children}) => {
    const { isAuthenticated, user, loadingUser } = useAuth()

    if(loadingUser){
        return (
          <Loader />
        )
    }

    if (!isAuthenticated || user?.id_rol !== 1) {
        return <Navigate to="/login" replace />
    }

  return children
}

export default ProtectedAdmin