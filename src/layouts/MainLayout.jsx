import { Outlet } from "react-router-dom"
import Menu from "../components/menu"
import Footer from "../components/footer"
import "../App.css"
import { useEffect, useState } from "react"

const MainLayout = () => {
  // const location = useLocation()
  //use state actualiza el dato en tiempo real 
  //variable (isTransparent) guarda el valor que se le pase pór la funcion 
  // funcion para cambiar el valor setIsTransparent (valor inicial)
  const [isTransparent, setIsTransparent] = useState(false)
  const [bgWhite, setBgWhite] = useState(false)
  const [fixed, setFixed] = useState(false)

  //una funcion que recibe otra funcion
  useEffect(() => {
    //creamos otra funcion con una condicion
    const handleScroll = () => {
      //console.log(window.scrollY) revisamos el valor de scrolly

      if(window.scrollY >= 30){
        setIsTransparent(false)
        setFixed(true)
      }else{
        setIsTransparent(true)
        setFixed(false)
      }

      if(window.scrollY >= 70){
        setBgWhite(true)
      }else{
        setBgWhite(false)
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])

    return (
      <>
        <Menu bgWhite={bgWhite} fixed={fixed} isTransparent={isTransparent}></Menu>

        <main className={`outlet-container outlet-container-footer ${fixed ? 'margin-top-for-fixed' : ''}`}>
          <Outlet></Outlet>
        </main>
          
        <Footer></Footer>
      </>
    )
}

export default MainLayout