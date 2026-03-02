import { useAuth } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom"

const RestrictedIFAuthenticated = ({children}) => {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Navigate to="/" replace />
    }

  return children
}

export default RestrictedIFAuthenticated