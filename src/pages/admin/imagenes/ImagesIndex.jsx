import { useState, useEffect } from "react"
import { getAllImages, deleteImage } from "../../../services/imagesService"
import AdminPanel from "../../../components/admin/AdminPanel"
import Loader from "../../../components/Loader"

const ImagesIndex = () => {
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(undefined)
    const [limit, setLimit] = useState(5)

    // Cambié fields para usar la nueva clave 'producto_nombre'
    const fields = {
        id_imagen: "ID",
        producto_nombre: "Producto",
        created_at: "Fecha creación"
    }

    async function getData() {
        try {
            const res = await getAllImages(page, limit, search)
            if (!res?.valid) {
                console.log(res?.error)
                return
            }
            setData(res?.images?.data)
            setLastPage(res?.images?.last_page)
        } catch (error) {
            console.log(error?.message)
        } finally {
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

    if(loading) return <Loader text="Cargando imagenes..."></Loader>

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
                limit={limit}
                search={search}
                setLimit={setLimit}
                setSearch={setSearch}
                enableSearch={true}
            />
        </div>
    )
}

export default ImagesIndex