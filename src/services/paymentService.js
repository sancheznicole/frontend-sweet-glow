import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function createPreference(invoice_id) {
    try {
        if(!invoice_id) return { valid: false, error: "Invoice ID not provided" }

        const payload = {
            invoice_id
        }

        const res = await axios.post(`${API_URL}/create-preference/`, payload)

        if (res?.status != 200) {
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true, preference: res?.data }

    } catch (error) {
        return { valid: false, error: error?.message }
    }
}

export async function verifyPayment(payment_id, factura){
    try {
        if(!payment_id || !factura) return { valid: false, error: "Solicitud no procesable datos incompletos" }

        const payload = {
            payment_id,
            factura
        }

        const res = await axios.post(`${API_URL}/payment/verify/`, payload)

        if (res?.status != 200) {
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true, data: res?.data }

    } catch (error) {
        return { valid: false, error: error?.message }
    }
}