import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { getAward, updateAward } from "../../../../services/awardsService"
import { getAllProducts } from "../../../../services/productsService"

const EditAward = () => {

    const { id } = useParams()

    const [id_producto, setIdProducto] = useState("")
    const [productos, setProductos] = useState({})
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})
    const [mostrarDatos, setMostrarDatos] = useState(false)
    const [nombreProducto, setNombreProducto] = useState("")

    useEffect(() => {

        async function getData() {
            try {
                const res = await getAward(id)
                if (!res?.valid) {
                    setError("Error al obtener el premio")
                    return
                }
                setIdProducto(res?.award?.id_producto)
                setNombreProducto(res?.award?.producto?.nombre)
            } catch (error) {
                setError(error.message)
            }
        }

        async function fetchProductos() {
            try {
                const res = await getAllProducts(1, 1000)
                if (!res?.valid) return

                const lista = res?.products?.data ?? res?.products ?? []

                const opciones = {}
                lista.forEach(p => {
                    opciones[p.id_producto] = p.nombre
                })

                setProductos(opciones)
            } catch (error) {
                console.log(error?.message)
            }
        }

        getData()
        fetchProductos()

    }, [id])

    async function sendData() {
        try {
            if (id_producto === "") {
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
            type: "select",
            value: id_producto,
            options: productos,
            onChange: setIdProducto
        }
    }

    return (
        <div className="page-container">

            {!mostrarDatos && (
                <div className="back-link-container">
                    <Link className="link-regresar" to="/admin/premios">Regresar</Link>
                </div>
            )}

            <section className="section-editar">

                {!mostrarDatos ? (
                    <>
                        <h1 className="titulo-por-h1">Detalles del premio</h1>
                        <div className="contenedor-campos">
                            <p><strong>Producto:</strong> {nombreProducto}</p>
                        </div>
                    </>
                ) : (
                    <AdminFormEdit
                        titulo={"Editar premio"}
                        campos={campos}
                        onSendForm={sendData}
                        linkRegresar={"/admin/premios"}
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