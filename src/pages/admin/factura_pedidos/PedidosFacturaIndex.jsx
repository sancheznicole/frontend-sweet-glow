import { useState, useEffect } from "react"
import { getAllInvoiceOrders, deleteInvoiceOrders } from "../../../services/facturaPedidosService"
import AdminPanel from "../../../components/admin/AdminPanel"

const PedidosFacturaIndex = () => {
	const [data, setData] = useState([])

	const fields = {
		id_factura_pedido: "Id factura",
		usuario: "Usuario",
		id_carrito: "Carrito",
		tarjeta: "Tarjeta regalo",
		neto: "Neto", 
		descuento: "Descuento",
		status: "Estado",
		created_at: "Fecha de creacion"
	}

	async function getData() {
		try {
			let res = await getAllInvoiceOrders()

			if (!res?.valid) {
				console.log(res?.error)
				return
			}

      		console.log(res?.InvoiceOrders)

			const facturas = res.InvoiceOrders.data.map(factura => ({
				...factura,

				usuario: `${factura?.usuario?.nombres} ${factura?.usuario?.apellidos}`,
				neto: `$${parseInt(factura?.neto).toLocaleString('en-US')}`,
				descuento: `$${parseInt(factura?.descuento).toLocaleString('en-US')}`,
				tarjeta: factura?.id_tarjeta ? factura?.id_tarjeta : "No aplica",
				status: factura?.status == 'pending' ? "Pendiente" : factura?.status == 'paid' ? "Pagado" : factura?.status == 'failed' ? "Fallida" : 'Desconocido'
			}))

			setData(facturas)

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
			let res = await deleteInvoiceOrders(id)

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
				titulo={"Administración de facturas"}
				texto={"Administra las facturas registradas dentro del sistema"}
				linkCrear={"/admin/invoice-orders/create"}
				linkEditar={"/admin/invoice-orders/edit"}
				onDelete={onDelete}
				getData={getData}
			/>
		</div>
	)
}

export default PedidosFacturaIndex

