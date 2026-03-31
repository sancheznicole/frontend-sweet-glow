import { useState, useEffect } from "react"
import { getAllBrands, deleteBrand } from "../../../services/brands"
import AdminPanel from "../../../components/admin/AdminPanel"
import Loader from "../../../components/Loader"

const BrandsIndex = () => {
    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [lastPage, setLastPage] = useState(undefined)
    const [loading, setLoading] = useState(true)

    const fields = {
        id_marca: "ID",
        nombre: "Marca",
        pais_origen: "País origen",
        created_at: "Fecha creación",
    }

    async function getData() {
        try {
            setLoading(true)
            const res = await getAllBrands(page, limit, search)

            if (!res?.valid) {
                console.log(res?.error)
                return
            }

            const brands = res.brands.map(b => ({
                ...b,
                created_at: b.created_at ? b.created_at.split(" ")[0] : "",
            }))

            setData(brands)
            setLastPage(Number(res?.last_page ?? 1))

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
            const res = await deleteBrand(id)
            if (!res?.valid) return res?.error
        } catch (error) {
            return error.message
        }
    }

    return (
        <div>
            {loading ? (
                <Loader text="Cargando marcas..."></Loader>
            ) : (
                <AdminPanel
                    data={data}
                    campos={fields}
                    titulo={"Administración de marcas"}
                    texto={"Administra las marcas registradas"}
                    linkCrear={"/admin/brands/create"}
                    linkEditar={"/admin/brands/edit"}
                    onDelete={onDelete}
                    getData={getData}
                    page={page}
                    lastPage={lastPage}
                    setPage={setPage}
                    idKey="id_marca"
                    limit={limit}
                    search={search}
                    setLimit={setLimit}
                    setSearch={setSearch}
                    enableSearch={true}
                />
            )}
        </div>
    )
}

export default BrandsIndex