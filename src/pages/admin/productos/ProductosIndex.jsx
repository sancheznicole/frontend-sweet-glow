import { useState, useEffect } from "react"
import { getAllProducts, deleteProduct } from "../../../services/productsService"
import AdminPanel from "../../../components/admin/AdminPanel"
import Loader from "../../../components/Loader"

const ProductosIndex = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const [page, setPage] = useState(1)
	const [limit, setLimit] = useState(5)
	const [lastPage, setLastPage] = useState(undefined)
	const [search, setSearch] = useState("")

	const fields = {
		id_producto: "Id producto",
		nombre: "Nombre",
		descripcion: "Descripción",
		precio: "Precio",
		tendencia: "Tendencia",
		descuento: "Descuento",
		prod_regalo: "Producto regalo",
		guia_regalo: "Guía regalo",
		premio: "Premio",
		stock: "Stock",
		categoria: "Categoría",
		marca: "Marca",
		referencia: "Referencia",
		created_at: "Fecha creación",
	}

	useEffect(() => {
        getData()
    }, [page, limit])

	async function getData() {
		try {
			setLoading(true)

			let res = await getAllProducts(page, limit, search)

			if (!res?.valid) {
				console.log(res?.error)
				return
			}

			const products = res.products.data.map(product => ({
				...product,

				// RELACIONES VISIBLES CON NOMBRES 
				categoria: product?.categoria?.nombre,
				marca: product?.marca?.nombre,
				referencia: `${product?.referencia_producto?.color} | ${product?.referencia_producto.tamano}`,
				guia_regalo: product?.guia_regalo?.nombre,

				precio: `$${parseInt(product?.precio).toLocaleString('en-US')}`,

				// BOOLEANOS EN TEXTO DE NEGOCIO

				tendencia:
					product.tendencia
						? "En tendencia"
						: "No está en tendencia",

				descuento:
					product.descuento
						? "Con descuento"
						: "Sin descuento",

				prod_regalo:
					product.prod_regalo
						? "Disponible como producto regalo"
						: "No disponible como regalo",

				premio:
					product.premio
						? "Producto premio"
						: "No aplica como premio"
			}))

			setData(products)
			setLastPage(Number(res?.products?.lastPage))

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
		const delayDebounce = setTimeout(() => {
			getData()
		}, 500)

		return () => clearTimeout(delayDebounce)
	}, [search])

	const onDelete = async (id) => {
		try {
			let res = await deleteProduct(id)
	
			if(!res?.valid) return res?.error
	
		} catch (error) {
				return error.message
		}
	}

	return (
		<div>
			{loading ? (
				<Loader text="Cargando productos..." />
			) : (
				<AdminPanel
					data={data}
					campos={fields}
					titulo={"Administración de productos"}
					texto={"Administra el catálogo de productos disponibles y actualiza su información dentro del sistema"}
					linkCrear={"/admin/products/create"}
					linkEditar={"/admin/products/edit"}
					onDelete={onDelete}
					getData={getData}
					limit={limit}
					setLimit={setLimit}
					setPage={setPage}
					page={setPage}
					lastPage={lastPage}
					search={search}
					setSearch={setSearch}
					enableSearch={true}
				/>
			)}
		</div>
	)
}

export default ProductosIndex
