import { useState, useEffect } from "react"
import { getAllReferenceProducts, deleteReferenceProduct } from "../../../services/referenceProductsService"
import AdminPanel from "../../../components/admin/AdminPanel"
import Loader from "../../../components/Loader"

const ReferenceProductsIndex = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [lastPage, setLastPage] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    const fields = {
        id_referencia: "ID",
        codigo: "Código",
        color: "Color",
        tamano: "Tamaño",
        created_at: "Fecha creación"
    }

    async function getData() {
        try {
            setLoading(true)

            const res = await getAllReferenceProducts(page, limit, search)
            if (!res?.valid) {
                console.log(res?.error)
                return
            }
            setData(res?.references?.data)
            setLastPage(res?.references?.last_page)
        } catch (error) {
            console.log(error?.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [page, limit])

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            getData()
        }, 500)

        return () => clearTimeout(delayDebounce)
    }, [search])

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
            {loading ? (
                <Loader text="Cargando referencia productos..."></Loader>
            ) : (
                <AdminPanel
                    data={data}
                    page={page}
                    lastPage={lastPage}
                    setPage={setPage}
                    campos={fields}
                    titulo={"Administración de referencias de productos"}
                    texto={"Gestiona las referencias de los productos"}
                    linkCrear={"/admin/referenciaProductos/crear"}
                    linkEditar={"/admin/referenciaProductos/editar"}
                    onDelete={onDelete}
                    getData={getData}
                    limit={limit}
                    setLimit={setLimit}
                    search={search}
                    setSearch={setSearch}
                    enableSearch={true}
                />
            )}
        </div>
    )
}

export default ReferenceProductsIndex