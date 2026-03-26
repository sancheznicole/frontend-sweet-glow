import { Link } from "react-router-dom"
import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  
  const [tipoDocumento,  setTipoDocumento] = useState('')
  const [numeroDocumento,  setNumeroDocumento] = useState('')
  const [nombres,  setNombres] = useState('')
  const [apellidos,  setApellidos] = useState('')
  const [telefono,  setTelefono] = useState('')
  const [direccion,  setDireccion] = useState('')
  const [correo,  setCorreo] = useState('')
  const [contrasena,  setContrasena] = useState('')
  const [terms,  setTerms] = useState(false)

  function validateFields(){
    const errors = {};

    if (!tipoDocumento) {
      errors.tipoDocumento = "Seleccione un tipo de documento";
    }

    const docRegex = /^[0-9]{6,12}$/;
    if (!docRegex.test(numeroDocumento)) {
      errors.numeroDocumento = "El número de documento debe tener entre 6 y 12 dígitos";
    }

    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
    if (!nameRegex.test(nombres)) {
      errors.nombres = "El nombre solo debe contener letras y espacios";
    }

    if (!nameRegex.test(apellidos)) {
      errors.apellidos = "El apellido solo debe contener letras y espacios";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(telefono)) {
      errors.telefono = "El teléfono debe tener 10 dígitos";
    }

    if (direccion.trim().length < 5) {
      errors.direccion = "La dirección no es válida";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      errors.correo = "El correo electrónico no es válido";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(contrasena)) {
      errors.contrasena =
        "La contraseña debe tener mínimo 6 caracteres, una mayúscula y un número";
    }

    if (!terms) {
      errors.terms = "Debes aceptar los términos y condiciones";
    }

    setFieldErrors(errors)
    return Object.keys(errors).length > 0
  }

  async function sendData(e){
    try {
      e.preventDefault();

      const validation = validateFields();
      setLoading(true)
      if(validation) return

      const res = await registerUser(
        nombres, apellidos, tipoDocumento, numeroDocumento, telefono, direccion, correo, contrasena
      )

      if(!res.valid){
        setError(res.error)
        return
      }

      navigate("/login");
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='page-container'>

      <section className='section-register'>
        <form onSubmit={(e) => sendData(e)}>

          <div className="titulo-registro">
            <h1 className="titulo-por-h1">CREAR UNA CUENTA</h1>
          </div>

          {/* CAMBIÓ */}
          <div className={tipoDocumento ? "filled" : ""}>
            <select 
              name="tipo_documento"
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
            >
              <option value=""></option>
              <option value="CC">Cédula de ciudadanía</option>
              <option value="CE">Cédula de extranjería</option>
              <option value="TI">Tarjeta de identidad</option>
              <option value="PP">Pasaporte</option>
            </select>
            <label>Seleccione tipo documento</label>
            {fieldErrors?.tipoDocumento && <p className="form-input-error-register">{fieldErrors?.tipoDocumento}</p>}
          </div>

          <div>
            <input type="text" placeholder=" " onChange={(e) => setNumeroDocumento(e.target.value)} />
            <label>numero de documento</label>
            {fieldErrors?.numeroDocumento && <p className="form-input-error-register">{fieldErrors?.numeroDocumento}</p>}
          </div>

          <div>
            <input type="text" placeholder=" " onChange={(e) => setNombres(e.target.value)} />
            <label>nombres</label>
            {fieldErrors?.nombres && <p className="form-input-error-register">{fieldErrors?.nombres}</p>}
          </div>

          <div>
            <input type="text" placeholder=" " onChange={(e) => setApellidos(e.target.value)} />
            <label>apellidos</label>
            {fieldErrors?.apellidos && <p className="form-input-error-register">{fieldErrors?.apellidos}</p>}
          </div>

          <div>
            <input type="text" placeholder=" " onChange={(e) => setCorreo(e.target.value)} />
            <label>correo electrónico</label>
            {fieldErrors?.correo && <p className="form-input-error-register">{fieldErrors?.correo}</p>}
          </div>

          <div>
            <input type="password" placeholder=" " onChange={(e) => setContrasena(e.target.value)} />
            <label>contraseña</label>
            {fieldErrors?.contrasena && <p className="form-input-error-register">{fieldErrors?.contrasena}</p>}
          </div>

          <div>
            <input type="text" placeholder=" " onChange={(e) => setTelefono(e.target.value)} />
            <label>telefono</label>
            {fieldErrors?.telefono && <p className="form-input-error-register">{fieldErrors?.telefono}</p>}
          </div>

          <div>
            <input type="text" placeholder=" " onChange={(e) => setDireccion(e.target.value)} />
            <label>dirección</label>
            {fieldErrors?.direccion && <p className="form-input-error-register">{fieldErrors?.direccion}</p>}
          </div>

          <div>
            <p>
              <input 
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)} 
              />
              Acepto los{" "}
              <Link to={"/terms"}>términos</Link> y{" "}
              <Link to={"/privacy-policies"}>políticas de privacidad</Link>
            </p>
            {fieldErrors?.terms && <p className="form-input-error-register">{fieldErrors?.terms}</p>}
          </div>

          {
            typeof error !== "string"
              ? Object.entries(error).map(([field, messages]) =>
                  messages.map((message, index) => (
                    <p key={`${field}-${index}`} className="form-input-error-register">
                      {message}
                    </p>
                  ))
                )
              : error !== "" && <p className="form-input-error-register">{error}</p>
          }

          <div>
            <input type="submit" value={loading ? 'Cargando...' : 'Crear cuenta'} disabled={loading} />
          </div>

          <div className="form-login">
            <p>¿ya tienes una cuenta?</p>
            <Link to={"/login"}>iniciar sesión</Link>
          </div>

        </form>
      </section>
    </div>
  )
}

export default RegisterPage