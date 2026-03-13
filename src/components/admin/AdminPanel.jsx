/*TABLA DE REGISTROS*/
import { Link } from "react-router-dom"
import { useState } from "react"

const AdminPanel = ({ data, titulo, texto, linkCrear, linkEditar, campos, onDelete, getData, page = 1, lastPage = undefined, setPage }) => {
	const [id, setId] = useState(undefined)
	const idKey = Object.keys(campos)[0]

	return (
		<section className="section-admin-panel">
			{id != undefined ? (
				<div className="contenedor-eliminar">
					<h3>Estar seguro de eliminar el registro?</h3>

					<div>
						<button className="boton-eliminar-cancelar" onClick={async () => {
								await onDelete(id)
								await getData()
								setId(undefined)
							}}
						>Eliminar</button>
						<button className="boton-eliminar-cancelar" onClick={() => {setId(undefined)}}>Cancelar</button>
					</div>
				</div>
			) : (
				<>
					<div className="back-link-container">
						<Link className='link-regresar' to="/admin">Regresar</Link>
					</div>

					{/* titulo */}
					<h1 className="titulo-por-h1">{titulo}</h1>
					<p>{texto}</p>

					<div className="contenedor-agregar-registro">
						<Link className="link-agregar-registro" to={linkCrear}>Agregar registro</Link>
					</div>

					{lastPage != undefined && (
						<div className="paginations-buttons">
							<p>Página {page} de {lastPage}</p>
							<div>
								<button onClick={() => {if(page >= 2) setPage(page-1)}}>
									Anterior
								</button>
								<button onClick={() => {if(page < lastPage) setPage(page+1)}}>
									Siguiente
								</button>
							</div>
						</div>
					)}

					{/* div -> boton de agregar registro | tabla con la lista de registros */}
					<div className="tabla-scroll">
						<table>
							<thead>
								<tr>
									{Object.entries(campos).map(([key, value], index) => (
										<th key={index}>{value}</th>
									))}
									{/* para recorrer clave, valor e indice de un json */}
									<th>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{data && data.length > 0 ? (

									data.map((row, index) => (
										<tr key={index}>
											{Object.keys(campos).map((key) => (
												<td key={key}>
													{key === "created_at"
														? row[key]?.slice(0, 10)
														: row[key]}
												</td>
											))}

											<td>
												<div className="contenedor-editar-eliminar">
													<Link className="link-editar" to={`${linkEditar}/${row[idKey]}`}>Editar</Link>
													<button className="boton-eliminar" onClick={() => {setId(row[idKey])}}>Eliminar</button>
												</div>
											</td>
										</tr>
									))

								) : (
									<tr>
										<td colSpan={Object.keys(campos).length+1}>No hay registros</td>
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