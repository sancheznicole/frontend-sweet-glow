import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllPremiados(page, limit) {
    try {
        const res = await axios.get(`${API_URL}/premiados?page=${page}&limit=${limit}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, premiado: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getPremiado(id_rol) {
    try {
        const res = await axios.get(`${API_URL}/premiados/${id_rol}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, premiado: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function createPremiado(id_premio, id_usuario, id_inscripcion) {
    try {
        const payload = { id_premio, id_usuario, id_inscripcion }

        const res = await axios.post(`${API_URL}/premiados`, payload)

        if(res?.status != 201){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 

    catch (error) {
        return { valid: false, error: error?.message }
    }
    
}

export async function updatePremiado(id_premiado, id_premio, id_usuario, id_inscripcion) {
     try {
        const datos = {}

        if (id_premio) datos.id_premio = id_premio
        if (id_usuario) datos.id_usuario = id_usuario
        if (id_inscripcion) datos.id_inscripcion = id_inscripcion

        const res = await axios.put(`${API_URL}/premiados/${id_premiado}`, datos)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function deletePremiado(id_premiado) {
    try {
        const res = await axios.delete(`${API_URL}/premiados/${id_premiado}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
    
}