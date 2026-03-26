import { useAuth } from "../contexts/AuthContext"
import ProductsCards from "../components/ProductsCards"

const HomePage = () => {
  const {user} = useAuth()

  return (
    <div className='page-container'>
                              <ProductsCards 
                        ></ProductsCards>
    </div>
  )
}

export default HomePage