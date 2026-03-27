import React, { useEffect, useState } from 'react'
import { createProduct } from '../../../../services/productsService'
import AdminFormCreate from '../../../../components/admin/AdminFormCreate'
import { useNavigate } from 'react-router-dom'

//terminar el getall de referencia y guia lo mismo en el select 
import { getAllBrands } from '../../../../services/brands'
import { getAllCategories } from '../../../../services/categoriesService'
import { getAllGiftGuides } from '../../../../services/giftGuideService'
import Loader from '../../../../components/Loader'
import { buildJson } from '../../../../helpers/json.helpers'
import { searchReferences } from '../../../../services/referenceProductsService'

const ProductCreate = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [fieldErrors, setFieldErrors] = useState({})

    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [tendencia, setTendencia] = useState('0')
    const [descuento, setDescuento] = useState('0')
    const [prod_regalo, setProd_regalo] = useState('0')
    const [premio, setPremio] = useState('0')
    const [stock, setStock] = useState('')
    const [id_categoria, setId_categoria] = useState('')
    const [id_marca, setId_marca] = useState('')
    const [id_referencia, setId_referencia] = useState('')
    const [id_guia, setId_guia] = useState('')

    const [brands, setBrands] = useState({})
    const [categories, setCategories] = useState({})
    const [giftGuides, setGuiftGuide] = useState({})

    const getData = async () => {
        try {
            let res = await getAllBrands()

            if(!res?.valid){
                console.log(res?.error)
            }

            let catRes = await getAllCategories()

            if(!catRes?.valid){
                console.log(catRes?.error)
            }

            let guidesRes = await getAllGiftGuides()

            if(!guidesRes?.valid){
                console.log(guidesRes?.error)
            }

            setCategories(buildJson(catRes?.categories, "id_categoria", "nombre"))
            setBrands(buildJson(res?.brands, "id_marca", "nombre"))
            setGuiftGuide(buildJson(guidesRes?.giftGuides?.data, "id_guia", "nombre"))
        } catch (error) {
            console.log(error?.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    
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
			type: 'number',
            //nombre del input 
			name: 'precio',
            //nombre visible 
			titulo: 'Precio',
		}, 

        tendencia: {
            //la funcion que va a cambiar el dato
			onChange: setTendencia,
            //tipo de input
			type: 'radio-y-n',
            //nombre del input 
			name: 'tendencia',
            //nombre visible 
			titulo: 'Tendencia',
		},

        descuento: {
            //la funcion que va a cambiar el dato
			onChange: setDescuento,
            //tipo de input
			type: 'radio-y-n',
            //nombre del input 
			name: 'descuento',
            //nombre visible 
			titulo: 'Descuento',
		},

        prod_regalo: {
            //la funcion que va a cambiar el dato
			onChange: setProd_regalo,
            //tipo de input
			type: 'radio-y-n',
            //nombre del input 
			name: 'prod_regalo',
            //nombre visible 
			titulo: 'Producto regalo',
		},

        premio: {
            //la funcion que va a cambiar el dato
			onChange: setPremio,
            //tipo de input
			type: 'radio-y-n',
            //nombre del input 
			name: 'premio',
            //nombre visible 
			titulo: 'Premio',
		},

        stock: {
            //la funcion que va a cambiar el dato
			onChange: setStock,
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
            options: categories,
            value: id_categoria
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
            options: brands,
            value: id_marca
		},

        id_referencia: {
            //la funcion que va a cambiar el dato
			onChange: setId_referencia,
            //tipo de input
			type: 'text-search',
            //nombre del input 
			name: 'id_referencia',
            //nombre visible 
			titulo: 'Referencia',

            searchFunction: searchReferences,
            data_key: 'references',
            save_data_key: 'id_referencia',
            text_keys: 'id_referencia,tamano,color',
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
            options: giftGuides,
            value: id_guia
		}

    }

    function validateFields() {

        const errors = {}

        // Nombre: mínimo 3 caracteres
        const nombreRegex = /^.{3,}$/
        if (!nombreRegex.test(nombre)) {
            errors.nombre =
                "El nombre debe contener mínimo 3 caracteres"
        }

        // Descripción: mínimo 10 caracteres
        const descripcionRegex = /^.{10,}$/
        if (!descripcionRegex.test(descripcion)) {
            errors.descripcion =
                "La descripción debe contener mínimo 10 caracteres"
        }

        // Precio: número mayor a 0
        const precioRegex = /^[0-9]+(\.[0-9]{1,2})?$/
        if (!precioRegex.test(precio)) {
            errors.precio =
                "El precio debe ser un valor numérico válido"
        }

        // Tendencia obligatorio
        if (!tendencia) {
            errors.tendencia =
                "Debe seleccionar una opción de tendencia"
        }

        // Descuento obligatorio
        if (!descuento) {
            errors.descuento =
                "Debe seleccionar una opción de descuento"
        }

        // Producto regalo obligatorio
        if (!prod_regalo) {
            errors.prod_regalo =
                "Debe seleccionar si aplica como producto regalo"
        }

        // Premio obligatorio
        if (!premio) {
            errors.premio =
                "Debe seleccionar si aplica como premio"
        }

        // Stock: solo números enteros
        const stockRegex = /^[0-9]+$/
        if (!stockRegex.test(stock)) {
            errors.stock =
                "El stock debe contener solo números enteros"
        }

        // Categoría obligatoria
        if (!id_categoria) {
            errors.id_categoria =
                "Debe seleccionar una categoría"
        }

        // Marca obligatoria
        if (!id_marca) {
            errors.id_marca =
                "Debe seleccionar una marca"
        }

        // Referencia obligatoria
        if (!id_referencia) {
            errors.id_referencia =
                "Debe seleccionar una referencia"
        }

        // Guía regalo obligatoria
        if (!id_guia) {
            errors.id_guia =
                "Debe seleccionar una guía de regalo"
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
            let res = await createProduct(nombre, descripcion, precio, tendencia, descuento, prod_regalo, premio, stock, id_categoria, id_marca, id_referencia, id_guia)
        
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
        <>
            {loading ? (
                <Loader text='Estamos gestionando la solicitud'></Loader>
            ) : (
                <AdminFormCreate
                    titulo={'Crear Producto'}
                    campos={campos}
                    linkRegresar={"/admin/products"}
                    onSendForm={sendData}
                    error={error}
                    fieldErrors={fieldErrors}
                    button={'Crear producto'}
                    loading={loading}
                ></AdminFormCreate>
            )}
        </>
  	)
}

export default ProductCreate