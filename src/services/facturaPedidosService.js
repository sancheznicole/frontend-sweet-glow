import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllInvoiceOrders(page, limit) {
    try {
        const res = await axios.get(`${API_URL}/order_invoice?page=${page}&limit=${limit}`)

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

export async function createInvoiceOrders(id_usuario, neto) {

    try {
        const payload = { id_usuario, neto }

        const res = await axios.post(`${API_URL}/order_invoice`, payload)

        if(res?.status != 201){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true }
    } 

    catch (error) {
        return { valid: false, error: error?.message }
    }
    
}

export async function updateInvoiceOrders(id_factura_pedido, id_usuario, neto) {
     try {
        const datos = {}

        if (id_factura_pedido) datos.id_factura_pedido = id_factura_pedido
        if (id_usuario) datos.id_usuario = id_usuario
        if (neto) datos.neto = neto

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