/*FORMULARIO DE CREAR*/
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AdminFormCreate = ({titulo, campos, onSendForm, linkRegresar, error, fieldErrors, button, loading}) => {
	const [searchResults, setSearchResults] = useState([])
	const [searching, setSearching] = useState(false)
	const [searchError, setSearchError] = useState('')
	const [timeoutId, setTimeoutId] = useState(null)
	const [inputValue, setInputValue] = useState('')
	const navigate = useNavigate()

	return (
		<div>
			<div className="back-link-container">
        		<button className="link-regresar" onClick={() => navigate(-1)}>Regresar</button>
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
							) : value?.type == "radio-y-n" ? (
								<div className="radio-container">
									<div>
										<input type="radio" name={value?.name} value="1" onChange={(e) => { value?.onChange(e.target.value) }} />
										<label htmlFor={value?.name}>Si</label>
									</div>
									<div>
										<input type="radio" name={value?.name} defaultChecked value="0" onChange={(e) => { value?.onChange(e.target.value) }} />
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
