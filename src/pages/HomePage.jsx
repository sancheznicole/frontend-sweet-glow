import { useAuth } from "../contexts/AuthContext"

const HomePage = () => {
  const {user} = useAuth()

  return (
    <div className='page-container'>
      Hola ¡{user?.nombres}!
    </div>
  )
}

export default HomePage