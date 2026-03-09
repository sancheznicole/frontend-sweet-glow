import { Link } from "react-router-dom"
import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

//funcion de flecha
const RegisterPage = () => {

  // configuracion de la página
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  //error del back
  const [error, setError] = useState('')
  //error del front 
  const [fieldErrors, setFieldErrors] = useState({})
  
  // primero nombremos las variables 
  // useState para una variable de estado 
  //(variable y funcion) y la funcion modifica la variable 
  const [tipoDocumento,  setTipoDocumento] = useState('')
  const [numeroDocumento,  setNumeroDocumento] = useState('')
  const [nombres,  setNombres] = useState('')
  const [apellidos,  setApellidos] = useState('')
  const [telefono,  setTelefono] = useState('')
  const [direccion,  setDireccion] = useState('')
  const [correo,  setCorreo] = useState('')
  const [contrasena,  setContrasena] = useState('')
  const [terms,  setTerms] = useState(false)

  // válidar campos
  function validateFields(){
    const errors = {};

    // Tipo documento
    if (!tipoDocumento) {
      errors.tipoDocumento = "Seleccione un tipo de documento";
    }

    // Número documento
    const docRegex = /^[0-9]{6,12}$/;
    if (!docRegex.test(numeroDocumento)) {
      errors.numeroDocumento = "El número de documento debe tener entre 6 y 12 dígitos";
    }

    // Nombres
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
    if (!nameRegex.test(nombres)) {
      errors.nombres = "El nombre solo debe contener letras y espacios";
    }

    // Apellidos
    if (!nameRegex.test(apellidos)) {
      errors.apellidos = "El apellido solo debe contener letras y espacios";
    }

    // Teléfono
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(telefono)) {
      errors.telefono = "El teléfono debe tener 10 dígitos";
    }

    // Dirección
    if (direccion.trim().length < 5) {
      errors.direccion = "La dirección no es válida";
    }

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

    // Términos
    if (!terms) {
      errors.terms = "Debes aceptar los términos y condiciones";
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
      const res = await registerUser(nombres, apellidos, tipoDocumento, numeroDocumento, telefono, direccion, correo, contrasena)

      //si no es respuesta valida no manda la ejecucion y corta la ejecución
      if(!res.valid){
        setError(res.error)
        return
      }

      //si es valida redirecciona a la pagina del login
      navigate("/login");
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

      <section className='section-register'>
        <form action="" method="post" onSubmit={(e) => {sendData(e)}}>
          <div className="titulo-registro">
            <h1>CREAR UNA CUENTA</h1>
          </div>

          <div>
              <select name="tipo_documento" id=""  onChange={(e) => {setTipoDocumento(e.target.value)}}>
                <option defaultValue="" disabled selected hidden></option>
                <option defaultValue="cc">Cédula de ciudadanía</option>
                <option defaultValue="pep">Permiso Especial de Permanencia</option>
                <option defaultValue="ce">Cédula de extranjería</option>
                <option defaultValue="p">Pasaporte</option>
              </select>
              <label htmlFor="">Seleccione tipo documento</label>
              {fieldErrors?.tipoDocumento && <p className="form-input-error">{fieldErrors?.tipoDocumento}</p>}
          </div>

          <div>
            <input type="text" placeholder=" " onChange={(e) => {setNumeroDocumento(e.target.value)}} />
            <label htmlFor="">numero de documento</label>
            {fieldErrors?.numeroDocumento && <p className="form-input-error">{fieldErrors?.numeroDocumento}</p>}
          </div>

          <div>
            <input type="text" placeholder=" " onChange={(e) => {setNombres(e.target.value)}} />
            <label htmlFor="">nombres</label>
            {fieldErrors?.nombres && <p className="form-input-error">{fieldErrors?.nombres}</p>}
          </div>

          <div>
            <input type="text" placeholder=" " onChange={(e) => {setApellidos(e.target.value)}} />
            <label htmlFor="">apellidos</label>
            {fieldErrors?.apellidos && <p className="form-input-error">{fieldErrors?.apellidos}</p>}
          </div>

          <div>
            <input type="text" placeholder=" " onChange={(e) => {setCorreo(e.target.value)}} />
            <label htmlFor="">correo electrónico</label>
            {fieldErrors?.correo && <p className="form-input-error">{fieldErrors?.correo}</p>}
          </div>

          <div>
            <input type="password" placeholder=" " onChange={(e) => {setContrasena(e.target.value)}} />
            <label htmlFor="">contraseña</label>
            {fieldErrors?.contrasena && <p className="form-input-error">{fieldErrors?.contrasena}</p>}
          </div>

          <div>
            <input type="text" placeholder=" " onChange={(e) => {setTelefono(e.target.value)}} />
            <label htmlFor="">telefono</label>
            {fieldErrors?.telefono && <p className="form-input-error">{fieldErrors?.telefono}</p>}
          </div>

          <div>
            <input type="text" placeholder=" " onChange={(e) => {setDireccion(e.target.value)}} />
            <label htmlFor="">dirección</label>
            {fieldErrors?.direccion && <p className="form-input-error">{fieldErrors?.direccion}</p>}
          </div>

          <div>
            <p>
              <input type="checkbox"   defaultValue={terms} onChange={(e) => {setTerms(e.target.checked)}} />
                Acepto los{" "}
                  <Link to={"/terms"}>
                    términos   
                  </Link> 
                  {" "}y{" "}
                  <Link to={"/privacy-policies"}>
                    políticas de privacidad
                  </Link>
            </p>
            {fieldErrors?.terms && <p className="form-input-error">{fieldErrors?.terms}</p>}
          </div>

          {/* error al enviar el formulario */}
          {
            typeof error !== "string"
              ? Object.entries(error).map(([field, messages]) =>
                  messages.map((message, index) => (
                    <p key={`${field}-${index}`} className="form-input-error">
                      {message}
                    </p>
                  ))
                )
              : error !== "" && <p className="form-input-error">{error}</p>
          }
          
          <div>
            <input type="submit" value={loading ? 'Cargando...' : 'Crear cuenta'} disabled={loading} />
          </div>

          <div className="form-login">
            <p>
              ¿ya tienes una cuenta?
            </p>
            <Link to={"/login"}>
              iniciar sesión
            </Link>
          </div>
        </form>
      </section>
    </div>
  )
}

export default RegisterPage