import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getImage, updateImage } from "../../../../services/imagesService"
import { getAllProducts } from "../../../../services/productsService"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL

const EditImages = () => {

    const { id } = useParams()

    const [file, setFile] = useState(null)
    const [id_producto, setIdProducto] = useState("")
    const [filename, setFilename] = useState("")
    const [productos, setProductos] = useState({})
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})
    const [mostrarDatos, setMostrarDatos] = useState(false)

    useEffect(() => {

        async function getData() {
            try {
                const res = await getImage(id)
                if (!res?.valid) {
                    setError("Error al obtener la imagen")
                    return
                }
                setFilename(res?.image?.filename)
                setIdProducto(res?.image?.id_producto)
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
            if (!file) {
                setFieldErrors({ filename: "Selecciona una imagen" })
                return
            }

            setLoading(true)
            setError("")

            const res = await updateImage(id, file, id_producto)

            if (!res?.valid) {
                setError("Error al actualizar la imagen")
                return
            }

            setMostrarDatos(false)

            // Recargamos la imagen actualizada
            const updated = await getImage(id)
            if (updated?.valid) setFilename(updated?.image?.filename)

        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const campos = {
        filename: {
            titulo: "Nueva imagen",
            name: "filename",
            type: "file",
            onChange: (e) => setFile(e)
        },
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
                    <Link className="link-regresar" to="/admin/imagenes">Regresar</Link>
                </div>
            )}

            <section className="section-editar">

                {!mostrarDatos ? (

                    <>
                        <h1 className="titulo-por-h1">Detalles de la imagen</h1>

                        <div className="contenedor-campos">
                            {filename && (
                                <img
                                    src={`${STORAGE_URL}/${filename}`}
                                    alt="Imagen producto"
                                    style={{ maxWidth: "300px", borderRadius: "8px" }}
                                />
                            )}
                            <p><strong>Producto ID:</strong> {id_producto}</p>
                        </div>
                    </>

                ) : (

                    <AdminFormEdit
                        titulo={"Editar imagen"}
                        campos={campos}
                        onSendForm={sendData}
                        linkRegresar={"/admin/imagenes"}
                        error={error}
                        fieldErrors={fieldErrors}
                        button={"Actualizar imagen"}
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

export default EditImages