import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllProducts(page = 1, limit = 5, search) {
    try {
        const res = await axios.get(`${API_URL}/products?page=${page}&limit=${limit}&search=${search}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, products: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getProduct(id_producto) {
    try {
        const res = await axios.get(`${API_URL}/products/${id_producto}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, product: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function createProduct( nombre, descripcion, precio, tendencia, descuento, prod_regalo, premio,
    stock, id_categoria, id_marca, id_referencia, id_guia) {

    try {
        const payload = { nombre, descripcion, precio, tendencia, descuento, prod_regalo, premio, stock, id_categoria, id_marca, id_referencia, id_guia}

        const res = await axios.post(`${API_URL}/products`, payload)

        if(res?.status != 201){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 

    catch (error) {
        return { valid: false, error: error?.message }
    }
    
}

export async function updateProduct(id_producto, nombre, descripcion, precio, tendencia, descuento, 
    prod_regalo, premio, stock, id_categoria, id_marca, id_referencia, id_guia) {
     try {
        const datos = {}

        if (nombre) datos.nombre = nombre
        if (descripcion) datos.descripcion = descripcion
        if (precio) datos.precio = precio
        if (tendencia) datos.tendencia = tendencia
        if (descuento) datos.descuento = descuento
        if (prod_regalo) datos.prod_regalo = prod_regalo
        if (premio) datos.premio = premio
        if (stock) datos.stock = stock
        if (id_categoria) datos.id_categoria = id_categoria
        if (id_marca) datos.id_marca = id_marca
        if (id_referencia) datos.id_referencia = id_referencia
        if (id_guia) datos.id_guia = id_guia

        const res = await axios.put(`${API_URL}/products/${id_producto}`, datos)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function deleteProduct(id_producto) {
    try {
        const res = await axios.delete(`${API_URL}/products/${id_producto}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function searchProduct(search) {
    try {
        const res = await axios.get(`${API_URL}/products?search=${search}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, products: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}