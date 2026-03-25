/*FORMULARIO DE EDITAR*/
import { useState, useEffect } from "react"

const AdminFormEdit = ({titulo, campos, onSendForm, error, fieldErrors, button, loading}) => {

	const [searchResults, setSearchResults] = useState([])
	const [searching, setSearching] = useState(false)
	const [searchError, setSearchError] = useState('')
	const [timeoutId, setTimeoutId] = useState(null)
	const [inputValue, setInputValue] = useState({})

	useEffect(() => {
		setInputValue(prev => {
			const initialValues = { ...prev }
			Object.entries(campos).forEach(([key, value]) => {
				if (value.type === "text-search" && value.initial_show_value && !prev[value.name]) {
					initialValues[value.name] = value.initial_show_value
				}
			})
			return initialValues
		})
	}, [campos])

	return (
		<div>
			<section className="section-form-edit">
				<h1 className="titulo-por-h1">{titulo}</h1>

				<form onSubmit={async (e) => {
					e.preventDefault()
					await onSendForm()
				}}>

					{Object.entries(campos).map(([key, value], index) => (
						<div key={index}>

							<label htmlFor={value?.name} className="admin-edit-label">
								{value?.titulo}
							</label>

							{value?.type == "select" ? (
								<select 
									name={value?.name} 
									value={value?.value || ""}
									onChange={(e) => value?.onChange(e.target.value)}
								>
									<option value="">Seleccionar opción</option>
									{Object.entries(value?.options).map(([optionKey, optionValue], optionIndex) => (
										<option value={optionKey} key={optionIndex} selected={value?.value == optionKey}>{optionValue}</option>
									))}
								</select>
							) : value?.type == "radio-y-n" ? (
								<div className="radio-container">
									<div>
										<input type="radio" name={value?.name} defaultChecked={value?.value == "1"} value="1" onChange={(e) => { value?.onChange(e.target.value) }} />
										<label htmlFor={value?.name}>Si</label>
									</div>
									<div>
										<input type="radio" name={value?.name} defaultChecked={value?.value == "0"} value="0" onChange={(e) => { value?.onChange(e.target.value) }} />
										<label htmlFor={value?.name}>No</label>
									</div>
								</div>
							) : value?.type == "text-search" ? (
								<>
									<input
										type="text"
										name={value?.name}
										value={inputValue[value.name] || ''}
										placeholder=" "
										onChange={(e) => {
											const texto = e.target.value

											setInputValue(prev => ({
												...prev,
												[value.name]: texto
											}))

											if (texto.trim() === "") {
												setSearchResults(prev => ({
													...prev,
													[value.name]: []
												}))
												return
											}

											if (timeoutId) clearTimeout(timeoutId)

											const newTimeout = setTimeout(async () => {
												setSearching(true)

												const res = await value?.searchFunction(texto)

												if (!res?.valid) {
													setSearchError(res?.error)
													setSearching(false)
													return
												}

												setSearchResults(prev => ({
													...prev,
													[value.name]: res?.[value?.data_key]?.data
												}))

												setSearching(false)
											}, 500)

											setTimeoutId(newTimeout)
										}}
									/>

									{searchResults[value.name]?.length > 0 && (
										<div>
											{searchResults[value.name].map((r, index) => {
												let keys = value?.text_keys.split(",")
												return (
													<button
														type="button"
														key={index}
														onClick={() => {
															value?.onChange(r?.[value?.save_data_key])
															setInputValue(prev => ({
																...prev,
																[value.name]: keys.map(k => r?.[k]).join(" ")
															}))
															setSearchResults(prev => ({
																...prev,
																[value.name]: []
															}))
														}}
													>
														{keys.map((k, i) => (
															<span key={i}>{r?.[k]} </span>
														))}
													</button>
												)
											})}
										</div>
									)}

									{searching && (<p>Buscando...</p>)}
									{searchError && (<p className="form-input-error">{searchError}</p>)}
								</>
							) : (
								<input
									type={value?.type}
									name={value?.name}
									defaultValue={
										value?.type === "number"
											? Number(value?.value)
											: value?.value || ""
									}
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


