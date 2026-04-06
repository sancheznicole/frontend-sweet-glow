import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function sendEBill(id_factura){
    try {
        const payload = { id_factura }

        const res = await axios.post(`${API_URL}/emails/electronic-bill`, payload)

        if(res?.status != 201){
            return { valid: false, error: res.data?.errors }
        }

        return { valid: true, order_invoice: res?.data }
    } 

    catch (error) {
        return { valid: false, error: error?.message }
    }
}