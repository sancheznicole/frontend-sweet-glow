import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL
const STORAGE_URL = import.meta.env.VITE_STORAGE_URL

export async function getAllImages(page = 1, limit = 5, search = "") {
    try {
        const res = await axios.get(`${API_URL}/images?page=${page}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true, images: res?.data }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getImage(id) {
    try {
        const res = await axios.get(`${API_URL}/images/${id}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true, image: res?.data }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function createImage(file, id_producto) {
    try {
        const formData = new FormData()
        formData.append("filename", file)
        formData.append("id_producto", id_producto)

        const res = await axios.post(`${API_URL}/images`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        if (res?.status !== 201) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function updateImage(id, file, id_producto = null) {
    try {
        const formData = new FormData()
        formData.append("_method", "PUT")
        if (file) formData.append("filename", file)
        if (id_producto) formData.append("id_producto", id_producto)

        const res = await axios.post(`${API_URL}/images/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function deleteImage(id) {
    try {
        const res = await axios.delete(`${API_URL}/images/${id}`)
        if (res?.status !== 200) return { valid: false, error: res.data?.errors }
        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

// create image URl
export function createImageURL(filename){
    return `${STORAGE_URL}/${filename}`
}