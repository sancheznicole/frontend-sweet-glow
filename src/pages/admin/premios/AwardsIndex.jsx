import { useState, useEffect } from "react"
import { getAllAwards, deleteAward } from "../../../services/awardsService"
import AdminPanel from "../../../components/admin/AdminPanel"
import Loader from "../../../components/Loader"

const AwardsIndex = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")
    const [lastPage, setLastPage] = useState(undefined)
    const [limit, setLimit] = useState(5)

    // Campos para mostrar en la tabla
    const fields = {
        id_premio: "ID",
        producto: "Producto",
        created_at: "Fecha creación"
    }

    async function getData() {
        try {
            const res = await getAllAwards(page, limit, search)
            if (!res?.valid) {
                console.log(res?.error)
                return
            }

            // Procesar para extraer nombre del producto
            const processedAwards = res.awards.data.map(award => ({
                ...award,
                producto: award.producto?.nombre || ""
            }))

            setData(processedAwards)
            setLastPage(res.awards.last_page)
        } catch (error) {
            console.log(error?.message)
        } finally{
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
            const res = await deleteAward(id)
            if (!res?.valid) return res?.error
            // Opcional: refrescar datos tras eliminar
            getData()
        } catch (error) {
            return error.message
        }
    }

    if(loading) return <Loader text="Cargando premios..."></Loader>

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
                limit={limit}
                search={search}
                setLimit={setLimit}
                setSearch={setSearch}
                enableSearch={true}
            />
        </div>
    )
}

export default AwardsIndex