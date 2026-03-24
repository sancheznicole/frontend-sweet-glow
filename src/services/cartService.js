import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function getAllCart(page = 1, limit = 5, search = '') {
    try {
        const res = await axios.get(`${API_URL}/carts?page=${page}&limit=${limit}&search=${search}`)

        if (res?.status != 200) {
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true, carts: res?.data }

    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getCart(id_carrito) {
    try {
        const res = await axios.get(`${API_URL}/carts/${id_carrito}`)

        if(res?.status != 200){
            return { valid: false, error: res.data?.errors }
        }
        
        return { valid: true, carts: res?.data }
    } 
    
    catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function createCart(id_usuario, status = "active") {
    try {
        const payload = { id_usuario, status }

        const res = await axios.post(`${API_URL}/carts`, payload)

        if(res?.status != 201){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true, cart: res?.data }
    } 

    catch (error) {
        return { valid: false, error: error?.message }
    }
    
}

export async function updateCart(id_usuario, status) {
     try {
        const datos = {}

        if (id_usuario) datos.id_usuario = id_usuario
        if (status) datos.cantidad = status

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

export async function searchCart(search = '') {
    try {
        const res = await axios.get(`${API_URL}/carts?search=${search}`)

        if (res?.status != 200) {
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true, carts: res?.data }

    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function getUserCarts(user_id){
    try {
        const res = await axios.get(`${API_URL}/user/carts/${user_id}`)

        if (res?.status != 200) {
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true, carts: res?.data }

    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

// front cart functions


export const addToCart = async (product, quantity) => {
    try {
        let saved = localStorage.getItem("cart")
        let cart = saved != null ? JSON.parse(saved) : saved

        const productFormatted = {
            ...product,
            quantity: quantity
        };

       cart = {
            ...cart,
            [product?.id_producto]: productFormatted
       }

       localStorage.setItem("cart", JSON.stringify(cart))

        return { valid: true }
    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export const removeFromCart = async (id) => {
    try {
        let saved = localStorage.getItem("cart");
        let cart = saved != null ? JSON.parse(saved) : {};

        if (cart && cart[id]) {
            delete cart[id];
        }

        if(Object.keys(cart).length == 1){
            localStorage.setItem("cart", null);
        } else{
            localStorage.setItem("cart", JSON.stringify(cart));
        }


        return { valid: true };
    } catch (error) {
        return { valid: false, error: error?.message };
    }
};

export const addOne = (id) => {
    let saved = localStorage.getItem("cart")
    let cart = saved != null ? JSON.parse(saved) : saved

    if (cart[id]) {
        cart[id].quantity += 1;
    } else {
        console.warn("Producto no existe en el carrito");
        return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

export const deleteOne = (id) => {
    let saved = localStorage.getItem("cart")
    let cart = saved != null ? JSON.parse(saved) : saved

    if (cart[id]) {
        cart[id].quantity -= 1;
    } else {
        console.warn("Producto no existe en el carrito");
        return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}