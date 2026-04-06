import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const PendingGiftCardPayment = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/")
        }, 8000)

        return () => clearTimeout(timer)
    }, [navigate])

    return (
        <div className='factura-container pending-container'>
            <div className='card-factura'>
                <div className='card-header'>
                    <h1>⏳ Pago en proceso</h1>
                    <h2>Estamos confirmando tu pago</h2>
                    <p>Esto puede tardar unos minutos dependiendo del medio de pago.</p>
                </div>

                <div className='products-container' style={{ textAlign: "center", padding: "20px" }}>
                    <p>💳 No cierres esta página si acabas de pagar.</p>
                    <p>Te notificaremos cuando el pago sea aprobado.</p>
                </div>

                <div className='card-footer'>
                    <button onClick={() => navigate("/")}>
                        Volver al inicio
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PendingGiftCardPayment