import { useState, useEffect } from "react"
import { getAllCart, deleteCart } from "../../../services/cartService"
import AdminPanel from "../../../components/admin/AdminPanel"
import Loader from "../../../components/Loader"

const CarritoIndex = () => {
	const [data, setData] = useState([])
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(5)
	const [lastPage, setLastPage] = useState(undefined)
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState("")

	const fields = {
		id_carrito: "ID",
		usuario: "Usuario",
		elementos: "Elementos",
		status: "Estado",
		created_at: "Fecha creación",
	}

	async function getData() {
		try {
			setLoading(true)
			let res = await getAllCart(page, limit, search)

			if (!res?.valid) {
				console.log(res?.error)
				return
			}

			console.log(res?.carts?.data)

			const carts = res.carts.data.map(cart => ({
				...cart,
				usuario: `${cart?.usuario?.nombres} ${cart?.usuario?.apellidos}`,
				status: cart?.status == "active" ? "Activo" : cart?.status == "checked_out" ? "Procesado" : 'Desconocido'
			}))

			setData(carts)
			setLastPage(res?.carts?.last_page)

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
	}, [])

	useEffect(() => {
		getData()
	}, [page, limit])

	const onDelete = async (id) => {
		try {
			let res = await deleteCart(id)

			if (!res?.valid) return res?.error

			getData()

		} catch (error) {
			return error.message
		}
	}

	return (
		<div>
			{loading ? (
				<Loader text="Cargando carritos..."></Loader>
			) : (
				<AdminPanel
					data={data}
					campos={fields}
					titulo={"Administración de carritos"}
					texto={"Administra los carritos de compra registrados dentro del sistema"}
					linkCrear={"/admin/cart/create"}
					linkEditar={"/admin/cart/edit"}
					elementsLink="/admin/elements-cart/edit"
					onDelete={onDelete}
					getData={getData}
					limit={limit}
					lastPage={lastPage}
					setLimit={setLimit}
					setPage={setPage}
					page={page}
					search={search}
					setSearch={setSearch}
					enableSearch={true}
				/>
			)}
		</div>
	)
}

export default CarritoIndex
