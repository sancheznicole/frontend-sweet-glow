import axios from "axios";

//lo ultimo que se ejecuta en nustro codigo 
//creación de variable y recibimos la variable de entorno 
const API_URL = import.meta.env.VITE_API_URL;

//función asincrona exportable 
//función para el registro
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
        const res = await axios.post(`${API_URL}/auth/register`, payload)

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

//funcion para el inicio de sesión

export async function loginUser(correo, contrasena){
    try{
        const payload = {
            correo, contrasena
        }

        const res = await axios.post(`${API_URL}/auth/login`, payload)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true, token: res?.data }

    }catch(error){
        return { valid: false, error: error?.message || "Error al iniciar sesión" }
    }  
}

//función para recibir los datos del usuario del backend 
export async function getUserData(token) {
    try{
        const res = await axios.post(`${API_URL}/auth/me`, {}, {
            headers: {Authorization: `Bearer ${token}`}
        })

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true, user: res?.data }

    }catch(error){
        return { valid: false, error: error?.message || "Error al traer información del usuario" }
    }  
}

// _______________________________________________________________________________


// funcion para sacar todos los usuarios
// función para sacar un usuario
// funcion para crear un usuario
//funcion para usar en update del usuario
// funcion para eliminar un usuario

export async function getAllUsers(page, limit) {
    try {
        const res = await axios.get(`${API_URL}/users?page=${page}&limit=${limit}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, users: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getUser(id_usuario) {
    try {
        const res = await axios.get(`${API_URL}/users/${id_usuario}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, user: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function createUser(nombres, apellidos, tipo_documento, num_documento,
    telefono, direccion, correo, contrasena, id_rol = "2") {
    try {
        const payload = { nombres, apellidos, tipo_documento, num_documento,
        telefono, direccion, correo, contrasena, id_rol }

        const res = await axios.post(`${API_URL}/users`, payload)

        if(res?.status != 201){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 

    catch (error) {
        return { valid: false, error: error?.message }
    }
    
}

export async function userUpdate(
    nombres, apellidos, correo, telefono, direccion, id_usuario, id_rol = "2"
) {
    //try para manejo de errores, lo que esta adentro del try es lo q vamos a intentar ejecutar
    //cuando falla el try intenta lo del catch  
    try {
        //json que vamos a enviar
        const datos = {}

        if (nombres) datos.nombres = nombres
        if (apellidos) datos.apellidos = apellidos
        if (telefono) datos.telefono = telefono
        if (direccion) datos.direccion = direccion
        if (correo) datos.correo = correo
        if (id_rol) datos.id_rol = id_rol

        const res = await axios.put(`${API_URL}/users/${id_usuario}`, datos)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function deleteUser(id_usuario) {
    try {
        const res = await axios.delete(`${API_URL}/users/${id_usuario}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
  
}
