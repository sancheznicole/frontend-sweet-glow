import { useNavigate } from "react-router-dom"
import { createElementoCarrito } from "../../../../services/cartElementsService"
import { useState } from "react"
import { searchProduct } from "../../../../services/productsService"
import { searchCart } from "../../../../services/cartService"
import AdminFormCreate from "../../../../components/admin/AdminFormCreate"

const CreateCartElements = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [id_producto, setId_producto] = useState('')
    const [id_carrito, setId_carrito] = useState("")
    const [cantidad, setCantidad] = useState('')
    const [price, setPrice] = useState("")

    const campos = {

        producto: {
            //la funcion que va a cambiar el dato
			onChange: setId_producto,
            //tipo de input
			type: 'text-search',
            //nombre del input 
			name: 'id_producto',
            //nombre visible 
			titulo: 'Producto',

            searchFunction: searchProduct,
            data_key: 'products',
            save_data_key: 'id_producto',
            text_keys: 'nombre',
		},

        id_carrito: {
            //la funcion que va a cambiar el dato
			onChange: setId_carrito,
            //tipo de input
			type: 'text-search',
            //nombre del input 
			name: 'id_carrito',
            //nombre visible 
			titulo: 'Carrito',

            searchFunction: searchCart,
            data_key: 'carts',
            save_data_key: 'id_carrito',
            text_keys: 'id_carrito',
		},

        cantidad: {
            //la funcion que va a cambiar el dato
			onChange: setCantidad,
            //tipo de input
			type: 'number',
            //nombre del input 
			name: 'cantidad',
            //nombre visible 
			titulo: 'Cantidad',
		},

        price: {
            //la funcion que va a cambiar el dato
			onChange: setPrice,
            //tipo de input
			type: 'number',
            //nombre del input 
			name: 'price',
            //nombre visible 
			titulo: 'Precio',
		}
    }

    function validateFields() {
        const errors = {}

        // Producto obligatorio
        if (!id_producto) {
            errors.producto = "Debe seleccionar un producto"
        }

        // Carrito obligatorio
        if (!id_carrito) {
            errors.id_carrito = "Debe seleccionar un carrito"
        }

        // Cantidad: número entero mayor a 0
        const cantidadRegex = /^[0-9]+$/
        if (!cantidad || !cantidadRegex.test(cantidad) || parseInt(cantidad) <= 0) {
            errors.cantidad = "La cantidad debe ser un número entero mayor a 0"
        }

        // Precio: número mayor o igual a 0 (puede tener decimales)
        const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/
        if (!price || !priceRegex.test(price) || parseFloat(price) < 0) {
            errors.price = "El precio debe ser un número válido mayor o igual a 0"
        }

        setFieldErrors(errors)

        return Object.keys(errors).length > 0
    }

    const sendData = async () => {
        try {

            const validation = validateFields();
            
            if(validation) return

            setLoading(true)

            setError("")
            let res = await createElementoCarrito(id_carrito, id_producto, cantidad, price)
        
            if(!res?.valid){
                setError("Error al enviar el formulario")
                return
            }

            navigate(-1)

        } catch (error) {
            setError("Error al enviar el formulario")
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <AdminFormCreate
            titulo={'Crear elementos del carrito'}
            campos={campos}
            linkRegresar={"/admin/cart-elements"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={'Crear elementos de carrito'}
            loading={loading}
        ></AdminFormCreate>
    )
}

export default CreateCartElements