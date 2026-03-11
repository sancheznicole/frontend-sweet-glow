import { useEffect, useState } from 'react'
import AdminPanel from "../../../components/admin/AdminPanel"
import { getAllUsers, deleteUser } from '../../../services/authService'

const UsuariosIndex = () => {
    const [data, setData] = useState({})
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(2)

    const fields = {
        "id_usuario": "ID",
        "tipo_documento": "Tipo Doc.",
        "num_documento": "Num Doc.",
        "nombres": "Nombres",
        "apellidos": "Apellidos",
        "correo": "E-mail",
        "telefono": "Telefono",
        "direccion": "Dirección",
        "id_rol": "Rol",
    }

    async function getData(){
        try {
            let res = await getAllUsers(page, limit)

            if(!res?.valid){
                console.log(res?.error)
                return
            }

            setData(res?.users?.data)
        } catch (error) {
            console.log(error?.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    // mostar registros almacenados en data
    console.log(data)

    return (
        <div>
            <AdminPanel
                data={data}
				campos={fields}
				titulo={"Administración de roles"}
				texto={"Administra los tipos de usuario y sus permisos dentro del sistema"}
				linkCrear={"/admin/roles/crear"}
				linkEditar={"/admin/usuario/editar"}
				onDelete={onDelete}
				getData={getData}
            ></AdminPanel>
        </div>
    )
}

export default UsuariosIndex