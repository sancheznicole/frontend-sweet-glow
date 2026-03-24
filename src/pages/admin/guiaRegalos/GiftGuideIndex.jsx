import { useState, useEffect } from "react"
import { getAllGiftGuides, deleteGiftGuide } from "../../../services/giftGuideService"
import AdminPanel from "../../../components/admin/AdminPanel"

const GiftGuideIndex = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(undefined)

    const fields = {
        id_guia: "ID",
        nombre: "Nombre",
        descripcion: "Descripción",
        created_at: "Fecha creación"
    }

    async function getData() {
        try {
            const res = await getAllGiftGuides(page)
            if (!res?.valid) {
                console.log(res?.error)
                return
            }
            setData(res?.giftGuides?.data)
            setLastPage(res?.giftGuides?.last_page)
        } catch (error) {
            console.log(error?.message)
        }
    }

    useEffect(() => {
        getData()
    }, [page])

    const onDelete = async (id) => {
        try {
            const res = await deleteGiftGuide(id)
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
                titulo={"Administración de guía de regalos"}
                texto={"Administra las guías de regalos"}
                linkCrear={"/admin/giftGuide/crear"}
                linkEditar={"/admin/giftGuide/editar"}
                onDelete={onDelete}
                getData={getData}
            />
        </div>
    )
}

export default GiftGuideIndex