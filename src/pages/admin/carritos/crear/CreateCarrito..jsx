import React, { useState } from 'react'
import { createCart } from '../../../../services/cartService'
import AdminFormCreate from '../../../../components/admin/AdminFormCreate'
import { useNavigate } from 'react-router-dom'
import { searchUsers } from '../../../../services/authService'
import { searchProduct } from '../../../../services/productsService'
import { searchInvoiceOrders } from '../../../../services/facturaPedidosService'
import { searchGiftCard } from '../../../../services/giftCardService'


const CreateCarrito = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [cantidad, setCantidad] = useState('')
    const [descuento, setDescuento] = useState('')
    const [id_usuario, setId_usuario] = useState('')
    const [id_producto, setId_producto] = useState('')
    const [id_factura_pedido, setId_factura_pedido] = useState('')
    const [id_tarjeta, setId_tarjeta] = useState('')

    
    const campos = {

        id_usuario: {
            //la funcion que va a cambiar el dato
			onChange: setId_usuario,
            //tipo de input
			type: 'text-search',
            //nombre del input 
			name: 'id_usuario',
            //nombre visible 
			titulo: 'Usuario',

            searchFunction: searchUsers,
            data_key: 'users',
            save_data_key: 'id_usuario',
            text_keys: 'nombres,apellidos,correo',
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

        descuento: {
            //la funcion que va a cambiar el dato
			onChange: setDescuento,
            //tipo de input
			type: 'number',
            //nombre del input 
			name: 'descuento',
            //nombre visible 
			titulo: 'descuento',
		},

        id_producto: {
            //la funcion que va a cambiar el dato
			onChange: setId_producto,
            //tipo de input
			type: 'text-search',
            //nombre del input 
			name: 'producto',
            //nombre visible 
			titulo: 'Producto',


            searchFunction: searchProduct,
            data_key: 'products',
            save_data_key: 'id_producto',
            text_keys: 'nombre,categoria?.nombre',
		},

        id_factura_pedido: {
            //la funcion que va a cambiar el dato
			onChange: setId_factura_pedido,
            //tipo de input
			type: 'text-search',
            //nombre del input 
			name: 'id_factura_pedido',
            //nombre visible 
			titulo: 'Id factura',
            
            searchFunction: searchInvoiceOrders,
            data_key: 'InvoiceOrders',
            save_data_key: 'id_factura_pedido',
            text_keys: 'id_factura_pedido'
		},

        id_tarjeta: {
            //la funcion que va a cambiar el dato
			onChange: setId_tarjeta,
            //tipo de input
			type: 'text-search',
            //nombre del input 
			name: 'id_tarjeta',
            //nombre visible 
			titulo: 'Id tarjeta',
            
            searchFunction: searchGiftCard,
            data_key: 'tarjetas',
            save_data_key: 'id_tarjeta',
            text_keys: 'id_tarjeta'
		}
    }

    function validateFields() {

        const errors = {}

        // Cantidad: número mayor a 0
        const cantidadRegex = /^[0-9]+$/
        if (!cantidadRegex.test(cantidad) || parseInt(cantidad) <= 0) {
            errors.cantidad =
                "La cantidad debe ser un número mayor a 0"
        }

        if (!cantidadRegex.test(descuento)) {
            errors.descuento =
                'El descuento no válido'
        }

        // Usuario obligatorio
        if (!id_usuario) {
            errors.id_usuario =
                "Debe seleccionar un usuario"
        }

        // Producto obligatorio
        if (!id_producto) {
            errors.id_producto =
                "Debe seleccionar un producto"
        }

        // Factura o pedido obligatorio
        if (!id_factura_pedido) {
            errors.id_factura_pedido =
                "Debe seleccionar una factura o pedido"
        }

        // Tarjeta obligatoria
        if (!id_tarjeta) {
            errors.id_tarjeta =
                "Debe seleccionar una tarjeta"
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
            let res = await createCart(id_usuario, cantidad, descuento, id_producto, id_factura_pedido, id_tarjeta)
        
            if(!res?.valid){
                setError("Error al enviar el formulario")
                return
            }

            navigate("/admin/cart")

        } catch (error) {
            setError("Error al enviar el formulario")
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <AdminFormCreate
            titulo={'Crear carrito'}
            campos={campos}
            linkRegresar={"/admin/cart"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={'Crear carrito'}
            loading={loading}
        ></AdminFormCreate>
  	)
}

export default CreateCarrito