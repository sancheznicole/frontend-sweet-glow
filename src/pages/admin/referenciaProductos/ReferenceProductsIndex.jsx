import { useState, useEffect } from "react"
import { getAllReferenceProducts, deleteReferenceProduct } from "../../../services/referenceProductsService"
import AdminPanel from "../../../components/admin/AdminPanel"

const ReferenceProductsIndex = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(undefined)

    const fields = {
        id_referencia: "ID",
        codigo: "Código",
        color: "Color",
        tamano: "Tamaño",
        created_at: "Fecha creación"
    }

    async function getData() {
        try {
            const res = await getAllReferenceProducts(page)
            if (!res?.valid) {
                console.log(res?.error)
                return
            }
            setData(res?.references?.data)
            setLastPage(res?.references?.last_page)
        } catch (error) {
            console.log(error?.message)
        }
    }

    useEffect(() => {
        getData()
    }, [page])

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
                page={page}
                lastPage={lastPage}
                setPage={setPage}
                campos={fields}
                titulo={"Administración de referencias de productos"}
                texto={"Administra las referencias de los productos"}
                linkCrear={"/admin/referenciaProductos/crear"}
                linkEditar={"/admin/referenciaProductos/editar"}
                onDelete={onDelete}
                getData={getData}
            />
        </div>
    )
}

export default ReferenceProductsIndex