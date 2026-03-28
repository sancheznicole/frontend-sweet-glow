import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


export async function getAllElementosCarrito(page = 1, limit = 5, search = "") {
    try {
        const res = await axios.get(`${API_URL}/cart-elements?page=${page}&limit=${limit}&search=${search}`);

        if (res?.status !== 200) {
            return { valid: false, error: res.data?.errors };
        }

        return { valid: true, elements: res?.data };
    } catch (error) {
        return { valid: false, error: error?.message };
    }
}


export async function getElementoCarrito(id) {
    try {
        const res = await axios.get(`${API_URL}/cart-elements/${id}`);

        if (res?.status !== 200) {
            return { valid: false, error: res.data?.errors };
        }

        return { valid: true, element: res?.data };
    } catch (error) {
        return { valid: false, error: error?.message };
    }
}


export async function createElementoCarrito(id_carrito, id_producto, cantidad, price) {
    try {
        const payload = {
            id_carrito, id_producto, cantidad, price
        };

        const res = await axios.post(`${API_URL}/cart-elements`, payload);

        if (res?.status !== 201) {
            return { valid: false, error: res.data?.errors };
        }

        return { valid: true, element: res?.data };
    } catch (error) {
        return { valid: false, error: error?.message };
    }
}


export async function updateElementoCarrito(id, id_carrito, id_producto, cantidad, price) {
    try {
        const payload = {};

        if (id_carrito) payload.id_carrito = id_carrito;
        if (id_producto) payload.id_producto = id_producto;
        if (cantidad) payload.cantidad = cantidad;
        if (price) payload.price = price;

        const res = await axios.put(`${API_URL}/cart-elements/${id}`, payload);

        if (res?.status !== 200) {
            return { valid: false, error: res.data?.errors };
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, error: error?.message };
    }
}


export async function deleteElementoCarrito(id) {
    try {
        const res = await axios.delete(`${API_URL}/cart-elements/${id}`);

        if (res?.status !== 200) {
            return { valid: false, error: res.data?.errors };
        }

        return { valid: true };
    } catch (error) {
        return { valid: false, error: error?.message };
    }
}