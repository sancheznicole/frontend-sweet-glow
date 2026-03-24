import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { getCart, updateCart } from "../../../../services/cartService"
import { searchProduct } from "../../../../services/productsService"
import { searchUsers } from "../../../../services/authService"
import { searchInvoiceOrders } from "../../../../services/facturaPedidosService"
import { searchGiftCard } from "../../../../services/giftCardService"
import { useNavigate } from "react-router-dom"

const EditCart = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})
    const [mostrarDatos, setMostrarDatos] = useState(false)
    const [cart, setCart] = useState({})

    const [status, setStatus] = useState('')
    const [id_usuario, setId_usuario] = useState('')

    const [user, setUser] = useState({})

    const options = {
        active: "Activo",
        checked_out: "Revisado"
    }

    function validateFields() {

        const errors = {}
        if (!status) {
            errors.status =
                "Debes seleccionar una opcion válida"
        }

        // Usuario obligatorio
        if (!id_usuario) {
            errors.id_usuario =
                "Debe seleccionar un usuario"
        }

        setFieldErrors(errors)

        return Object.keys(errors).length > 0
    }

    async function sendData() {

        try {

            const validation = validateFields()
            if (validation) return

            setLoading(true)

            const res = await updateCart(id, id_usuario, status)

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

                setCart(res.carts)
                setUser(res?.carts?.usuario)
                setStatus(res.carts?.status)

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

        status: {
            value: status,
            onChange: setStatus,
            type: "select",
            name: "status",
            titulo: "Status",
            options: options
        },

    }

    return (

        <div className="page-container">

            {!mostrarDatos && (
                <div className="back-link-container">
                    <button className="link-regresar" onClick={() => navigate(-1)}>
                        Regresar
                    </button>
                </div>
            )}

            <section className="section-editar">

                {!mostrarDatos ? (

                    <>
                        <h1 className="titulo-por-h1">
                            Detalles del carrito
                        </h1>

                        <div className="contenedor-campos">

                            <p><strong>Usuario:</strong> {cart?.usuario?.nombres} {cart?.usuario?.apellidos}</p>
                            <p><strong>Estado:</strong> {cart?.status}</p>

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

