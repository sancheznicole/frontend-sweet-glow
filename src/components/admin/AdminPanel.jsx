/*TABLA DE REGISTROS*/
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AdminPanel = ({ data, titulo, texto, linkCrear, linkEditar, campos, onDelete, getData, page = 1, lastPage = undefined, setPage, elementsLink = "" }) => {
	const [id, setId] = useState(undefined)
	const idKey = Object.keys(campos)[0]
	const navigate = useNavigate()

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
					<p>{texto}</p>

					<div className="contenedor-agregar-registro">
						<Link className="link-agregar-registro" to={linkCrear}>Agregar registro</Link>
					</div>

					{lastPage > 1 && (
						<div className="paginations-buttons">
							<p>Página {page} de {lastPage}</p>
							<div>
								<button onClick={() => { if (page >= 2) setPage(page - 1) }}>
									Anterior
								</button>
								<button onClick={() => { if (page < lastPage) setPage(page + 1) }}>
									Siguiente
								</button>
							</div>
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
														row[key]
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
										<td colSpan={Object.keys(campos).length + 1}>No hay registros</td>
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