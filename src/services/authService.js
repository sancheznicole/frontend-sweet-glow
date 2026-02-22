import axios from "axios";

//lo ultimo que se ejecuta en nustro codigo 

//creación de variable y recibimos la variable de entorno 
const API_URL = import.meta.env.VITE_API_URL;

//funcion asincrona exportable 
export async function registerUser(
    //recibimos los campos, nombrarse tal cual en el backend
    nombres, apellidos, tipo_documento, num_documento,
    telefono, direccion, correo, contrasena, id_rol = "2"
) {
    //try para manejo de errores, lo que esta adentro del try es lo q vamos a intentar ejecutar
    //cuando falla el try intenta lo del catch  
    try {
        //json que vamos a enviar
        const payload = {
            nombres, apellidos, tipo_documento, num_documento, telefono,
            direccion, correo, contrasena, id_rol
        }

        // constante res = axios.post mandamos la petición a la url por metodo post y enviamos el json 
        const res = await axios.post(`${API_URL}/auth/register/`, payload)

        //si resultado es diferente a 201 devulve un error que devuelve el back 
        if(res?.status != 201){
            return { valid: false, error: res.data?.errors }
        }
        
        //y si es una respuesta 201 es respuesta valida
        return { valid: true }

    } 
    
    //si falla el try se ejecuta el catch devolviendo un error 
    catch (error) {
        return { valid: false, error: error?.message }
    }
}