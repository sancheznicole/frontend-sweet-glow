import { searchUsers } from "../../../../services/authService"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { updateInvoiceOrders, getInvoiceOrders } from "../../../../services/facturaPedidosService"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"


const EditOrderInvoice = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})
    const [mostrarDatos, setMostrarDatos] = useState(false)

    const [neto, setNeto] = useState('')
    const [id_usuario, setId_usuario] = useState('')
    const [date, setDate] = useState('')
    const [user, setUser] = useState({})

    function validateFields() {
        const errors = {}

        // Neto: número mayor a 0
        const netoRegex = /^[0-9]+$/

        if (!netoRegex.test(neto) || parseInt(neto) <= 0) {
            errors.neto = "El neto debe ser un número mayor a 0"
        }

        // Usuario obligatorio
        if (!id_usuario) {
            errors.id_usuario = "Debe seleccionar un usuario"
        }

        setFieldErrors(errors)

        return Object.keys(errors).length > 0
    }

    async function sendData() {

        try {

            const validation = validateFields()
            if (!validation) return

            setLoading(true)

            const res = await updateInvoiceOrders(id, id_usuario, neto)

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

                const res = await getInvoiceOrders(id)

                if (!res?.valid) {
                    setError("Error al obtener carrito")
                    return
                }

                const o = res.InvoiceOrders

                console.log(o)

                setNeto(o?.neto)
                setId_usuario(o?.id_usuario)
                setUser(o?.usuario)
                setDate(o?.created_at)

            } catch (error) {
                setError(error.message)

            }
        }
        
        getData()

    }, [id])

    const fields = {

        id_usuario: {
            //la funcion que va a cambiar el dato
			onChange: setId_usuario,
            //tipo de input
			type: 'text-search',
            //nombre del input 
			name: 'id_usuario',
            //nombre visible 
			titulo: 'Usuario',

            searchFunction: searchUsers,
            data_key: 'users',
            save_data_key: 'id_usuario',
            text_keys: 'nombres,apellidos,correo',
            initial_show_value: `${user?.nombres} ${user?.apellidos} ${user?.correo}`
		},

        cantidad: {
            //la funcion que va a cambiar el dato
			onChange: setNeto,
            //tipo de input
			type: 'number',
            //nombre del input 
			name: 'neto',
            //nombre visible 
			titulo: 'Neto',
            value: neto
		},
    }

    return (
        <div className="page-container">

            {!mostrarDatos && (
                <div className="back-link-container">
                    <Link className="link-regresar" to="/admin/invoice-orders">
                        Regresar
                    </Link>
                </div>
            )}

            <section className="section-editar">

                {!mostrarDatos ? (

                    <>
                        <h1 className="titulo-por-h1">
                            Detalles de la factura
                        </h1>

                        <div className="contenedor-campos">

                            <p><strong>Usuario:</strong> {user?.nombres} {user?.apellidos}</p>
                            <p><strong>Neto:</strong> {`$${Number(neto).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}</p>
                            <p><strong>Fecha de creación:</strong> {date.split('T')[0]}</p>

                        </div>
                    </>

                ) : (

                    <AdminFormEdit
                        titulo="Editar factura"
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

export default EditOrderInvoice