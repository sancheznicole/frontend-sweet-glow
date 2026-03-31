import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

// Obtener todas las reseñas paginadas
export const getAllReviews = async (page = 1, limit = 10, search = "") => {
    try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`${API_URL}/reviews?page=${page}&limit=${limit}&search=${search}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log("getAllReviews raw:", res.data)
        return { valid: true, ...res.data }
    } catch (error) {
        console.log("Error getAllReviews:", error?.response?.data || error.message)
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Obtener una reseña por ID
export const getReview = async (id) => {
    try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`${API_URL}/reviews/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return { valid: true, review: res.data?.resena ?? res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Crear reseña
export const createReview = async (resena, id_producto, id_usuario) => {
    try {
        const token = localStorage.getItem("token")
        const res = await axios.post(`${API_URL}/reviews`, {
            resena,
            id_producto,
            id_usuario
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return { valid: true, review: res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Actualizar reseña
export const updateReview = async (id, resena, id_producto, id_usuario) => {
    try {
        const token = localStorage.getItem("token")
        const res = await axios.put(`${API_URL}/reviews/${id}`, {
            resena,
            id_producto,
            id_usuario
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return { valid: true, review: res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Eliminar reseña
export const deleteReview = async (id) => {
    try {
        const token = localStorage.getItem("token")
        const res = await axios.delete(`${API_URL}/reviews/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        return { valid: true, data: res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// search reviews by product id
export const searchReviewsByProductId = async (id) => {
    try {
        const res = await axios.get(`${API_URL}/reviews/product/${id}`)

        if(res?.status != 200){
            return { valid: false, error: res?.data?.errors }
        }

        return { valid: true, data: res.data }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// ── Funciones para el stepper de CreateReview ──────────────────────────────

// Todas las categorías (el endpoint devuelve array plano)
export const getAllCategorias = async () => {
    try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`${API_URL}/categories`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        // El backend devuelve array directo
        const lista = Array.isArray(res.data) ? res.data : res.data?.data ?? []
        return { valid: true, categorias: lista }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Todas las marcas (el endpoint devuelve array plano)
export const getAllMarcas = async () => {
    try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`${API_URL}/brands`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        const lista = Array.isArray(res.data) ? res.data : res.data?.data ?? []
        return { valid: true, marcas: lista }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Todos los productos sin paginar (limit alto) para filtrar en frontend
export const getAllProductosSinPaginar = async () => {
    try {
        const token = localStorage.getItem("token")
        // El endpoint pagina de 5 en 5; pedimos un límite alto para traerlos todos
        const res = await axios.get(`${API_URL}/products?per_page=1000&page=1`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        // Puede venir como { data: [...] } paginado o array directo
        const lista = Array.isArray(res.data)
            ? res.data
            : res.data?.data ?? []
        return { valid: true, productos: lista }
    } catch (error) {
        return { valid: false, error: error?.response?.data?.message || error.message }
    }
}

// Búsqueda de usuarios por nombre/apellido (debounce en el componente)
export const buscarUsuarios = async (query) => {
    try {
        const token = localStorage.getItem("token")
        const res = await axios.get(`${API_URL}/users?search=${encodeURIComponent(query)}&limit=10`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        // Normaliza la respuesta: array plano, paginado Laravel, o { data: [...] }
        let lista = []
        if (Array.isArray(res.data)) {
            lista = res.data
        } else if (Array.isArray(res.data?.data)) {
            lista = res.data.data
        } else if (Array.isArray(res.data?.users)) {
            lista = res.data.users
        } else if (Array.isArray(res.data?.users?.data)) {
            lista = res.data.users.data
        }
        // Filtramos en frontend como fallback si el backend no soporta ?search=
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