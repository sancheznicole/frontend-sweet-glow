import { useAuth } from "../contexts/AuthContext"

const HomePage = () => {
  const {user} = useAuth()

  return (
    <div className='page-container'>
      <p></p>
    </div>
  )
}

export default HomePage