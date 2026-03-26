import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export async function getAllReferenceProducts(page = 1) {
    try {
        const res = await axios.get(`${API_URL}/product_references?page=${page}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true, references: res?.data }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getReferenceProduct(id) {
    try {
        const res = await axios.get(`${API_URL}/product_references/${id}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true, reference: res?.data }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function createReferenceProduct(codigo, color, tamano) {
    try {
        const payload = { codigo, color, tamano }
        const res = await axios.post(`${API_URL}/product_references`, payload)
        if (res?.status !== 201) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function updateReferenceProduct(id, codigo, color, tamano) {
    try {
        const payload = { codigo, color, tamano }
        const res = await axios.put(`${API_URL}/product_references/${id}`, payload)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function deleteReferenceProduct(id) {
    try {
        const res = await axios.delete(`${API_URL}/product_references/${id}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}