import { useState, useEffect } from "react"
import { getAllGuias, deleteGuia } from "../../../services/giftGuideService"
import AdminPanel from "../../../components/admin/AdminPanel"

const GuiaRegalosIndex = () => {

    const [data, setData] = useState([])
    const [paginacion, setPaginacion] = useState(null)
    const [paginaActual, setPaginaActual] = useState(1)

    const fields = {
        id_guia: "ID",
        nombre: "Nombre",
        descripcion: "Descripción",
        created_at: "Fecha creación"
    }

    async function getData(page = 1) {
        try {
            const res = await getAllGuias(page)
            if (!res?.valid) {
                console.log(res?.error)
                return
            }
            setData(res?.data?.data)
            setPaginacion({
                current_page: res?.data?.current_page,
                last_page: res?.data?.last_page,
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
            const res = await deleteGuia(id)
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
                titulo={"Administración de guía de regalos"}
                texto={"Administra las guías de regalos"}
                linkCrear={"/admin/guiaRegalos/crear"}
                linkEditar={"/admin/guiaRegalos/editar"}
                onDelete={onDelete}
                getData={() => getData(paginaActual)}
            />
        </div>
    )
}

export default GuiaRegalosIndex