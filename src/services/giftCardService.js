import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
})

// Listar todas las tarjetas
export const getAllGiftCards = async (page = 1, limit = 10) => {
    try {
        const res = await axios.get(`${API_URL}/gift_cards?page=${page}&limit=${limit}`, {
            headers: getHeaders()
        })
        console.log("getAllGiftCards raw:", res.data)
        // El backend devuelve array plano (sin paginar) — normalizamos
        const lista = Array.isArray(res.data) ? res.data : res.data?.data ?? []
        const last_page = res.data?.last_page ?? 1
        return { valid: true, tarjetas: lista, last_page }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Obtener una tarjeta
export const getGiftCard = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/gift_cards/${id}`, {
            headers: getHeaders()
        })
        return { valid: true, tarjeta: res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Crear tarjeta
export const createGiftCard = async (monto, fecha_expiracion, id_usuario) => {
    try {
        const res = await axios.post(`${API_URL}/gift_cards`, {
            monto,
            fecha_expiracion,
            id_usuario
        }, { headers: getHeaders() })
        return { valid: true, tarjeta: res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Actualizar tarjeta (monto, fecha_expiracion, estado)
export const updateGiftCard = async (id, monto, fecha_expiracion, estado) => {
    try {
        const res = await axios.put(`${API_URL}/gift_cards/${id}`, {
            monto,
            fecha_expiracion,
            estado
        }, { headers: getHeaders() })
        return { valid: true, tarjeta: res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Eliminar tarjeta
export const deleteGiftCard = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/gift_cards/${id}`, {
            headers: getHeaders()
        })
        return { valid: true, data: res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Búsqueda de usuarios (reutilizamos el mismo endpoint que reviews)
export const buscarUsuariosGiftCard = async (query) => {
    try {
        const res = await axios.get(`${API_URL}/users?search=${encodeURIComponent(query)}&limit=10`, {
            headers: getHeaders()
        })
        let lista = []
        if (Array.isArray(res.data))             lista = res.data
        else if (Array.isArray(res.data?.data))  lista = res.data.data
        else if (Array.isArray(res.data?.users)) lista = res.data.users
        else if (Array.isArray(res.data?.users?.data)) lista = res.data.users.data

        // Fallback: filtrar en frontend
        if (query) {
            const q = query.toLowerCase()
            lista = lista.filter(u =>
                u.nombres?.toLowerCase().includes(q) ||
                u.apellidos?.toLowerCase().includes(q) ||
                u.correo?.toLowerCase().includes(q)
            )
        }
        return { valid: true, usuarios: lista }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}