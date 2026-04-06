import { useState, useEffect } from "react"
import { getAllElementosCarrito, deleteElementoCarrito } from "../../../services/cartElementsService"
import AdminPanel from "../../../components/admin/AdminPanel"
import Loader from "../../../components/Loader"
import { parsePrice } from "../../../helpers/json.helpers"

const ElementosCarritos = () => {
	const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [lastPage, setLastPage] = useState(undefined)
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState("")

	const fields = {
		id_elemento_carrito: "ID",
		producto: "Producto",
		id_carrito: " Id carrito",
		cantidad: "Cantidad",
		price: "Precio"
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
			let res = await getAllElementosCarrito(page, limit, search)

			if (!res?.valid) {
				console.log(res?.error)
				return
			}

      		console.log(res?.elements)

			const elementosCarritos = res.elements.data.map(elementoCarrito => ({
				...elementoCarrito,

				producto: `${elementoCarrito?.producto?.nombre}`,
				price: parsePrice(elementoCarrito?.price)
			}))

			setData(elementosCarritos)
			setLastPage(res?.elements?.last_page)

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
			{loading ? (
				<Loader text="Cargando elementos de carritos..."></Loader>
			) : (
				<AdminPanel
					data={data}
					campos={fields}
					titulo={"Administración de elementos del carrito"}
					texto={"Gestiona los elementos de los carritos de compra"}
					linkCrear={"/admin/elements-cart/create"}
					linkEditar={"/admin/elements-cart/edit"}
					onDelete={onDelete}
					getData={getData}
					limit={limit}
					setLimit={setLimit}
					setPage={setPage}
					lastPage={lastPage}	
					page={page}
					search={search}
					setSearch={setSearch}
					enableSearch={true}
				/>
			)}
		</div>
	)
}

export default ElementosCarritos

