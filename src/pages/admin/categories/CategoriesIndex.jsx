import { useState, useEffect } from "react"
import { getAllCategories, deleteCategory } from "../../../services/categoriesService"
import AdminPanel from "../../../components/admin/AdminPanel"
import Loader from "../../../components/Loader"

const CategoriesIndex = () => {
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [lastPage, setLastPage] = useState(undefined)

    const fields = {
        id_categoria: "ID",
        nombre: "Categoría",
        created_at: "Fecha creación",
    }

    async function getData() {
        try {
            setLoading(true)
            const res = await getAllCategories(page, limit, search)

            if (!res?.valid) {
                console.log(res?.error)
                return
            }

            const categories = res.categories.map(c => ({
                ...c,
                created_at: c.created_at ? c.created_at.split(" ")[0] : "",
            }))

            setData(categories)
            setLastPage(Number(res?.last_page ?? 1))

        } catch (error) {
            console.log(error?.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            getData()
        }, 500)

        return () => clearTimeout(delayDebounce)
    }, [search])

    useEffect(() => {
        getData()
    }, [page, limit])

    const onDelete = async (id) => {
        try {
            const res = await deleteCategory(id)
            if (!res?.valid) return res?.error
        } catch (error) {
            return error.message
        }
    }

    return (
        <div>
            {loading ? (
                <Loader text="Cargando categorías..."></Loader>
            ) : (
                <AdminPanel
                    data={data}
                    campos={fields}
                    titulo={"Administración de categorías"}
                    texto={"Administra las categorías de los productos"}
                    linkCrear={"/admin/categories/create"}
                    linkEditar={"/admin/categories/edit"}
                    onDelete={onDelete}
                    getData={getData}
                    page={page}
                    lastPage={lastPage}
                    setPage={setPage}
                    idKey="id_categoria"
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

export default CategoriesIndex