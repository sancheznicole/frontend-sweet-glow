import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

const getHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
})

// Listar todas las inscripciones
export const getAllGiftRegistrations = async (page = 1, limit = 10, search = "") => {
    try {
        const res = await axios.get(`${API_URL}/gift_registrations?page=${page}&limit=${limit}&search=${search}`, {
            headers: getHeaders()
        })
        console.log("getAllGiftRegistrations raw:", res.data)

        const lista = Array.isArray(res.data) ? res.data : res.data?.data ?? []
        const last_page = res.data?.last_page ?? 1

        return { valid: true, inscripciones: lista, last_page }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Obtener una inscripción
export const getGiftRegistration = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/gift_registrations/${id}`, {
            headers: getHeaders()
        })
        return { valid: true, inscripcion: res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Crear inscripción
export const createGiftRegistration = async (id_usuario, id_factura_pedido) => {
    try {
        const res = await axios.post(`${API_URL}/gift_registrations`, {
            id_usuario,
            id_factura_pedido
        }, { headers: getHeaders() })
        return { valid: true, inscripcion: res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Actualizar inscripción (solo estado)
export const updateGiftRegistration = async (id, estado) => {
    try {
        const res = await axios.put(`${API_URL}/gift_registrations/${id}`, {
            estado
        }, { headers: getHeaders() })
        return { valid: true, inscripcion: res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Eliminar inscripción
export const deleteGiftRegistration = async (id) => {
    try {
        const res = await axios.delete(`${API_URL}/gift_registrations/${id}`, {
            headers: getHeaders()
        })
        return { valid: true, data: res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Búsqueda de usuarios
export const buscarUsuariosInscripcion = async (query) => {
    try {
        const res = await axios.get(`${API_URL}/users?limit=1000`, {
            headers: getHeaders()
        })
        let lista = Array.isArray(res.data) ? res.data
            : Array.isArray(res.data?.data) ? res.data.data
            : Array.isArray(res.data?.users?.data) ? res.data.users.data
            : []

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

// Obtener facturas del usuario — usa el endpoint dedicado que filtra por id_usuario
export const getAllFacturas = async (id_usuario) => {
    try {
        const res = await axios.get(`${API_URL}/gift_registrations/invoices-by-user/${id_usuario}`, {
            headers: getHeaders()
        })
        const lista = Array.isArray(res.data) ? res.data : res.data?.data ?? []
        return { valid: true, facturas: lista }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}
