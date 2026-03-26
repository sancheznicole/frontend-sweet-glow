import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export async function getAllGiftGuides(page = 1) {
    try {
        const res = await axios.get(`${API_URL}/gift_guide?page=${page}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true, giftGuides: res?.data }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getGiftGuide(id) {
    try {
        const res = await axios.get(`${API_URL}/gift_guide/${id}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true, giftGuide: res?.data }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function createGiftGuide(nombre, descripcion) {
    try {
        const payload = { nombre, descripcion }
        const res = await axios.post(`${API_URL}/gift_guide`, payload)
        if (res?.status !== 201) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function updateGiftGuide(id, nombre, descripcion) {
    try {
        const payload = { nombre, descripcion }
        const res = await axios.put(`${API_URL}/gift_guide/${id}`, payload)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function deleteGiftGuide(id) {
    try {
        const res = await axios.delete(`${API_URL}/gift_guide/${id}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}