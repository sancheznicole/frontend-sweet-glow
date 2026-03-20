import { useState, useEffect } from "react"
import { getAllWinners, deleteWinner } from "../../../services/winnersService"
import AdminPanel from "../../../components/admin/AdminPanel"

const AwardedIndex = () => {

    const [data, setData] = useState([])
    const [paginacion, setPaginacion] = useState(null)
    const [paginaActual, setPaginaActual] = useState(1)

    const fields = {
        id_premiado: "ID",
        "usuario.nombres": "Usuario",
        "premio.id_premio": "Premio",
        created_at: "Fecha creación"
    }

    async function getData(page = 1) {
        try {
            const res = await getAllWinners(page)
            if (!res?.valid) {
                console.log(res?.error)
                return
            }
            setData(res?.winners?.data)
            setPaginacion({
                current_page: res?.winners?.current_page,
                last_page: res?.winners?.last_page,
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
                paginacion={paginacion}
                onPageChange={(page) => setPaginaActual(page)}
                campos={fields}
                titulo={"Administración de premiados"}
                texto={"Administra los premiados"}
                linkCrear={"/admin/premiados/crear"}
                linkEditar={"/admin/premiados/editar"}
                onDelete={onDelete}
                getData={() => getData(paginaActual)}
            />
        </div>
    )
}

export default AwardedIndex