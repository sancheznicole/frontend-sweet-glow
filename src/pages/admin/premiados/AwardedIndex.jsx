import { useState, useEffect } from "react"
import { getAllWinners, deleteWinner } from "../../../services/winnersService"
import AdminPanel from "../../../components/admin/AdminPanel"
import Loader from "../../../components/Loader"

const AwardedIndex = () => {
    const [loading, setLoading] = useState(true)
    const [limit, setLimit] = useState(5)
    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(undefined)

    const fields = {
        id_premiado: "ID",
        usuario: "Usuario",
        premio: "Premio",
        created_at: "Fecha creación"
    }

    async function getData() {
        try {
            const res = await getAllWinners(page, limit, search)
            if (!res?.valid) {
                console.log(res?.error)
                return
            }

            // Procesar los datos para extraer propiedades planas y mostrar nombre del producto
            const processedWinners = res.winners.data.map(winner => ({
                ...winner,
                usuario: winner.usuario ? `${winner.usuario.nombres} ${winner.usuario.apellidos}` : "",
                premio: winner.premio?.producto?.nombre || `ID ${winner.premio.id_producto}`
            }))

            setData(processedWinners) // Actualizamos el estado con los datos procesados
            setLastPage(res.winners.last_page)

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
            const res = await deleteWinner(id)
            if (!res?.valid) return res?.error
            getData() // Refrescar lista tras eliminar
        } catch (error) {
            return error.message
        }
    }

    if(loading) return <Loader text="Cargando premiados..."></Loader>

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
                limit={limit}
                search={search}
                setLimit={setLimit}
                setSearch={setSearch}
                enableSearch={true}
            />
        </div>
    )
}

export default AwardedIndex