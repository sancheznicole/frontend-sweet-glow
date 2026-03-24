import { useState, useEffect } from "react"
import { getAllImages, deleteImage } from "../../../services/imagesService"
import AdminPanel from "../../../components/admin/AdminPanel"

const ImagesIndex = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(undefined)

    const fields = {
        id_imagen: "ID",
        "producto.nombre": "Producto",
        created_at: "Fecha creación"
    }

    async function getData() {
        try {
            const res = await getAllImages(page)
            if (!res?.valid) {
                console.log(res?.error)
                return
            }
            setData(res?.images?.data)
            setLastPage(res?.images?.last_page)
        } catch (error) {
            console.log(error?.message)
        }
    }

    useEffect(() => {
        getData()
    }, [page])

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
                page={page}
                lastPage={lastPage}
                setPage={setPage}
                campos={fields}
                titulo={"Administración de imágenes"}
                texto={"Administra las imágenes de los productos"}
                linkCrear={"/admin/imagenes/crear"}
                linkEditar={"/admin/imagenes/editar"}
                onDelete={onDelete}
                getData={getData}
            />
        </div>
    )
}

export default ImagesIndex