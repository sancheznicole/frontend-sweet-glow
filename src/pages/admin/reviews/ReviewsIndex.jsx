import { useState, useEffect } from "react"
import { getAllReviews, deleteReview } from "../../../services/reviewsService"
import AdminPanel from "../../../components/admin/AdminPanel"

const ReviewsIndex = () => {

	const [data, setData] = useState([])

	const fields = {
		id_resena: "ID",
		resena: "Reseña",
		id_producto: "Producto",
		id_usuario: "Usuario",
		created_at: "Fecha creación"
	}

	async function getData(){

		try{

			const res = await getAllReviews()

			if(!res?.valid){
				console.log(res?.error)
				return
			}

			setData(res?.reviews)

		}catch(error){

			console.log(error?.message)

		}

	}

	useEffect(()=>{

		getData()

	},[])

	const onDelete = async(id)=>{

		try{

			const res = await deleteReview(id)

			if(!res?.valid) return res?.error

		}catch(error){

			return error.message

		}

	}

	return(

		<div>

			<AdminPanel
				data={data}
				campos={fields}
				titulo={"Administración de reseñas"}
				texto={"Administra las reseñas de los productos"}
				linkCrear={"/admin/reviews/crear"}
				linkEditar={"/admin/reviews/editar"}
				onDelete={onDelete}
				getData={getData}
			/>

		</div>

	)

}

export default ReviewsIndex