import { useState, useEffect } from "react"
import { getAllReferenceProducts, deleteReferenceProduct } from "../../../services/referenceProductsService"
import AdminPanel from "../../../components/admin/AdminPanel"

const ReferenceProductsIndex = () => {

    const [data, setData] = useState([])
    const [paginacion, setPaginacion] = useState(null)
    const [paginaActual, setPaginaActual] = useState(1)

    const fields = {
        id_referencia: "ID",
        codigo: "Código",
        color: "Color",
        tamano: "Tamaño",
        created_at: "Fecha creación"
    }

    async function getData(page = 1) {
        try {
            const res = await getAllReferenceProducts(page)
            if (!res?.valid) {
                console.log(res?.error)
                return
            }
            setData(res?.references?.data)
            setPaginacion({
                current_page: res?.references?.current_page,
                last_page: res?.references?.last_page,
            })
        } catch (error) {
            console.log(error?.message)
        }
    }

    useEffect(() => {
        getData(paginaActual)
    }, [paginaActual])

    const onDelete = async (id) => {
        try {
            const res = await deleteReferenceProduct(id)
            if (!res?.valid) return res?.error
        } catch (error) {
            return error.message
        }
    }

    return (
        <div>
            <AdminPanel
                data={data}
                paginacion={paginacion}
                onPageChange={(page) => setPaginaActual(page)}
                campos={fields}
                titulo={"Administración de referencias de productos"}
                texto={"Administra las referencias de los productos"}
                linkCrear={"/admin/referenciaProductos/crear"}
                linkEditar={"/admin/referenciaProductos/editar"}
                onDelete={onDelete}
                getData={() => getData(paginaActual)}
            />
        </div>
    )
}

export default ReferenceProductsIndex