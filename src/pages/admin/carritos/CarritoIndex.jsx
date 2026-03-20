import { useState, useEffect } from "react"
import { getAllCart, deleteCart } from "../../../services/cartService"
import AdminPanel from "../../../components/admin/AdminPanel"

const CarritoIndex = () => {
	const [data, setData] = useState([])

	const fields = {
		id_carrito: "Id carrito",
		documento_usuario: "Documento Usuario",
		usuario: "Usuario",
		cantidad: "Cantidad",
		descuento: "Descuento",
		producto: "Producto",
		id_factura_pedido: "Id factura",
		id_tarjeta: "Id tarjeta",
		created_at: "Fecha creación",
	}

	async function getData() {
		try {
			let res = await getAllCart()

			if (!res?.valid) {
				console.log(res?.error)
				return
			}

			const carts = res.carts.data.map(cart => ({
				...cart,

				documento_usuario: cart?.usuario?.num_documento,
				usuario: `${cart?.usuario?.nombres} ${cart?.usuario?.apellidos}`,
				producto: cart?.producto?.nombre,

				descuento: `$ ${cart.descuento.slice(0, -3)}`

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
				onDelete={onDelete}
				getData={getData}
			/>
		</div>
	)
}

export default CarritoIndex
