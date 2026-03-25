import { useEffect, useState } from 'react'
import { getAllUsers, deleteUser } from '../../../services/authService'
import AdminPanel from "../../../components/admin/AdminPanel"

const UsuariosIndex = () => {
    const [data, setData] = useState({})
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [lastPage, setLastPage] = useState(undefined)

    const fields = {
        "id_usuario": "Id usuario",
        "tipo_documento": "Tipo Doc",
        "num_documento": "Num Doc",
        "nombres": "Nombres",
        "apellidos": "Apellidos",
        "correo": "E-mail",
        "telefono": "Telefono",
        "direccion": "Dirección",
        "id_rol": "Rol",
        created_at: "Fecha creación"
    }

    async function getData(){
        try {
            let res = await getAllUsers(page, limit)

            console.log(res?.users)

            if(!res?.valid){
                console.log(res?.error)
                return
            }

            const users = res.users.data.map(user => ({
                ...user,

                // Reemplazamos el número por texto
                id_rol: user?.rol?.nombre
            }))

            setData(users)
            setLastPage(Number(res?.users?.last_page))
        } catch (error) {
            console.log(error?.message)
        }
    }

    useEffect(() => {
        getData()
    }, [page])

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
				texto={"Administra la información de los usuarios registrados y supervisa su acceso dentro de la plataforma"}
				linkCrear={"/admin/user/create"}
				linkEditar={"/admin/user/edit"}
				onDelete={onDelete}
				getData={getData}
                page={page}
                lastPage={lastPage}
                setPage={setPage}
            ></AdminPanel>
        </div>
    )
}

export default UsuariosIndex