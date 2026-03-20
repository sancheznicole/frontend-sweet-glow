import { useState, useEffect } from "react"
import { getAllImages, deleteImage } from "../../../services/imagesService"
import AdminPanel from "../../../components/admin/AdminPanel"

const ImagesIndex = () => {

    const [data, setData] = useState([])
    const [paginacion, setPaginacion] = useState(null)
    const [paginaActual, setPaginaActual] = useState(1)

    const fields = {
        id_imagen: "ID",
        "producto.nombre": "Producto",
        created_at: "Fecha creación"
    }

    async function getData(page = 1) {
        try {
            const res = await getAllImages(page)
            if (!res?.valid) {
                console.log(res?.error)
                return
            }
            setData(res?.images?.data)
            setPaginacion({
                current_page: res?.images?.current_page,
                last_page: res?.images?.last_page,
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
            const res = await deleteImage(id)
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
                titulo={"Administración de imágenes"}
                texto={"Administra las imágenes de los productos"}
                linkCrear={"/admin/imagenes/crear"}
                linkEditar={"/admin/imagenes/editar"}
                onDelete={onDelete}
                getData={() => getData(paginaActual)}
            />
        </div>
    )
}

export default ImagesIndex