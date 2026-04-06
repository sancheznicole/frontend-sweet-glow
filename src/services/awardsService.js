import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export async function getAllAwards(page = 1, limit = 5, search = "") {
    try {
        const res = await axios.get(`${API_URL}/premios?page=${page}&limit=${limit}&search=${search}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true, awards: res?.data }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getAward(id) {
    try {
        const res = await axios.get(`${API_URL}/premios/${id}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true, award: res?.data }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function createAward(id_producto) {
    try {
        const payload = { id_producto }
        const res = await axios.post(`${API_URL}/premios`, payload)
        if (res?.status !== 201) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function updateAward(id, id_producto) {
    try {
        const payload = { id_producto }
        const res = await axios.put(`${API_URL}/premios/${id}`, payload)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function deleteAward(id) {
    try {
        const res = await axios.delete(`${API_URL}/premios/${id}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}