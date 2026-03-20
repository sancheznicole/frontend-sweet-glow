import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { getCart, updateCart } from "../../../../services/cartService"
import { searchProduct } from "../../../../services/productsService"
import { searchUsers } from "../../../../services/authService"
import { searchInvoiceOrders } from "../../../../services/facturaPedidosService"
import { searchGiftCard } from "../../../../services/giftCardService"

const EditCart = () => {

    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})
    const [mostrarDatos, setMostrarDatos] = useState(false)

    const [cantidad, setCantidad] = useState('')
    const [descuento, setDescuento] = useState('')
    const [id_usuario, setId_usuario] = useState('')
    const [id_producto, setId_producto] = useState('')
    const [id_factura_pedido, setId_factura_pedido] = useState('')
    const [id_tarjeta, setId_tarjeta] = useState('')

    const [product, setProduct] = useState({})
    const [user, setUser] = useState({})

    function validateFields() {

        const errors = {}

        const cantidadRegex = /^[0-9]+$/
        if (!cantidadRegex.test(cantidad) || parseInt(cantidad) <= 0) {
            errors.cantidad = "La cantidad debe ser un número mayor a 0"
        }

        if (!cantidadRegex.test(descuento)) {
            errors.descuento = "Debes proporcionar un descuento válido"
        }

        if (!id_usuario) {
            errors.id_usuario = "Debe seleccionar un usuario"
        }

        if (!id_producto) {
            errors.id_producto = "Debe seleccionar un producto"
        }

        setFieldErrors(errors)

        return Object.keys(errors).length > 0
    }

    async function sendData() {

        try {

            const validation = validateFields()
            if (validation) return

            setLoading(true)

            const res = await updateCart(id, id_usuario, cantidad, descuento, id_producto, id_factura_pedido, id_tarjeta)

            if (!res?.valid) {
                setError("Error al actualizar")
                return
            }

            setMostrarDatos(false)

        } catch (error) {

            setError(error.message)

        } finally {

            setLoading(false)

        }
    }

    useEffect(() => {

        const getData = async () => {

            try {

                const res = await getCart(id)

                if (!res?.valid) {
                    setError("Error al obtener carrito")
                    return
                }

                const c = res.carts

                setCantidad(c.cantidad)
                setDescuento(c.descuento.slice(0, -3))
                setProduct(c?.producto)
                setUser(c?.usuario)
                setId_usuario(c?.id_usuario)
                setId_producto(c?.id_producto)
                setId_usuario(c.id_usuario)
                setId_producto(c.id_producto)
                setId_factura_pedido(c.id_factura_pedido)
                setId_tarjeta(c.id_tarjeta)

            } catch (error) {

                setError(error.message)

            }
        }
        
        getData()

    }, [id])

    const fields = {
        id_usuario: {
            value: id_usuario,
            onChange: setId_usuario,
            type: "text-search",
            name: "id_usuario",
            titulo: "Usuario",
            searchFunction: searchUsers,
            data_key: 'users',
            save_data_key: 'id_usuario',
            text_keys: 'nombres,apellidos,correo',
            initial_show_value: `${user?.nombres} ${user?.apellidos} ${user?.correo}`
        },

        cantidad: {
            value: cantidad,
            onChange: setCantidad,
            type: "number",
            name: "cantidad",
            titulo: "Cantidad"
        },

        descuento: {
            value: descuento,
            onChange: setDescuento,
            type: "number",
            name: "descuento",
            titulo: "Descuento",
        },

        id_producto: {
            value: id_producto,
            onChange: setId_producto,
            type: "text-search",
            name: "id_producto",
            titulo: "Producto",
            searchFunction: searchProduct,
            data_key: 'products',
            save_data_key: 'id_producto',
            text_keys: 'nombre,categoria?.nombre',
            initial_show_value: `${product?.nombre}`
        },

        id_factura_pedido: {
            //la funcion que va a cambiar el dato
            onChange: setId_factura_pedido,
            //tipo de input
            type: 'text-search',
            //nombre del input 
            name: 'id_factura_pedido',
            //nombre visible 
            titulo: 'Id factura',
            
            searchFunction: searchInvoiceOrders,
            data_key: 'InvoiceOrders',
            save_data_key: 'id_factura_pedido',
            text_keys: 'id_factura_pedido',
            value: id_factura_pedido,
            initial_show_value: id_factura_pedido
        },

        id_tarjeta: {
            //la funcion que va a cambiar el dato
            onChange: setId_tarjeta,
            //tipo de input
            type: 'text-search',
            //nombre del input 
            name: 'id_tarjeta',
            //nombre visible 
            titulo: 'Id tarjeta',
            
            searchFunction: searchGiftCard,
            data_key: 'tarjetas',
            save_data_key: 'id_tarjeta',
            text_keys: 'id_tarjeta',
            value: id_tarjeta,
            initial_show_value: id_tarjeta
        }

    }

    return (

        <div className="page-container">

            {!mostrarDatos && (
                <div className="back-link-container">
                    <Link className="link-regresar" to="/admin/cart">
                        Regresar
                    </Link>
                </div>
            )}

            <section className="section-editar">

                {!mostrarDatos ? (

                    <>
                        <h1 className="titulo-por-h1">
                            Detalles del carrito
                        </h1>

                        <div className="contenedor-campos">

                            <p><strong>Usuario:</strong> {user?.nombres} {user?.apellidos}</p>
                            <p><strong>Producto:</strong> {product?.nombre}</p>
                            <p><strong>Factura:</strong> {id_factura_pedido}</p>
                            <p><strong>Tarjeta:</strong> {id_tarjeta}</p>
                            <p><strong>Cantidad:</strong> {cantidad}</p>
                            <p><strong>Descuento:</strong> ${descuento}</p>

                        </div>
                    </>

                ) : (

                    <AdminFormEdit
                        titulo="Editar carrito"
                        campos={fields}
                        onSendForm={sendData}
                        error={error}
                        fieldErrors={fieldErrors}
                        button="Guardar cambios"
                        loading={loading}
                    />

                )}

                <div className="contenedor-editar-botones">

                    <button
                        className={mostrarDatos ? "cancelar-profile" : "modificar-profile"}
                        onClick={() => setMostrarDatos(!mostrarDatos)}
                    >
                        {mostrarDatos ? "Cancelar" : "Modificar"}
                    </button>

                </div>

            </section>

        </div>
    )
}

export default EditCart

