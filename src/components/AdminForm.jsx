								/*FORMULARIO DE CREAR*/
import { Link } from "react-router-dom"

const AdminForm = ({titulo, campos, onSendForm, linkRegresar}) => {

	return (
		<div>
			<section>
				<Link to={linkRegresar}>Regresar</Link>
				<h1>{titulo}</h1>

				{/* la funcion que se va a ejecutar cuando se envie el formulario */}
				<form method="post" onSubmit={() => {onSendForm()}}>
					{Object.entries(campos).map(([key, value], index) => (
						<div key={index}>
							<label htmlFor={value?.name}>{value?.titulo}</label>
							<input type={value?.type} name={value?.name} onChange={(e) => {value?.onChange(e.target.value)}}/>
						</div>
					))}

					<input type="submit" value="Envíar" />
				</form>
			</section>
		</div>
	)
}

export default AdminForm