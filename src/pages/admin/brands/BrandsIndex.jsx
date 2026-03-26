import { useState, useEffect } from "react"
import { getAllBrands, deleteBrand } from "../../../services/brands"
import AdminPanel from "../../../components/admin/AdminPanel"

const BrandsIndex = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [limit] = useState(10)
    const [lastPage, setLastPage] = useState(undefined)

    const fields = {
        id_marca: "ID",
        nombre: "Marca",
        pais_origen: "País origen",
        created_at: "Fecha creación",
    }

    async function getData() {
        try {
            const res = await getAllBrands(page, limit)

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
        }
    }

    useEffect(() => {
        getData()
    }, [page])

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
            />
        </div>
    )
}

export default BrandsIndex