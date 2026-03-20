import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import { createImage } from "../../../../services/imagesService"
import { getAllProducts } from "../../../../services/productsService"

const CreateImages = () => {

    const navigate = useNavigate()

    const [file, setFile] = useState(null)
    const [id_producto, setIdProducto] = useState("")
    const [productos, setProductos] = useState({})
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})

    // Cargamos productos para el select
    useEffect(() => {
        async function fetchProductos() {
            try {
                const res = await getAllProducts(1, 1000)
                if (!res?.valid) return

                const lista = res?.products?.data ?? res?.products ?? []

                // Convertimos a objeto { id_producto: nombre } para el select
                const opciones = {}
                lista.forEach(p => {
                    opciones[p.id_producto] = p.nombre
                })

                setProductos(opciones)
            } catch (error) {
                console.log(error?.message)
            }
        }
        fetchProductos()
    }, [])

    function validateFields() {
        const errors = {}
        if (!file) errors.filename = "La imagen es obligatoria"
        if (id_producto === "") errors.id_producto = "El producto es obligatorio"
        setFieldErrors(errors)
        return Object.keys(errors).length > 0
    }

    const sendData = async () => {
        try {
            const validation = validateFields()
            if (validation) return

            setLoading(true)
            setError("")


            console.log("archivo:", file)        // ← agrega esto
            console.log("tipo:", typeof file)    // ← y esto

            const res = await createImage(file, id_producto)

            if (!res?.valid) {
                setError("Error al subir la imagen")
                return
            }

            navigate("/admin/imagenes")

        } catch (error) {
            setError("Error al enviar el formulario")
        } finally {
            setLoading(false)
        }
    }

    const campos = {
        filename: {
            titulo: "Imagen",
            name: "filename",
            type: "file",
            onChange: (e) => setFile(e)
        },
        id_producto: {
            titulo: "Producto",
            name: "id_producto",
            type: "select",
            options: productos,
            onChange: setIdProducto
        }
    }

    return (
        <AdminFormCreate
            titulo={"Subir imagen"}
            campos={campos}
            linkRegresar={"/admin/imagenes"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={"Subir imagen"}
            loading={loading}
        />
    )
}

export default CreateImages