/*TABLA DE REGISTROS*/
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AdminPanel = ({ 
		data, titulo, texto, linkCrear, linkEditar,
		campos, onDelete, getData, page = 1, 
		lastPage = undefined, setPage, elementsLink = "",
		limit, setLimit, enableSearch = false, setSearch, search
	}) => {
	const [id, setId] = useState(undefined)
	const idKey = Object.keys(campos)[0]
	const navigate = useNavigate()
	const max_length = 50

	const getValor = (row, key) => {
		if (key === "created_at") return row[key]?.slice(0, 10)
		if (key.includes(".")) return key.split(".").reduce((obj, k) => obj?.[k], row)
		return row[key]
	}

	return (
		<section className="section-admin-panel">
			{id != undefined ? (
				<div className="contenedor-eliminar">
					<h3>¿Estar seguro de eliminar el registro?</h3>
					<div>
						<button className="boton-eliminar-cancelar" onClick={async () => {
							await onDelete(id)
							await getData()
							setId(undefined)
						}}>Eliminar</button>
						<button className="boton-eliminar-cancelar" onClick={() => { setId(undefined) }}>Cancelar</button>
					</div>
				</div>
			) : (
				<>
					<div className="back-link-container">
						<button className='link-regresar' onClick={() => navigate(-1)}>Regresar</button>
					</div>

					<h1 className="titulo-por-h1">{titulo}</h1>
					<p className="information-text">{texto}</p>

					<div className="contenedor-agregar-registro">
						<Link className="link-agregar-registro" to={linkCrear}>Agregar registro</Link>
						<button className='link-regresar link-agregar-registro' onClick={() => navigate(-1)}>Regresar</button>
					</div>

					<p>Total de registros ({data?.length ?? 0})</p>

					{lastPage > 1 && (
						<>
							<div className="paginations-buttons">
								{limit && limit > 5 && (
									<div className="limit-selector">
										<div>
											<span>Cantidad de elementos por página</span>
											<select name="limit" onChange={(e) => {setLimit(e.target.value);}}>
												{data?.length < 5 && <option value={data?.length}>{data?.length}</option>}
												<option value="5">5</option>
												<option value="10">10</option>
												<option value="25">25</option>
												<option value="50">50</option>
											</select>
										</div>
										<p>Página {page} de {lastPage}</p>
									</div>
								)}
								<div>
									<button onClick={() => { if (page >= 2) setPage(page - 1) }}>
										Anterior
									</button>
									<button onClick={() => { if (page < lastPage) setPage(page + 1) }}>
										Siguiente
									</button>
								</div>
							</div>
					
						</>
					)}

					{enableSearch && (
						<div className="search-registers-input">
							<input type="text" name="search" value={search} placeholder="Buscar registros" onChange={(e) => {setSearch(e.target.value)}}/>
						</div>
					)}

					<div className="tabla-scroll">
						<table>
							<thead>
								<tr>
									{Object.entries(campos).map(([key, value], index) => (
										<th key={index}>{value}</th>
									))}
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{data && data.length > 0 ? (
									data.map((row, index) => (
										<tr key={index}>
											{Object.keys(campos).map((key) => (
												<td key={key}>
													{key === "created_at" ? (
														row[key]?.slice(0, 10)
													) : key === "elementos" ? (
														row[key]?.length > 0 ? (
															row[key].map((el) => (
																<Link 
																	key={el.id_elemento_carrito}
																	to={`${elementsLink}/${el.id_elemento_carrito}`}
																	style={{ display: "block" }}
																>
																	Registro ID:{el.id_elemento_carrito}
																</Link>
															))
														) : (
															"Sin elementos"
														)
													) : (
														typeof row[key] == "string" ? `${row[key].slice(0, max_length)}${row[key].length > max_length ? '...' : ''}` : row[key]
													)}
												</td>
											))}
											<td>
												<div className="contenedor-editar-eliminar">
													<Link className="link-editar" to={`${linkEditar}/${row[idKey]}`}>Editar</Link>
													<button className="boton-eliminar" onClick={() => { setId(row[idKey]) }}>Eliminar</button>
												</div>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={Object.keys(campos).length + 1} className="no-registers-table">No hay registros</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</>
			)}
		</section>
	)
}

export default AdminPanel