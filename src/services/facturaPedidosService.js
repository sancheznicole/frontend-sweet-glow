import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllInvoiceOrders(page, limit = 5, search) {
    try {
        const res = await axios.get(`${API_URL}/order_invoice?page=${page}&limit=${limit}&search=${search}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, InvoiceOrders: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getInvoiceOrders(id_factura_pedido) {
    try {
        const res = await axios.get(`${API_URL}/order_invoice/${id_factura_pedido}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, InvoiceOrders: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function createInvoiceOrders(id_usuario, id_carrito, id_tarjeta, neto, descuento, status = "pending") {

    try {
        const payload = { id_usuario, neto, id_carrito, id_tarjeta, descuento, status }

        const res = await axios.post(`${API_URL}/order_invoice`, payload)

        if(res?.status != 201){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true, order_invoice: res?.data }
    } 

    catch (error) {
        return { valid: false, error: error?.message }
    }
    
}

export async function updateInvoiceOrders(id_factura_pedido, id_usuario, id_carrito, id_tarjeta, neto, descuento, status) {
     try {
        const datos = {}

        if (id_factura_pedido) datos.id_factura_pedido = id_factura_pedido
        if (id_carrito) datos.id_carrito = id_carrito
        if (id_tarjeta) datos.id_tarjeta = id_tarjeta
        if (descuento) datos.descuento = descuento
        if (neto) datos.neto = neto
        if (status) datos.status = status
        if (id_usuario) datos.id_usuario = id_usuario

        const res = await axios.put(`${API_URL}/order_invoice/${id_factura_pedido}`, datos)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function deleteInvoiceOrders(id_factura_pedido) {
    try {
        const res = await axios.delete(`${API_URL}/order_invoice/${id_factura_pedido}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function searchInvoiceOrders(search) {
    try {
        const res = await axios.get(`${API_URL}/order_invoice?search=${search}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, InvoiceOrders: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}