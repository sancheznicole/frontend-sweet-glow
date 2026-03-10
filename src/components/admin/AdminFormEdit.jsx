/*FORMULARIO DE CREAR*/
import { Link } from "react-router-dom"

const AdminFormEdit = ({titulo, campos, onSendForm, linkRegresar, error, fieldErrors, button, loading}) => {

	return (
		<div>
			<section>
				<Link to={linkRegresar}>Regresar</Link>
				<h1>{titulo}</h1>

				{/* la funcion que se va a ejecutar cuando se envie el formulario */}
				<form method="put" onSubmit={async (e) => {
					e.preventDefault()
					await onSendForm()
				}}>
					{Object.entries(campos).map(([key, value], index) => (
						<div key={index}>
							<label htmlFor={value?.name}>{value?.titulo}</label>

							<input type={value?.type} name={value?.name} onChange={(e) => {value?.onChange(e.target.value)}}/>
							<p>{fieldErrors?.[key] || ''}</p>
						</div>
					))}

					<button type="submit" disabled={loading}>{loading ? 'Cargando...' : button} </button>

					{error != '' && (<p>{error}</p>)}
				</form>
			</section>
		</div>
	)
}

export default AdminFormEdit



