import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllRoles(page, limit) {
    try {
        const res = await axios.get(`${API_URL}/roles?page=${page}&limit=${limit}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, roles: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getRole(id_rol) {
    try {
        const res = await axios.get(`${API_URL}/roles/${id_rol}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, rol: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function createRol(nombre) {
    try {
        const payload = { nombre }

        const res = await axios.post(`${API_URL}/roles`, payload)

        if(res?.status != 201){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 

    catch (error) {
        return { valid: false, error: error?.message }
    }
    
}

export async function updateRole(id_rol, nombre) {
     try {
        const datos = {}

        if (nombre) datos.nombre = nombre

        const res = await axios.put(`${API_URL}/roles/${id_rol}`, datos)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function deleteRole(id_rol) {
    try {
        const res = await axios.delete(`${API_URL}/roles/${id_rol}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
    
}