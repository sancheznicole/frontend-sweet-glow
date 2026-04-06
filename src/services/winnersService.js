import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export async function getAllWinners(page = 1, limit = 5, search = "") {
    try {
        const res = await axios.get(`${API_URL}/premiados?page=${page}&limit=${limit}&search=${search}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true, winners: res?.data }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getWinner(id) {
    try {
        const res = await axios.get(`${API_URL}/premiados/${id}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true, winner: res?.data }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function createWinner(id_premio, id_usuario, id_inscripcion) {
    try {
        const payload = { id_premio, id_usuario, id_inscripcion }
        const res = await axios.post(`${API_URL}/premiados`, payload)
        if (res?.status !== 201) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function updateWinner(id, id_premio, id_usuario, id_inscripcion) {
    try {
        const payload = { id_premio, id_usuario, id_inscripcion }
        const res = await axios.put(`${API_URL}/premiados/${id}`, payload)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function deleteWinner(id) {
    try {
        const res = await axios.delete(`${API_URL}/premiados/${id}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}