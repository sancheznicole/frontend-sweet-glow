import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"
import { createAward } from "../../../../services/awardsService"
import { getAllProducts } from "../../../../services/productsService"

const CreateAward = () => {

    const navigate = useNavigate()

    const [id_producto, setIdProducto] = useState("")
    const [productos, setProductos] = useState({})
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [fieldErrors, setFieldErrors] = useState({})

    useEffect(() => {
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
        fetchProductos()
    }, [])

    function validateFields() {
        const errors = {}
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

            const res = await createAward(id_producto)

            if (!res?.valid) {
                setError("Error al crear el premio")
                return
            }

            navigate("/admin/premios")

        } catch (error) {
            setError("Error al enviar el formulario")
        } finally {
            setLoading(false)
        }
    }

    const campos = {
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
            titulo={"Crear premio"}
            campos={campos}
            linkRegresar={"/admin/premios"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={"Crear premio"}
            loading={loading}
        />
    )
}

export default CreateAward