import { useEffect, useState } from 'react'
import { getAllGiftCards, deleteGiftCard } from '../../../services/giftCardService'
import AdminPanel from "../../../components/admin/AdminPanel"

const GiftCardsIndex = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [limit] = useState(10)
    const [lastPage, setLastPage] = useState(undefined)

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
            const res = await getAllGiftCards(page, limit)

            if (!res?.valid) {
                console.log("Error tarjetas:", res?.error)
                return
            }

            const tarjetas = res.tarjetas.map(t => ({
                ...t,
                usuario_nombre: t.usuario
                    ? `${t.usuario.nombres} ${t.usuario.apellidos}`
                    : `Usuario #${t.id_usuario}`,
                estado: t.estado === 'activa' ? '✅ Activa' : '❌ Usada'
            }))

            setData(tarjetas)
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
            const res = await deleteGiftCard(id)
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
            />
        </div>
    )
}

export default GiftCardsIndex