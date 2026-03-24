import { useState, useEffect } from "react"
import { getAllAwards, deleteAward } from "../../../services/awardsService"
import AdminPanel from "../../../components/admin/AdminPanel"

const AwardsIndex = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(undefined)

    const fields = {
        id_premio: "ID",
        "producto.nombre": "Producto",
        created_at: "Fecha creación"
    }

    async function getData() {
        try {
            const res = await getAllAwards(page)
            if (!res?.valid) {
                console.log(res?.error)
                return
            }
            setData(res?.awards?.data)
            setLastPage(res?.awards?.last_page)
        } catch (error) {
            console.log(error?.message)
        }
    }

    useEffect(() => {
        getData()
    }, [page])

    const onDelete = async (id) => {
        try {
            const res = await deleteAward(id)
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
                titulo={"Administración de premios"}
                texto={"Administra los premios de los productos"}
                linkCrear={"/admin/premios/crear"}
                linkEditar={"/admin/premios/editar"}
                onDelete={onDelete}
                getData={getData}
            />
        </div>
    )
}

export default AwardsIndex