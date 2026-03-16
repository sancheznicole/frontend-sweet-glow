import React, { useState } from 'react'
import { createProduct } from '../../../../services/productsService'
import AdminFormCreate from '../../../../components/admin/AdminFormCreate'
import { useNavigate } from 'react-router-dom'

const ProductCreate = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [tendencia, setTendencia] = useState('')
    const [descuento, setDescuento] = useState('')
    const [prod_regalo, setProd_regalo] = useState('')
    const [premio, setPremio] = useState('')
    const [stock, setstock] = useState('')
    const [id_categoria, setId_categoria] = useState('')
    const [id_marca, setId_marca] = useState('')
    const [id_referencia, setId_referencia] = useState('')
    const [id_guia, setId_guia] = useState('')
    
    const campos = {
        //nombre de bd 
        nombre: {
            //la funcion que va a cambiar el dato
			onChange: setNombre,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'nombre',
            //nombre visible 
			titulo: 'Nombre',
		}, 

        descripcion: {
            //la funcion que va a cambiar el dato
			onChange: setDescripcion,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'descripcion',
            //nombre visible 
			titulo: 'Descripcion',
		}, 

        precio: {
            //la funcion que va a cambiar el dato
			onChange: setPrecio,
            //tipo de input
			type: 'text',
            //nombre del input 
			name: 'precio',
            //nombre visible 
			titulo: 'Precio',
		}, 

        tendencia: {
            //la funcion que va a cambiar el dato
			onChange: setTendencia,
            //tipo de input
			type: 'select',
            //nombre del input 
			name: 'tendencia',
            //nombre visible 
			titulo: 'Tendencia',
		},

        descuento: {
            //la funcion que va a cambiar el dato
			onChange: setDescuento,
            //tipo de input
			type: 'select',
            //nombre del input 
			name: 'descuento',
            //nombre visible 
			titulo: 'Descuento',
		},

        prod_regalo: {
            //la funcion que va a cambiar el dato
			onChange: setProd_regalo,
            //tipo de input
			type: 'select',
            //nombre del input 
			name: 'prod_regalo',
            //nombre visible 
			titulo: 'Producto regalo',
		},

        premio: {
            //la funcion que va a cambiar el dato
			onChange: setPremio,
            //tipo de input
			type: 'select',
            //nombre del input 
			name: 'premio',
            //nombre visible 
			titulo: 'Premio',
		},

        stock: {
            //la funcion que va a cambiar el dato
			onChange: setstock,
            //tipo de input
			type: 'number',
            //nombre del input 
			name: 'stock',
            //nombre visible 
			titulo: 'Stock',
		},

        id_categoria: {
            //la funcion que va a cambiar el dato
			onChange: setId_categoria,
            //tipo de input
			type: 'select',
            //nombre del input 
			name: 'id_categoria',
            //nombre visible 
			titulo: 'Categoria',
		},

        id_marca: {
            //la funcion que va a cambiar el dato
			onChange: setId_marca,
            //tipo de input
			type: 'select',
            //nombre del input 
			name: 'id_marca',
            //nombre visible 
			titulo: 'Marca',
		},

        id_referencia: {
            //la funcion que va a cambiar el dato
			onChange: setId_referencia,
            //tipo de input
			type: 'select',
            //nombre del input 
			name: 'id_referencia',
            //nombre visible 
			titulo: 'Referencia',
		},

        id_guia: {
            //la funcion que va a cambiar el dato
			onChange: setId_guia,
            //tipo de input
			type: 'select',
            //nombre del input 
			name: 'id_guia',
            //nombre visible 
			titulo: 'Guia regalo',
		}

    }

    function validateFields(){
        const errors = {};

            const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
            if (nombre != '' && !nameRegex.test(nombre)) {
                errors.nombre = "El nombre solo debe contener letras y espacios";
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
            let res = await createProduct(nombre, descripcion, precio, tendencia, descuento)
        
            if(!res?.valid){
                setError("Error al enviar el formulario")
                return
            }

            navigate("/admin/roles")

        } catch (error) {
            setError("Error al enviar el formulario")
        }

        finally {
            setLoading(false)
        }
    }

    return (
        <AdminFormCreate
            titulo={'Crear roles'}
            campos={campos}
            linkRegresar={"/admin/roles"}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button={'Crear rol'}
            loading={loading}
        ></AdminFormCreate>
  	)
}

export default ProductCreate