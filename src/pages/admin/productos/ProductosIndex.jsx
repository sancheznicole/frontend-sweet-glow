import { useState, useEffect } from "react"
import { getAllProducts, deleteProduct } from "../../../services/productsService"
import AdminPanel from "../../../components/admin/AdminPanel"

const ProductosIndex = () => {
	const [data, setData] = useState([])

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

	async function getData() {
		try {
			let res = await getAllProducts()

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

		} catch (error) {
			console.log(error?.message)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	const onDelete = async (id) => {
		try {
			let res = await deleteProduct(id)

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
				titulo={"Administración de productos"}
				texto={"Administra el catálogo de productos disponibles y actualiza su información dentro del sistema"}
				linkCrear={"/admin/products/create"}
				linkEditar={"/admin/products/edit"}
				onDelete={onDelete}
				getData={getData}
			/>
		</div>
	)
}

export default ProductosIndex
