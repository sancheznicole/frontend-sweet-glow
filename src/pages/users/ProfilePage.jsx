import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { userUpdate } from '../../services/authService';

const ProfilePage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const navigate = useNavigate()
  const { user, logout, setUser } = useAuth()

  const [nombres,  setNombres] = useState('')
  const [apellidos,  setApellidos] = useState('')
  const [telefono,  setTelefono] = useState('')
  const [direccion,  setDireccion] = useState('')
  const [correo,  setCorreo] = useState('')

  const [mostrarDatos,  setMostrarDatos] = useState(false)   

  function validateFields(){
    const errors = {};

    // Nombres
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
    if (nombres != '' && !nameRegex.test(nombres)) {
      errors.nombres = "El nombre solo debe contener letras y espacios";
    }

    // Apellidos
    if (apellidos != '' && !nameRegex.test(apellidos)) {
      errors.apellidos = "El apellido solo debe contener letras y espacios";
    }

    // Teléfono
    const phoneRegex = /^[0-9]{10}$/;
    if (telefono != '' && !phoneRegex.test(telefono)) {
      errors.telefono = "El teléfono debe tener 10 dígitos";
    }

    // Dirección
    if (direccion != "" && direccion.trim().length < 5) {
      errors.direccion = "La dirección no es válida";
    }

    // Correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo != '' && !emailRegex.test(correo)) {
      errors.correo = "El correo electrónico no es válido";
    }

    setFieldErrors(errors)
    return Object.keys(errors).length > 0
  }

  // enviar formulario
  async function sendData(e){
    try {
      e.preventDefault();
      
      setLoading(true)
      
      const validation = validateFields();
      
      if(validation) return

      const res = await userUpdate(nombres, apellidos, correo, telefono, direccion, user?.id_usuario)

      if(!res.valid){
        setError(res.error)
        return
      }

      setMostrarDatos(false)
      setUser(prevUser => ({
        ...prevUser,
        ...(nombres !== "" && { nombres }),
        ...(apellidos !== "" && { apellidos }),
        ...(telefono !== "" && { telefono }),
        ...(direccion !== "" && { direccion }),
        ...(correo !== "" && { correo })
      }))
    } 

    catch (error) {
      setError(error.message)
    } 

    finally {
      setLoading(false)
    }
  }

  return (
    <div className='page-container'>
        <section className='section-profile div-profile'>
          <div>
            <h1 className="titulo-por-h1">
              {mostrarDatos ? "EDITA TU PERFIL" : `HOLA ${user.nombres.toUpperCase()}`}
            </h1>
          </div>
  
          {mostrarDatos ? (
          <form action="" method="put" onSubmit={(e) => {sendData(e)}}>

            <div>
              <label htmlFor="">nombres</label>
              <input type="text" placeholder=" " onChange={(e) => {setNombres(e.target.value)}} defaultValue={user?.nombres || ''} />
              {fieldErrors?.nombres && <p className="form-input-error-profile">{fieldErrors?.nombres}</p>}
            </div>

            <div>
              <label htmlFor="">apellidos</label>
              <input type="text" placeholder=" " onChange={(e) => {setApellidos(e.target.value)}} defaultValue={user?.apellidos || ''}/>
              {fieldErrors?.apellidos && <p className="form-input-error-profile">{fieldErrors?.apellidos}</p>}
            </div>

            <div>
              <label htmlFor="">correo electrónico</label>
              <input type="text" placeholder=" " onChange={(e) => {setCorreo(e.target.value)}} defaultValue={user?.correo || ''}/>
              {fieldErrors?.correo && <p className="form-input-error-profile">{fieldErrors?.correo}</p>}
            </div>

            <div>
              <label htmlFor="">telefono</label>
              <input type="text" placeholder=" " onChange={(e) => {setTelefono(e.target.value)}} defaultValue={user?.telefono || ''}/>
              {fieldErrors?.telefono && <p className="form-input-error-profile">{fieldErrors?.telefono}</p>}
            </div>

            <div>
              <label htmlFor="">dirección</label>
              <input type="text" placeholder=" " onChange={(e) => {setDireccion(e.target.value)}} defaultValue={user?.direccion || ''}/>
              {fieldErrors?.direccion && <p className="form-input-error-profile">{fieldErrors?.direccion}</p>}
            </div>

            {/* error al enviar el formulario */}
            {
              typeof error !== "string"
                ? Object.entries(error).map(([field, messages]) =>
                    messages.map((message, index) => (
                      <p key={`${field}-${index}`} className="form-input-error-profile">
                        {message}
                      </p>
                    ))
                  )
                : error !== "" && <p className="form-input-error-profile">{error}</p>
            }
            
            <div>
              <input type="submit" value={loading ? 'Cargando...' : 'Guardar cambios'} disabled={loading} />
            </div>
        </form>
          ) : (
            <div className='contenedor-mostrar-datos'>
              <div className='profile-no-uptade'>
                <strong><p>{user?.nombres} {user?.apellidos}</p></strong>
                <p>{user?.tipo_documento}</p> 
                <p>{user?.num_documento}</p>
                <p>{user?.correo}</p>
                <p>{user?.telefono}</p>
                <p>{user?.direccion}</p>
              </div>
            </div>
          )}
          
          
          <button className={mostrarDatos ? "cancelar-profile" : "modificar-profile"} onClick={() => {setMostrarDatos(!mostrarDatos)}}> {mostrarDatos ? "Cancelar" : "Modificar"} </button>
          <Link onClick={() => {logout(); navigate("/")}}>cerrar sesion</Link> 
          
        </section>
    </div>
  )
}

export default ProfilePage