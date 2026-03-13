import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllReferencias(page, limit) {
    try {
        const res = await axios.get(`${API_URL}/product_references?page=${page}&limit=${limit}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, referencia: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getReferencia(id_referencia) {
    try {
        const res = await axios.get(`${API_URL}/product_references/${id_referencia}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, referencia: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function CreateReferencia(codigo, color, tamaño) {
    try {
        const payload = { codigo, color, tamaño }

        const res = await axios.post(`${API_URL}/product_references`, payload)

        if(res?.status != 201){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 

    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function updateReferencia(id_referencia, codigo, color, tamaño) {
    try {
        const datos = {}

        if (codigo) datos.codigo = codigo
        if (color) datos.color = color
        if (tamaño) datos.tamaño = tamaño

        const res = await axios.put(`${API_URL}/product_references/${id_referencia}`, datos)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function deleteReferencia(id_referencia) {
    try {
        const res = await axios.delete(`${API_URL}/product_references/${id_referencia}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}