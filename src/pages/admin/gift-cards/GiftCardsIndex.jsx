import { useEffect, useState } from 'react'
import { getAllOrSearch, deleteGiftCard } from '../../../services/giftCardService'
import AdminPanel from "../../../components/admin/AdminPanel"
import Loader from '../../../components/Loader'

const GiftCardsIndex = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [lastPage, setLastPage] = useState(undefined)
    const [search, setSearch] = useState("")

    const fields = {
        "id_tarjeta":       "Id Tarjeta",
        "usuario_nombre":   "Usuario",
        "monto":            "Monto",
        "estado":           "Estado",
        "fecha_expiracion": "Vencimiento",
        "fecha_de_uso":     "Fecha de uso",
        "created_at":       "Fecha creación"
    }

    async function getData() {
        try {
            setLoading(true)
            const res = await getAllOrSearch(page, limit, search)

            if (!res?.valid) {
                console.log("Error tarjetas:", res?.error)
                return
            }

            const tarjetas = res.tarjetas.map(t => ({
                ...t,
                usuario_nombre: t.usuario
                    ? `${t.usuario.nombres} ${t.usuario.apellidos}`
                    : `Usuario #${t.id_usuario}`,
                estado: t.estado === 'activa' ? 'Activa' : 'Usada',
                // Agrega estas 3 líneas:
                fecha_expiracion: t.fecha_expiracion ? t.fecha_expiracion.split(" ")[0] : "",
                fecha_de_uso:     t.fecha_de_uso     ? t.fecha_de_uso.split(" ")[0]     : "",
                created_at:       t.created_at       ? t.created_at.split(" ")[0]       : "",
            }))
            
            setData(tarjetas)
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
            const res = await deleteGiftCard(id)
            if (!res?.valid) return res?.error
        } catch (error) {
            return error.message
        }
    }

    return (
        <div>
            {loading ? (
                <Loader text='Cargando tarjetas de regalo...'></Loader>
            ) : (
                <AdminPanel
                    data={data}
                    campos={fields}
                    titulo={"Administración de tarjetas regalo"}
                    texto={"Gestiona las tarjetas regalo asignadas a los usuarios"}
                    linkCrear={"/admin/gift-cards/create"}
                    linkEditar={"/admin/gift-cards/edit"}
                    onDelete={onDelete}
                    getData={getData}
                    page={page}
                    lastPage={lastPage}
                    setPage={setPage}
                    idKey="id_tarjeta"
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

export default GiftCardsIndex