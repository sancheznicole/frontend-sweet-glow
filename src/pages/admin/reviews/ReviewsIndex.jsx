import { useEffect, useState } from 'react'
import { getAllReviews, deleteReview } from '../../../services/reviewsService'
import AdminPanel from "../../../components/admin/AdminPanel"
import Loader from '../../../components/Loader'

const ReviewsIndex = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [lastPage, setLastPage] = useState(undefined)
    const [search, setSearch] = useState("")

    const fields = {
        "id_resena":        "ID",
        "categoria_nombre": "Categoría",
        "marca_nombre":     "Marca",
        "producto_nombre":  "Producto",
        "usuario_nombre":   "Usuario",
        "resena":           "Calificación",
        "created_at":       "Fecha creación"
    }

    async function getData() {
        try {
            setLoading(true)
            const res = await getAllReviews(page, limit, search)

            if (!res?.valid) {
                console.log("Error reviews:", res?.error)
                return
            }

            const lista = Array.isArray(res) ? res : (res.resenas ?? [])

            const reviews = lista.map(review => ({
                ...review,
                // El backend ya trae producto.categoria.nombre y producto.marca.nombre
                categoria_nombre: review.producto?.categoria?.nombre ?? '—',
                marca_nombre:     review.producto?.marca?.nombre ?? '—',
                producto_nombre:  review.producto?.nombre ?? `Producto #${review.id_producto}`,
                usuario_nombre:   review.usuario
                    ? `${review.usuario.nombres} ${review.usuario.apellidos}`
                    : `Usuario #${review.id_usuario}`,
                resena: `${'★'.repeat(review.resena)}${'☆'.repeat(5 - review.resena)} (${review.resena}/5)`
            }))

            setData(reviews)
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
            const res = await deleteReview(id)
            if (!res?.valid) return res?.error
        } catch (error) {
            return error.message
        }
    }

    return (
        <div>
            {loading ? (
                <Loader text='Cargando reseñas...'></Loader>
            ) : (
                <AdminPanel
                    data={data}
                    campos={fields}
                    titulo={"Administración de reseñas"}
                    texto={"Administra las reseñas de productos realizadas por los usuarios"}
                    linkCrear={"/admin/reviews/create"}
                    linkEditar={"/admin/reviews/edit"}
                    onDelete={onDelete}
                    getData={getData}
                    page={page}
                    lastPage={lastPage}
                    setPage={setPage}
                    idKey="id_resena"
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

export default ReviewsIndex