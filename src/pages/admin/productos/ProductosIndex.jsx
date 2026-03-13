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

				// =========================================
				// RELACIONES VISIBLES
				// =========================================
				categoria: `Categoría ${product.id_categoria}`,
				marca: `Marca ${product.id_marca}`,
				referencia: `REF-${product.id_referencia}`,

				// =========================================
				// GUIA REGALO
				// Si existe id_guia se muestra la ocasión,
				// si no existe se muestra texto por defecto
				// =========================================
				guia_regalo:
					product.id_guia !== null
						? `Ocasión ${product.id_guia}`
						: "Sin guía asociada",

				// =========================================
				// BOOLEANOS EN TEXTO DE NEGOCIO
				// =========================================
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
				texto={"Gestión técnica de productos, relaciones y atributos comerciales"}
				linkCrear={"/admin/roles/crear"}
				linkEditar={"/admin/roles/editar"}
				onDelete={onDelete}
				getData={getData}
			/>
		</div>
	)
}

export default ProductosIndex
