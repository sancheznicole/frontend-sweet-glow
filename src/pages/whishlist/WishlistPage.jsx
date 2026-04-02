import ProductCards from "../../components/ProductsCards"
import { normalizeProducts } from "../../helpers/json.helpers"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const WishlistPage = () => {
	const list = localStorage.getItem("wishlist")
	const wishList = list != null ? JSON.parse(list) : list
	const [data, setData] = useState(undefined)

	function processData(){
		if(wishList) setData(normalizeProducts(wishList))
	}

	useEffect(() => {
		processData()
	}, [])

	useEffect(() => {
		const update = () => {
			const stored = localStorage.getItem("wishlist")
			const parsed = stored ? JSON.parse(stored) : {}

			setData(normalizeProducts(parsed))
		}

		update() // carga inicial

		window.addEventListener("wishlistUpdated", update)

		return () => window.removeEventListener("wishlistUpdated", update)
	}, [])

	return (
		<div>
			<h1 className="page-title">Tu lista de deseos</h1>
			{data && data?.length > 0 ? (
				<ProductCards data={data} showDeletion={true}></ProductCards>
			) : (
				<div className="wishlist-information">
					<p>Parece que tu lista de deseos está vacía</p>
					<p>Te invitamos a que mires mas de nuestros productos</p>
					<Link to={"/"}>Mira mas de nuestros productos aquí</Link>
				</div>
			)}
		</div>
	)
}

export default WishlistPage