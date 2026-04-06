import { useNavigate } from "react-router-dom"


const FailedGiftCardPayment = () => {
    const navigate = useNavigate()

    return (
        <div className='factura-container'>
            <div className='card-factura'>
                <div className='card-header'>
                    <h1>Pago rechazado</h1>
                    <h2>No se pudo procesar tu pago</h2>
                    <p>Verifica tus datos o intenta con otro método de pago.</p>
                </div>

                <div className='products-container' style={{ textAlign: "center", padding: "20px" }}>
                    <p>🔁 Puedes intentarlo nuevamente.</p>
                    <p>Si el problema persiste, contacta soporte.</p>
                </div>

                <div className='card-footer card-footer-buttons' style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                    <button onClick={() => navigate("/")}>
                        Ir al inicio
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FailedGiftCardPayment