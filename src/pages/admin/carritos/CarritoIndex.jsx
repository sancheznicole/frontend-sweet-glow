import { useState, useEffect } from "react"
import { getAllCart, deleteCart } from "../../../services/cartService"
import AdminPanel from "../../../components/admin/AdminPanel"

const CarritoIndex = () => {
	const [data, setData] = useState([])

	const fields = {
		id_carrito: "Id carrito",
		usuario: "Usuario",
		elementos: "Elementos",
		status: "Estado",
		created_at: "Fecha creación",
	}

	async function getData() {
		try {
			let res = await getAllCart()

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

		} catch (error) {
			console.log(error?.message)
		}
	}

	useEffect(() => {
		getData()
	}, [])

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
			/>
		</div>
	)
}

export default CarritoIndex
