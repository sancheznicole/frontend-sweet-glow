import { useEffect, useState } from 'react'
import { getAllUsers, deleteUser } from '../../../services/authService'
import AdminPanel from "../../../components/admin/AdminPanel"

const UsuariosIndex = () => {
    const [data, setData] = useState({})
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(2)

    const fields = {
        "id_usuario": "ID",
        "tipo_documento": "Tipo Doc",
        "num_documento": "Num Doc",
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

    const onDelete = async (id) => {
        try {
            let res = await deleteUser(id)
    
            if(!res?.valid) return res?.error
    
        } catch (error) {
            return error.message
        }
    }

    return (
        <div>
            <AdminPanel
                data={data}
				campos={fields}
				titulo={"Administración de usuarios"}
				texto={"Administra los tipos de usuario y sus permisos dentro del sistema"}
				linkCrear={"/admin/user/create"}
				linkEditar={"/admin/user/edit"}
				onDelete={onDelete}
				getData={getData}
            ></AdminPanel>
        </div>
    )
}

export default UsuariosIndex