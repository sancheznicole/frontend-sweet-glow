import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { getReferenceProduct, updateReferenceProduct } from "../../../../services/referenceProductsService"
import { useNavigate } from "react-router-dom"
import Loader from "../../../../components/Loader"

const EditReferenceProduct = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [loadingData, setLoadingData] = useState(true)
    const [codigo, setCodigo] = useState("")
    const [color, setColor] = useState("")
    const [tamano, setTamano] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})
    const [mostrarDatos, setMostrarDatos] = useState(false)

    useEffect(() => {
        async function getData() {
            try {
                const res = await getReferenceProduct(id)
                if (!res?.valid) {
                    setError("Error al obtener la referencia")
                    return
                }
                setCodigo(res?.reference?.codigo)
                setColor(res?.reference?.color)
                setTamano(res?.reference?.tamano)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoadingData(false)
            }
        }
        getData()
    }, [id])

    async function sendData() {
        try {
            const errors = {}
            if (codigo.trim().length < 1) errors.codigo = "El código es obligatorio"
            if (color.trim().length < 1) errors.color = "El color es obligatorio"
            if (tamano.trim().length < 1) errors.tamano = "El tamaño es obligatorio"

            if (Object.keys(errors).length > 0) {
                setFieldErrors(errors)
                return
            }

            setLoading(true)
            setError("")

            const res = await updateReferenceProduct(id, codigo, color, tamano)

            if (!res?.valid) {
                setError("Error al actualizar la referencia")
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
        codigo: {
            titulo: "Código",
            name: "codigo",
            type: "text",
            value: codigo,
            onChange: setCodigo
        },
        color: {
            titulo: "Color",
            name: "color",
            type: "text",
            value: color,
            onChange: setColor
        },
        tamano: {
            titulo: "Tamaño",
            name: "tamano",
            type: "text",
            value: tamano,
            onChange: setTamano
        }
    }

    return (
        loadingData ? (
            <Loader text="Cargando informacion de la referencia del producto..."></Loader>
        ) : (

        
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
                        <h1 className="titulo-por-h1">Detalles de la referencia</h1>
                        <div className="contenedor-campos">
                            <p><strong>Código:</strong> {codigo}</p>
                            <p><strong>Color:</strong> {color}</p>
                            <p><strong>Tamaño:</strong> {tamano}</p>
                        </div>
                    </>
                ) : (
                    <AdminFormEdit
                        titulo={"Editar referencia"}
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
    )
}

export default EditReferenceProduct