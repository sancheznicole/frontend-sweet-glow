import React from 'react'
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className='page-container'>
      <section className='section-login' >
        <div>
          <h1>INICIAR SESIÓN</h1>
        </div>

        <form action="" method="post">
          <div>
            <input type="email" placeholder='correo electrónico' />
          
            <input type="password" placeholder='contraseña' />
          </div>
          <div className='form-terms'>
              <p>
                Al iniciar sesión, aceptas nuestros{" "}
                <Link to="/terms">términos</Link> y{" "}
                <Link to="/privacy-policies">política de privacidad</Link>
              </p>
          </div>
          <div>
            <input type="submit" value="Iniciar sesión" />
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