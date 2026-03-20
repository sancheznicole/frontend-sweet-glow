import { useState, useEffect } from "react"
import { getAllAwards, deleteAward } from "../../../services/awardsService"
import AdminPanel from "../../../components/admin/AdminPanel"

const AwardsIndex = () => {

    const [data, setData] = useState([])
    const [paginacion, setPaginacion] = useState(null)
    const [paginaActual, setPaginaActual] = useState(1)

    const fields = {
        id_premio: "ID",
        "producto.nombre": "Producto",  // ← cambio aquí
        created_at: "Fecha creación"
    }

    async function getData(page = 1) {
        try {
            const res = await getAllAwards(page)
            if (!res?.valid) {
                console.log(res?.error)
                return
            }
            setData(res?.awards?.data)
            setPaginacion({
                current_page: res?.awards?.current_page,
                last_page: res?.awards?.last_page,
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
                paginacion={paginacion}
                onPageChange={(page) => setPaginaActual(page)}
                campos={fields}
                titulo={"Administración de premios"}
                texto={"Administra los premios de los productos"}
                linkCrear={"/admin/premios/crear"}
                linkEditar={"/admin/premios/editar"}
                onDelete={onDelete}
                getData={() => getData(paginaActual)}
            />
        </div>
    )
}

export default AwardsIndex