import { useState, useEffect } from "react"
import { getAllInvoiceOrders, deleteInvoiceOrders } from "../../../services/facturaPedidosService"
import AdminPanel from "../../../components/admin/AdminPanel"
import Loader from "../../../components/Loader"

const PedidosFacturaIndex = () => {
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState([])
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(5)
	const [lastPage, setLastPage] = useState(undefined)
	const [search, setSearch] = useState('')

	const fields = {
		id_factura_pedido: "ID",
		usuario: "Usuario",
		id_carrito: "Carrito",
		tarjeta: "Tarjeta regalo",
		neto: "Neto", 
		descuento: "Descuento",
		status: "Estado",
		created_at: "Fecha de creacion"
	}

	useEffect(() => {
        const delayDebounce = setTimeout(() => {
            getData()
        }, 500)

        return () => clearTimeout(delayDebounce)
    }, [search])

	async function getData() {
		try {
			setLoading(true)

			let res = await getAllInvoiceOrders(page, limit, search)

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
			setPage(res?.InvoiceOrders?.current_page)
			setLastPage(res?.InvoiceOrders?.last_page)

		} catch (error) {
			console.log(error?.message)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	useEffect(() => {
        getData()
    }, [page, limit])

  	console.log(search)

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
			{loading ? (
				<Loader text="Cargando facturas..."></Loader>
			) : (
				<AdminPanel
					data={data}
					campos={fields}
					titulo={"Administración de facturas"}
					texto={"Administra las facturas registradas dentro del sistema"}
					linkCrear={"/admin/invoice-orders/create"}
					linkEditar={"/admin/invoice-orders/edit"}
					onDelete={onDelete}
					getData={getData}
					setPage={setPage}
					page={page}
					lastPage={lastPage}
					limit={limit}
					setLimit={setLimit}
					setSearch={setSearch}
					enableSearch={true}
					search={search}
				/>
			)}
		</div>
	)
}

export default PedidosFacturaIndex

