import React from 'react'
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className='page-container'>
      <section className='section-login' >
        <div>
          <h1>INICIAR SESION</h1>
        </div>

        <form action="" method="post">
          <div>
            <label htmlFor="">correo electrónico</label>
            <input type="email" placeholder='correo electrónico' />
          </div>
          <div>
            <label htmlFor="">contraseña</label>
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
          <div>
            <p>¿aún no tienes una cuenta?</p>
          </div>
          <div>
            <Link to={"/register"}>
            crear cuenta
            </Link>
          </div>
        </form>
      </section>

    </div>
  )
}

export default LoginPage