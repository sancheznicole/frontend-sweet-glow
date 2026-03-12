import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllCart(page, limit) {
    try {
        const res = await axios.get(`${API_URL}/carts?page=${page}&limit=${limit}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, Carts: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getCart(id_carrito) {
    try {
        const res = await axios.get(`${API_URL}/carts/${id_carrito}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, Carts: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function createCart(id_usuario, cantidad, descuento, id_producto, id_factura_pedido, id_tarjeta) {
    try {
        const payload = { id_carrito, id_usuario, cantidad, descuento, id_producto, id_factura_pedido, id_tarjeta }

        const res = await axios.post(`${API_URL}/carts`, payload)

        if(res?.status != 201){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 

    catch (error) {
        return { valid: false, error: error?.message }
    }
    
}

export async function updateCart(id_carrito, id_usuario, cantidad, descuento, id_producto, id_factura_pedido, id_tarjeta) {
     try {
        const datos = {}

        if (id_carrito) datos.id_carrito = id_carrito
        if (id_usuario) datos.id_usuario = id_usuario
        if (cantidad) datos.cantidad = cantidad
        if (descuento) datos.descuento = descuento
        if (id_producto) datos.id_producto = id_producto
        if (id_factura_pedido) datos.id_factura_pedido = id_factura_pedido
        if (id_tarjeta) datos.id_tarjeta = id_tarjeta

        const res = await axios.put(`${API_URL}/carts/${id_carrito}`, datos)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function deleteCart(id_carrito) {
    try {
        const res = await axios.delete(`${API_URL}/carts/${id_carrito}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}