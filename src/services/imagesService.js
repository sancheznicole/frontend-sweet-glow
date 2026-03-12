import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllImagenes(page, limit) {
    try {
        const res = await axios.get(`${API_URL}/imagen?page=${page}&limit=${limit}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, imagen: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getImagen(id_imagen) {
    try {
        const res = await axios.get(`${API_URL}/imagen/${id_imagen}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, imagen: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function CreateImagen(filename, id_producto) {
    try {
        const payload = { filename, id_producto }

        const res = await axios.post(`${API_URL}/imagen`, payload)

        if(res?.status != 201){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 

    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function updateImagen(id_imagen, filename, id_producto) {
    try {
        const datos = {}

        if (filename) datos.filename = filename
        if (id_producto) datos.id_producto = id_producto

        const res = await axios.put(`${API_URL}/imagen/${id_imagen}`, datos)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function deleteImagen(id_imagen) {
    try {
        const res = await axios.delete(`${API_URL}/imagen/${id_imagen}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}