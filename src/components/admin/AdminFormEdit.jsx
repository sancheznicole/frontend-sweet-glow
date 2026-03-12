/*FORMULARIO DE EDITAR*/

const AdminFormEdit = ({titulo, campos, onSendForm, error, fieldErrors, button, loading}) => {

	return (
		<div>
			<section className="section-form-edit">
				{/* titulo del formulario */}
				<h1 className="titulo-por-h1">{titulo}</h1>

				{/* formulario */}
				<form
					onSubmit={async (e) => {
						e.preventDefault()
						await onSendForm()
					}}
				>

					{/* recorrer los campos dinámicamente */}
					{Object.entries(campos).map(([key, value], index) => (

						<div key={index}>

							{/* titulo del campo */}
							<label htmlFor={value?.name}>
								{value?.titulo}
							</label>

							{value?.type == "select" ? (
								// select
								<select name={value?.name}>
									<option value="">Seleccionar opción</option>
									{Object.entries(value?.options).map(([optionKey, optionValue], optionIndex) => {
										console.log(value?.value, optionValue)

										return (
											<option value={optionKey} key={optionIndex} selected={value?.value == optionKey}>{optionValue}</option>
										)
									})}
								</select>
							) : (
								<input
									type={value?.type}
									name={value?.name}

									/* esto permite que en EDIT aparezcan los datos actuales */
									defaultValue={value?.value || ""}

									onChange={(e) => {
										value?.onChange(e.target.value)
									}}
								/>	
							)}

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


