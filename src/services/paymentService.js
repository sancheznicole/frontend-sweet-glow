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