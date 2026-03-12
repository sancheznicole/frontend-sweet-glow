import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// --------------------------------------------
// TRAER TODAS LAS CATEGORIAS
// --------------------------------------------
export async function getAllCategories(page, limit) {
    try {

        const res = await axios.get(`${API_URL}/categories?page=${page}&limit=${limit}`)

        if(res?.status != 200){
            return { valid:false, error: res.data?.errors }
        }

        return { valid:true, categories: res?.data }

    } catch(error){

        return { valid:false, error:error?.message }

    }
}

// --------------------------------------------
// TRAER UNA CATEGORIA
// --------------------------------------------
export async function getCategory(id_categoria){
    try {

        const res = await axios.get(`${API_URL}/categories/${id_categoria}`)

        if(res?.status != 200){
            return { valid:false, error: res.data?.errors }
        }

        return { valid:true, category: res?.data }

    } catch(error){

        return { valid:false, error:error?.message }

    }
}

// --------------------------------------------
// CREAR CATEGORIA
// --------------------------------------------
export async function createCategory(nombre){

    try {

        const payload = { nombre }

        const res = await axios.post(`${API_URL}/categories`, payload)

        if(res?.status != 201){
            return { valid:false, error: res.data?.errors }
        }

        return { valid:true }

    } catch(error){

        return { valid:false, error:error?.message }

    }

}

// --------------------------------------------
// ACTUALIZAR CATEGORIA
// --------------------------------------------
export async function updateCategory(id_categoria, nombre){

    try {

        const data = {}

        if(nombre) data.nombre = nombre

        const res = await axios.put(`${API_URL}/categories/${id_categoria}`, data)

        if(res?.status != 200){
            return { valid:false, error: res.data?.errors }
        }

        return { valid:true }

    } catch(error){

        return { valid:false, error:error?.message }

    }

}

// --------------------------------------------
// ELIMINAR CATEGORIA
// --------------------------------------------
export async function deleteCategory(id_categoria){

    try {

        const res = await axios.delete(`${API_URL}/categories/${id_categoria}`)

        if(res?.status != 200){
            return { valid:false, error: res.data?.errors }
        }

        return { valid:true }

    } catch(error){

        return { valid:false, error:error?.message }

    }

}