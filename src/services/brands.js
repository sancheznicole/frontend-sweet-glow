import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
})

// Listar todas las marcas
export async function getAllBrands(page = 1, limit = 10, search = "") {
    try {
        const res = await axios.get(`${API_URL}/brands?page=${page}&limit=${limit}&search=${search}`, {
            headers: getHeaders()
        })
        console.log("getAllBrands raw:", res.data)

        const lista = Array.isArray(res.data) ? res.data : res.data?.data ?? []
        const last_page = res.data?.last_page ?? 1

        return { valid: true, brands: lista, last_page }

    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Traer una marca
export async function getBrand(id_marca) {
    try {
        const res = await axios.get(`${API_URL}/brands/${id_marca}`, {
            headers: getHeaders()
        })
        return { valid: true, brand: res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Crear marca
export async function createBrand(nombre, pais_origen) {
    try {
        const res = await axios.post(`${API_URL}/brands`, { nombre, pais_origen }, {
            headers: getHeaders()
        })
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Actualizar marca
export async function updateBrand(id_marca, nombre, pais_origen) {
    try {
        const res = await axios.put(`${API_URL}/brands/${id_marca}`, { nombre, pais_origen }, {
            headers: getHeaders()
        })
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Eliminar marca
export async function deleteBrand(id_marca) {
    try {
        const res = await axios.delete(`${API_URL}/brands/${id_marca}`, {
            headers: getHeaders()
        })
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}