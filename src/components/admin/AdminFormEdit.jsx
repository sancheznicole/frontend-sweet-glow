/*FORMULARIO DE EDITAR*/

const AdminFormEdit = ({titulo, campos, onSendForm, error, fieldErrors, button, loading}) => {

	return (
		<div>
			<section className="section-form-edit">
				<h1 className="titulo-por-h1">{titulo}</h1>

				<form
					onSubmit={async (e) => {
						e.preventDefault()
						await onSendForm()
					}}
				>
					{Object.entries(campos).map(([key, value], index) => (

						<div key={index}>

							<label htmlFor={value?.name}>
								{value?.titulo}
							</label>

							{value?.type == "select" ? (
								<select
									name={value?.name}
									onChange={(e) => { value?.onChange(e.target.value) }}
								>
									<option value="">Seleccionar opción</option>
									{Object.entries(value?.options).map(([optionKey, optionValue], optionIndex) => (
										<option
											value={optionKey}
											key={optionIndex}
											selected={value?.value == optionKey}
										>
											{optionValue}
										</option>
									))}
								</select>
							) : (
								<input
									type={value?.type}
									name={value?.name}
									defaultValue={value?.value || ""}
									onChange={(e) => {
										value?.onChange(value?.type === "file" ? e.target.files[0] : e.target.value)
									}}
								/>
							)}

							<p>{fieldErrors?.[key] || ""}</p>

						</div>

					))}

					<button type="submit" disabled={loading}>
						{loading ? "Cargando..." : button}
					</button>

					{error != "" && (
						<p>{error}</p>
					)}

				</form>

			</section>
		</div>
	)
}

export default AdminFormEdit