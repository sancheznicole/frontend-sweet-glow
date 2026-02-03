import React from 'react'
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div>

      <section className='section-register page-container'>
        <form action="" method="post">
          <div>
            <h1>CREAR UNA CUENTA</h1>
          </div>
          <div>
            <select name="tipo_documento" id="">
            <option value="">Seleccione tipo de documento</option>
            <option value="cc">Cédula de ciudadanía</option>
            <option value="pep">Permiso Especial de Permanencia</option>
            <option value="ce">Cédula de extranjería</option>
            <option value="p">Pasaporte</option>
            </select>
          </div>
          <div>
            <label htmlFor="">numero de documento</label>
            <input type="text" placeholder='numero de documento' />
          </div>
          <div>
            <label htmlFor="">nombres</label>
            <input type="text" placeholder='nombres' />
          </div>
          <div>
            <label htmlFor="">apellidos</label>
            <input type="text" placeholder='apellidos'/>
          </div>
          <div>
            <label htmlFor="">electrónico</label>
            <input type="text" placeholder='correo electrónico' />
          </div>
          <div>
            <label htmlFor="">contraseña</label>
            <input type="text" placeholder='contraseña' />
          </div>
          <div>
            <label htmlFor="">telefono</label>
            <input type="text" placeholder='telefono' />
          </div>
          <div>
            <label htmlFor="">dirección</label>
            <input type="text" placeholder='dirección '/>
          </div>
          <div>
            <div>
              <label>
                <input type="checkbox" required />
                  Acepto los{" "}
                <Link to={"/terms"}>
                términos   
                </Link> 
                  {" "}y{" "}
                <Link to={"/privacy-policies"}>
                  políticas de privacidad
                </Link>
              </label>
            </div>
          </div>
          <div>
            <button type="submit">
              crear cuenta
            </button>
          </div>
        </form>
        <div>
          <p>
            ¿ya tienes una cuenta?
          </p>
        </div>
        <div>
          <Link to={"/login"}>
          iniciar sesión
          </Link>
        </div>
      </section>



    </div>
  )
}

export default RegisterPage