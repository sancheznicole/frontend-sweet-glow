import { useState, useEffect } from "react"
import { getAllElementosCarrito, deleteElementoCarrito } from "../../../services/cartElementsService"
import AdminPanel from "../../../components/admin/AdminPanel"

const ElementosCarritos = () => {
	const [data, setData] = useState([])

	const fields = {
		id_elemento_carrito: "Id elemento carrito",
		producto: "Producto",
		id_carrito: " Id carrito",
		cantidad: "Cantidad",
		price: "Precio"
	}

	async function getData() {
		try {
			let res = await getAllElementosCarrito()

			if (!res?.valid) {
				console.log(res?.error)
				return
			}

      		console.log(res?.elements)

			const elementosCarritos = res.elements.data.map(elementoCarrito => ({
				...elementoCarrito,

				producto: `${elementoCarrito?.producto?.nombre}`,
			}))

			setData(elementosCarritos)

		} catch (error) {
			console.log(error?.message)
		}
	}

	useEffect(() => {
		getData()
	}, [])

  	console.log(data)

	const onDelete = async (id) => {
		try {
			let res = await deleteElementoCarrito(id)

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
				titulo={"Administración de elementos del carrito"}
				texto={"Administra "}
				linkCrear={"/admin/elements-cart/create"}
				linkEditar={"/admin/elements-cart/edit"}
				onDelete={onDelete}
				getData={getData}
			/>
		</div>
	)
}

export default ElementosCarritos

