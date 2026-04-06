import { useEffect, useState } from 'react'
import { verifyPayment } from '../../services/paymentService'
import { useNavigate } from "react-router-dom"
import { getInvoiceOrders } from '../../services/facturaPedidosService'
import { createImageURL } from "../../services/imagesService"
import { parsePrice } from '../../helpers/json.helpers'
import Loader from "../../components/Loader"
import { handleReduceProductsStock } from '../../services/productsService'

const SuccessPayment = () => {
    const [id_factura, setId_Factura] = useState(undefined)
    const [status, setStatus] = useState("verificando")
    const [loading, setLoading] = useState(true)
    const [loadingDownload, setLoadingDownload] = useState(false)
    const [factura, setFactura] = useState(undefined)
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL;

    async function processPayment() {
        const params = new URLSearchParams(window.location.search);
        const payment_id = params.get("payment_id");
        const payment_type = params.get("payment_type")
        const factura = params.get("external_reference")

        if (!payment_id && !payment_type) {
            setStatus("error");
            return;
        }

        if(payment_type != "zero"){
            const res = await verifyPayment(payment_id, factura)
    
            if (!res?.valid) {
                console.log(res?.error)
                return
            }
    
            setStatus(res?.data?.status);
        }

        setStatus("already_paid");
        setId_Factura(factura)
    }

    async function getOrderInoiceData(){
        const orderInvoiceRes = await getInvoiceOrders(id_factura)

        if(!orderInvoiceRes?.valid){
            console.log(orderInvoiceRes?.error)
            return
        }

        setFactura(orderInvoiceRes?.InvoiceOrders)

        setLoading(false)
    }

    const handleDownload = async () => {
        try {
            setLoadingDownload(true)
            const res = await fetch(`${API_URL}/factura/${id_factura}/pdf`);
            const blob = await res.blob();

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `factura_${id_factura}.pdf`;
            a.click();
        } catch (error) {
            console.log(error?.message)
        } finally {
            setLoadingDownload(false)
        }
    };

    useEffect(() => {
        processPayment();
    }, []);

    useEffect(() => {
        if(!id_factura) return
        getOrderInoiceData()
    }, [id_factura])

    useEffect(() => {
        switch (status) {
            case "approved":
                break;

            case "pending":
                navigate("/payment/pending");
                break;

            case "rejected":
                navigate("/payment/failure");
                break;

            case "error":
                navigate("/payment/failure");
                break;

            default:
                break;
        }
    }, [status, navigate]);

    async function handleReduceStock(){
        await handleReduceProductsStock(factura)
    }

    useEffect(() => {
        if(status != "approved") return
        if(typeof factura == "object") handleReduceStock()
    }, [factura])

    console.log(factura)

    return (
        loading ? (
            <Loader text='Verificando informacion y cargando factura...'></Loader>
        ) : (
            <div className='factura-container'>
                {status == "approved" || status == "already_paid" && factura != undefined && (
                    <>
                        <button className='download-bill-factura' onClick={() => handleDownload()} disabled={loadingDownload}>{loadingDownload ? 'Descargando...' : 'Descargar factura'}</button>

                        <div className='card-factura'>   
                            <div className='card-header'>
                                <h1>✅ Pago aprobado</h1>
                                <h2>Tu compra fue exitosa | Factura #{id_factura}</h2>
                                <p>Fecha de compra: {factura?.created_at.slice(0, 10)}</p>
                            </div>
                            <h2 className='products-title'>Productos: </h2>
                            <div className='products-container'>
                                {factura?.carrito?.elementos.map((el, index) => {
                                    return (
                                        <div key={index} className='cart-product-container'>
                                            <div className='image-container'>
                                                <img src={createImageURL(el?.producto?.imagenes[0]?.filename)} alt="" />
                                            </div>
                                            <div className='info-container'>
                                                <h2><strong>{el?.producto?.nombre}</strong></h2>
                                                <p>color: {el?.producto?.referencia_producto?.color} | tamaño {el?.producto?.referencia_producto?.tamano}</p>
                                                <p><strong>{el?.producto?.categoria?.nombre}</strong> | {el?.producto?.marca?.nombre}</p>
                                                <p>{el?.cantidad} Unidad{el?.cantidad > 1 ? "es" : ''}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='card-footer'>
                                <p>Total: {parsePrice(Math.max(0, factura?.neto - factura?.descuento))}</p>

                                <button onClick={() => navigate("/")}>
                                    Volver al inicio
                                </button>
                            </div>
                        </div>
                    
                    </>

                )}
            </div>
        )
    )
}

export default SuccessPayment