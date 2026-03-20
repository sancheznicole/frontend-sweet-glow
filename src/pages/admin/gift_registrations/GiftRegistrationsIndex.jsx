import { useEffect, useState } from 'react'
import { getAllGiftRegistrations, deleteGiftRegistration } from '../../../services/giftRegistrationService'
import AdminPanel from "../../../components/admin/AdminPanel"

const GiftRegistrationsIndex = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)

    const fields = {
        "id_inscripcion":     "Id",
        "usuario_nombre":     "Usuario",
        "factura_id":         "Factura",
        "estado":             "Estado",
        "created_at":      "Fecha creación",
    }

    async function getData() {
        try {
            const res = await getAllGiftRegistrations()

            if (!res?.valid) {
                console.log("Error inscripciones:", res?.error)
                return
            }

            const inscripciones = res.inscripciones.map(i => ({
                ...i,
                usuario_nombre: i.usuario
                    ? `${i.usuario.nombres} ${i.usuario.apellidos}`
                    : `Usuario #${i.id_usuario}`,
                factura_id: i.factura
                    ? `#${i.id_factura_pedido}`
                    : `#${i.id_factura_pedido}`,
                estado: i.estado ?? '—',
                created_at: i.created_at ? i.created_at.split(" ")[0] : "—",  // ← agrega esta línea
            }))

            setData(inscripciones)
            setLastPage(1)

        } catch (error) {
            console.log(error?.message)
        }
    }

    useEffect(() => {
        getData()
    }, [page])

    const onDelete = async (id) => {
        try {
            const res = await deleteGiftRegistration(id)
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
                titulo={"Administración de inscripciones regalo"}
                texto={"Gestiona las inscripciones de regalo de los usuarios"}
                linkCrear={"/admin/gift_registrations/create"}
                linkEditar={"/admin/gift_registrations/edit"}
                onDelete={onDelete}
                getData={getData}
                page={page}
                lastPage={lastPage}
                setPage={setPage}
                idKey="id_inscripcion"
            />
        </div>
    )
}

export default GiftRegistrationsIndex