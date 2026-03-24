import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
})

// Listar todas las categorías
export async function getAllCategories(page = 1, limit = 10) {
    try {
        const res = await axios.get(`${API_URL}/categories?page=${page}&limit=${limit}`, {
            headers: getHeaders()
        })
        console.log("getAllCategories raw:", res.data)

        const lista = Array.isArray(res.data) ? res.data : res.data?.data ?? []
        const last_page = res.data?.last_page ?? 1

        return { valid: true, categories: lista, last_page }

    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Traer una categoría
export async function getCategory(id_categoria) {
    try {
        const res = await axios.get(`${API_URL}/categories/${id_categoria}`, {
            headers: getHeaders()
        })
        return { valid: true, category: res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Crear categoría
export async function createCategory(nombre) {
    try {
        const res = await axios.post(`${API_URL}/categories`, { nombre }, {
            headers: getHeaders()
        })
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Actualizar categoría
export async function updateCategory(id_categoria, nombre) {
    try {
        const data = {}
        if (nombre) data.nombre = nombre

        const res = await axios.put(`${API_URL}/categories/${id_categoria}`, data, {
            headers: getHeaders()
        })
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Eliminar categoría
export async function deleteCategory(id_categoria) {
    try {
        const res = await axios.delete(`${API_URL}/categories/${id_categoria}`, {
            headers: getHeaders()
        })
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}