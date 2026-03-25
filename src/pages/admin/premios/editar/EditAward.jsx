import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { getAward, updateAward } from "../../../../services/awardsService"
import { searchProduct } from "../../../../services/productsService"
import { useNavigate } from "react-router-dom"

const EditAward = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [id_producto, setIdProducto] = useState("")
    const [producto, setProducto] = useState({})
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})
    const [mostrarDatos, setMostrarDatos] = useState(false)

    useEffect(() => {
        async function getData() {
            try {
                const res = await getAward(id)
                if (!res?.valid) {
                    setError("Error al obtener el premio")
                    return
                }
                setIdProducto(res?.award?.id_producto)
                setProducto(res?.award?.producto)
            } catch (error) {
                setError(error.message)
            }
        }
        getData()
    }, [id])

    async function sendData() {
        try {
            if (!id_producto) {
                setFieldErrors({ id_producto: "El producto es obligatorio" })
                return
            }

            setLoading(true)
            setError("")

            const res = await updateAward(id, id_producto)

            if (!res?.valid) {
                setError("Error al actualizar el premio")
                return
            }

            setMostrarDatos(false)

            const updated = await getAward(id)
            if (updated?.valid) {
                setIdProducto(updated?.award?.id_producto)
                setProducto(updated?.award?.producto)
            }

        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const campos = {
        id_producto: {
            titulo: "Producto",
            name: "id_producto",
            type: "text-search",
            searchFunction: searchProduct,
            data_key: "products",
            save_data_key: "id_producto",
            text_keys: "nombre",
            value: id_producto,
            initial_show_value: producto?.nombre ?? "",
            onChange: setIdProducto
        }
    }

    return (
        <div className="page-container">

            {!mostrarDatos && (
                <div className="back-link-container">
                    <button className="link-regresar" onClick={() => navigate(-1)}>Regresar</button>
                </div>
            )}

            <section className="section-editar">

                {!mostrarDatos ? (
                    <>
                        <h1 className="titulo-por-h1">Detalles del premio</h1>
                        <div className="contenedor-campos">
                            <p><strong>Producto:</strong> {producto?.nombre}</p>
                        </div>
                    </>
                ) : (
                    <AdminFormEdit
                        titulo={"Editar premio"}
                        campos={campos}
                        onSendForm={sendData}
                        error={error}
                        fieldErrors={fieldErrors}
                        button={"Guardar cambios"}
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

export default EditAward