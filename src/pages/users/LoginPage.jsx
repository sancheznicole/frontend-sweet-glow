import { Link } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// el login del front llama al login del back y de ahi saca el token y lo entrega al front,
// luego el login llama al login del contexto y ya dentro del el login del contexto se llama al me 
const LoginPage = () => {
  const { login } = useAuth()
  // configuracion de la página
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  //error del back
  const [error, setError] = useState('')
  //error del front 
  const [fieldErrors, setFieldErrors] = useState({})

  const [correo,  setCorreo] = useState('')
  const [contrasena,  setContrasena] = useState('')

  function validateFields(){
    const errors = {};

    // Correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      errors.correo = "El correo electrónico no es válido";
    }

    // Contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(contrasena)) {
      errors.contrasena =
      "La contraseña debe tener mínimo 6 caracteres, una mayúscula y un número";
    }

    setFieldErrors(errors)
    return Object.keys(errors).length > 0
  }

   // enviar formulario
  async function sendData(e){
    try {
        
      //evita que se recargue la pagina cuando envian el formulario 
      e.preventDefault();
  
      //para cargar la pagina
      setLoading(true)
        
      //llama la validacion de los campos
      const validation = validateFields();
  
      //resultado de la validacion entonces si hay mas de 0 errores se corta la ejecucion para enviar los datos
      if(validation) return
  
      //llama la funcion del auth services
      const res = await loginUser(correo, contrasena)
  
      //si no es respuesta valida no manda la ejecucion y corta la ejecución
      if(!res.valid){
        setError("Error al inicar sesión")
        return
      }
  
      //si es valida redirecciona a la pagina del login
      const loginResult = login(res?.token)

      if(loginResult){
        navigate("/profile");
      }
    } 
    //si el try no responde ejecuta el catch
    catch (error) {
      setError(error.message)
    } 
      
    //despues del try sin errores se ejecuta el finally y dado caso q sea el catch despues del catch
    finally {
      setLoading(false)
    }
  }

  return (
    <div className='page-container'>
      <section className='section-login' >
        <div>
          <h1 className="titulo-por-h1">INICIAR SESIÓN</h1>
        </div>

        <form action="" method="post" onSubmit={(e) => {sendData(e)}}>
          <div>
            <input type="email" value={correo} placeholder="correo electrónico" onChange={(e) => setCorreo(e.target.value)} />
            {fieldErrors?.correo && <p className="form-input-error">{fieldErrors?.correo}</p>}

            <input type="password" value={contrasena} placeholder="contraseña" onChange={(e) => setContrasena(e.target.value)} />
            {fieldErrors?.contrasena && <p className="form-input-error">{fieldErrors?.contrasena}</p>}
          </div>
          <div className='form-terms'>
              <p>
                Al iniciar sesión, aceptas nuestros{" "}
                <Link to="/terms">términos</Link> y{" "}
                <Link to="/privacy-policies">política de privacidad</Link>
              </p>
          </div>
          {error != '' && <p className="form-input-error">{error}</p>}
          <div>
            <input type="submit" value={loading ? 'Cargando...' : 'Iniciar sesión'} disabled={loading} />
          </div>
          <div className="form-account">
            <p>¿aún no tienes una cuenta?</p>
            <p>
              <Link to={"/register"}>
                crear cuenta
              </Link>
            </p>
          </div>
        </form>
      </section>

    </div>
  )
}

export default LoginPage