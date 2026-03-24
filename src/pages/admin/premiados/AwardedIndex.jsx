import { useState, useEffect } from "react"
import { getAllWinners, deleteWinner } from "../../../services/winnersService"
import AdminPanel from "../../../components/admin/AdminPanel"

const AwardedIndex = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(undefined)

    const fields = {
        id_premiado: "ID",
        "usuario.nombres": "Usuario",
        "premio.id_premio": "Premio",
        created_at: "Fecha creación"
    }

    async function getData() {
        try {
            const res = await getAllWinners(page)
            if (!res?.valid) {
                console.log(res?.error)
                return
            }
            setData(res?.winners?.data)
            setLastPage(res?.winners?.last_page)
        } catch (error) {
            console.log(error?.message)
        }
    }

    useEffect(() => {
        getData()
    }, [page])

    const onDelete = async (id) => {
        try {
            const res = await deleteWinner(id)
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
                titulo={"Administración de premiados"}
                texto={"Administra los premiados"}
                linkCrear={"/admin/premiados/crear"}
                linkEditar={"/admin/premiados/editar"}
                onDelete={onDelete}
                getData={getData}
            />
        </div>
    )
}

export default AwardedIndex