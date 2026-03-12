import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllPremios(page, limit) {
    try {
        const res = await axios.get(`${API_URL}/premio?page=${page}&limit=${limit}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, premio: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getPremio(id_premio) {
    try {
        const res = await axios.get(`${API_URL}/premio/${id_premio}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, premio: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function CreatePremio(id_producto) {
    try {
        const payload = { id_producto }

        const res = await axios.post(`${API_URL}/premio`, payload)

        if(res?.status != 201){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 

    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function updatePremio(id_premio, id_producto) {
    try {
        const datos = {}

        if (id_producto) datos.id_producto = id_producto

        const res = await axios.put(`${API_URL}/premio/${id_premio}`, datos)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function deletePremio(id_premio) {
    try {
        const res = await axios.delete(`${API_URL}/premio/${id_premio}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}