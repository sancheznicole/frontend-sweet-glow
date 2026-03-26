import { useState, useEffect } from "react"
import { getAllCategories, deleteCategory } from "../../../services/categoriesService"
import AdminPanel from "../../../components/admin/AdminPanel"

const CategoriesIndex = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [limit] = useState(10)
    const [lastPage, setLastPage] = useState(undefined)

    const fields = {
        id_categoria: "ID",
        nombre: "Categoría",
        created_at: "Fecha creación",
    }

    async function getData() {
        try {

            const res = await getAllCategories(page, limit)

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
        }
    }

    useEffect(() => {
        getData()
    }, [page])

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
            />
        </div>
    )
}

export default CategoriesIndex