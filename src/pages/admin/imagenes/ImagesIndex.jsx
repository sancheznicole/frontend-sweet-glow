import { useState, useEffect } from "react"
import { getAllImages, deleteImage } from "../../../services/imagesService"
import AdminPanel from "../../../components/admin/AdminPanel"

const ImagesIndex = () => {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(undefined)

    // Cambié fields para usar la nueva clave 'producto_nombre'
    const fields = {
        id_imagen: "ID",
        producto_nombre: "Producto",
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

    // Aquí proceso data para agregar 'producto_nombre' desde la propiedad anidada
    const processedData = data.map(item => ({
        ...item,
        producto_nombre: item.producto?.nombre || ""
    }))

    return (
        <div>
            <AdminPanel
                data={processedData}  // Uso processedData aquí
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