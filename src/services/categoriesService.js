import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
})

export async function getAllCategories(page = 1, limit = 10) {
    try {
        const res = await axios.get(`${API_URL}/categories?page=${page}&limit=${limit}`, {
            headers: getHeaders()
        })
        const lista = Array.isArray(res.data) ? res.data : res.data?.data ?? []
        const last_page = res.data?.last_page ?? 1
        return { valid: true, categories: lista, last_page }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

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

export async function getProductosByCategoria(id_categoria, id_marca = null, orden = 'nombre_asc') {
    try {
        let url = `${API_URL}/products?id_categoria=${id_categoria}&orden=${orden}&limit=100`
        if (id_marca) url += `&id_marca=${id_marca}`

        const res = await axios.get(url, { headers: getHeaders() })
        const lista = Array.isArray(res.data) ? res.data : res.data?.data ?? []
        return { valid: true, productos: lista }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

export async function getMarcasByCategoria(id_categoria) {
    try {
        const res = await axios.get(`${API_URL}/products?id_categoria=${id_categoria}&limit=100`, {
            headers: getHeaders()
        })
        const lista = Array.isArray(res.data) ? res.data : res.data?.data ?? []
        const marcasMap = {}
        lista.forEach(p => {
            if (p.marca) marcasMap[p.marca.id_marca] = p.marca
        })
        return { valid: true, marcas: Object.values(marcasMap) }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}