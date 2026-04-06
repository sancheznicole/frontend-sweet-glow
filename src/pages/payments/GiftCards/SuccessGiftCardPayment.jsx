import { useState, useEffect } from "react";
import Loader from "../../../components/Loader";
import { changeToPaidGiftCard, getGiftCard } from "../../../services/giftCardService";
import { useNavigate } from "react-router-dom";
import { parsePrice } from "../../../helpers/json.helpers"

const SuccessGiftCardPayment = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState("verificando")
    const [id_tarjeta, setId_tarjeta] = useState(undefined)
    const [tarjeta, setTarjeta] = useState(undefined)

    async function processPayment() {
        const params = new URLSearchParams(window.location.search);
        const payment_id = params.get("payment_id");
        const payment_status = params.get("status")
        const tarjeta = params.get("external_reference")

        if (!payment_id) {
            setStatus("error");
            return;
        }

        const res = await changeToPaidGiftCard(tarjeta, payment_id, payment_status)

        if (!res?.valid) {
            console.log(res?.error)
            return
        }

        setId_tarjeta(tarjeta)
    }

    useEffect(() => {
        processPayment();
    }, [])

    async function getGFData() {
        try {
            let res = await getGiftCard(id_tarjeta)
            
            if(!res?.valid){
                console.log(res?.error)
                return
            }

            setTarjeta(res?.tarjeta)

        } catch (error) {
            console.log(error?.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(id_tarjeta) getGFData() 
    }, [id_tarjeta])

    useEffect(() => {
        switch (status) {
            case "approved":
                break;

            case "pending":
                navigate("/giftcards/payment/pending");
                break;

            case "rejected":
                navigate("/giftcards/payment/failure");
                break;

            case "error":
                navigate("/giftcards/payment/failure");
                break;

            default:
                break;
        }
    }, [status, navigate]);

    console.log(tarjeta)

    if(loading) return <Loader text="Procesando informacion del pago..."></Loader>

    return (
        <div className='factura-container'>
            <div className='card-factura'>   
                <div className='card-header'>
                    <h1>✅ Pago aprobado</h1>
                    <h2>Tu compra fue exitosa | Tarjeta #{id_tarjeta}</h2>
                    <p>Fecha de compra: {tarjeta?.created_at.slice(0, 10)}</p>
                </div>
                <h2 className='products-title'>Tarjeta de regalo: </h2>
                <div className='products-container factura-gf-container'>
                    <div className="gc-card-visual">
                        <div className="gc-card-visual-brand">
                            Sweet Glow
                            <span>xoxo · tarjeta regalo</span>
                        </div>
                        <div className="gc-card-visual-bottom">
                            <span className="gc-card-visual-label">e-gift card</span>
                            <span className="gc-card-visual-amount">
                                {tarjeta?.monto ? parsePrice(tarjeta?.monto) : '✦'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='card-footer'>
                    <p>Total: {parsePrice(Math.max(0, tarjeta?.monto))}</p>

                    <button onClick={() => navigate("/")}>
                        Volver al inicio
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SuccessGiftCardPayment