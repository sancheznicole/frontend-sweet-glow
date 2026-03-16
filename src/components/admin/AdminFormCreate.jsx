/*FORMULARIO DE CREAR*/
import { Link } from "react-router-dom"

const AdminFormCreate = ({titulo, campos, onSendForm, linkRegresar, error, fieldErrors, button, loading}) => {

	return (
		<div>
			<div className="back-link-container">
        		<Link className="link-regresar" to={linkRegresar}>Regresar</Link>
      		</div>

			<section className="section-create-admin">

				<h1 className="titulo-por-h1">{titulo}</h1>

				{/* la funcion que se va a ejecutar cuando se envie el formulario */}
				<form method="post" onSubmit={async (e) => {
					e.preventDefault()
					await onSendForm()
				}}>
					{Object.entries(campos).map(([key, value], index) => (
						<div key={index} className="campo-form">

							{value?.type == "select" ? (
								<select className="select-form" name={value?.name} onChange={(e) => { value?.onChange(e.target.value) }}>
									<option defaultValue="" disabled selected hidden></option>
									{Object.entries(value?.options).map(([optionKey, optionValue], optionIndex) => {
										return (
											<option value={optionKey} key={optionIndex}>{optionValue}</option>
										)
									})}
								</select>
							) : (
								<input
									type={value?.type}
									name={value?.name}
									placeholder=" "
									onChange={(e) => { value?.onChange(e.target.value) }}
								/>
							)}

							<label htmlFor={value?.name}>
								{value?.titulo}
							</label>

							<p className="errores-form">{fieldErrors?.[key] || ''}</p>

						</div>
					))}

					<button type="submit" disabled={loading}>{loading ? 'Cargando...' : button} </button>

					{error != '' && (<p>{error}</p>)}
				</form>
			</section>
		</div>
	)
}

export default AdminFormCreate
