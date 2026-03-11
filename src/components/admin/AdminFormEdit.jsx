/*FORMULARIO DE EDITAR*/

import { Link } from "react-router-dom"

const AdminFormEdit = ({titulo, campos, onSendForm, error, fieldErrors, button, loading}) => {

	return (
		<div>
			<section>
				{/* titulo del formulario */}
				<h1>{titulo}</h1>

				{/* formulario */}
				<form
					onSubmit={async (e) => {
						e.preventDefault() // evita recargar la página
						await onSendForm() // ejecuta la función que envía datos
					}}
				>

					{/* recorrer los campos dinámicamente */}
					{Object.entries(campos).map(([key, value], index) => (

						<div key={index}>

							{/* titulo del campo */}
							<label htmlFor={value?.name}>
								{value?.titulo}
							</label>

							{/* input */}
							<input
								type={value?.type}
								name={value?.name}

								/* esto permite que en EDIT aparezcan los datos actuales */
								defaultValue={value?.value || ""}

								onChange={(e) => {
									value?.onChange(e.target.value)
								}}
							/>

							{/* error específico del campo */}
							<p>{fieldErrors?.[key] || ""}</p>

						</div>

					))}

					{/* botón enviar */}
					<button type="submit" disabled={loading}>
						{loading ? "Cargando..." : button}
					</button>

					{/* error general */}
					{error != "" && (
						<p>{error}</p>
					)}

				</form>

			</section>
		</div>
	)
}

export default AdminFormEdit


