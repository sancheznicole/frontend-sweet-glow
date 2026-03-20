import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { getProduct, updateProduct } from "../../../../services/productsService"
import { buildJson } from "../../../../helpers/json.helpers"
import { getAllBrands } from "../../../../services/brands"
import { getAllCategories } from "../../../../services/categoriesService"

const EditProduct = () => {

  const { id } = useParams()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  const [mostrarDatos, setMostrarDatos] = useState(false)

  const [product, setProduct] = useState(null)

  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [precio, setPrecio] = useState('')
  const [tendencia, setTendencia] = useState('')
  const [descuento, setDescuento] = useState('')
  const [prod_regalo, setProd_regalo] = useState('')
  const [premio, setPremio] = useState('')
  const [stock, setStock] = useState('')
  const [id_categoria, setId_categoria] = useState('')
  const [id_marca, setId_marca] = useState('')
  const [id_referencia, setId_referencia] = useState('')
  const [id_guia, setId_guia] = useState('')

  const [categories, setCategories] = useState({})
  const [brands, setBrands] = useState({})

  async function sendData() {
    try {

      setLoading(true)

      const res = await updateProduct(
        id,
        nombre,
        descripcion,
        precio,
        tendencia,
        descuento,
        prod_regalo,
        premio,
        stock,
        id_categoria,
        id_marca,
        id_referencia,
        id_guia
      )

      if (!res?.valid) {
        setError("Error al actualizar")
        return
      }

      setMostrarDatos(false)

    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    const getData = async () => {

      try {

        const res = await getProduct(id)

        if (!res?.valid) {
          setError("Error al obtener producto")
          return
        }

        const p = res.product

        const productFormatted = {
          ...p,

          categoria: p?.categoria?.nombre || "Sin categoría",

          marca: p?.marca?.nombre || "Sin marca",

          referencia: p?.referencia_producto
            ? `${p.referencia_producto.color} | ${p.referencia_producto.tamano}`
            : "Sin referencia",

          guia_regalo: p?.guia_regalo?.nombre || "Sin guía",

          tendencia:
            p.tendencia
              ? "En tendencia"
              : "No está en tendencia",

          descuento:
            p.descuento
              ? "Con descuento"
              : "Sin descuento",

          prod_regalo:
            p.prod_regalo
              ? "Disponible como regalo"
              : "No disponible como regalo",

          premio:
            p.premio
              ? "Producto premio"
              : "No aplica como premio"
        }

        setProduct(productFormatted)

        setNombre(p.nombre)
        setDescripcion(p.descripcion)
        setPrecio(p.precio)
        setTendencia(p.tendencia)
        setDescuento(p.descuento)
        setProd_regalo(p.prod_regalo)
        setPremio(p.premio)
        setStock(p.stock)
        setId_categoria(p.id_categoria)
        setId_marca(p.id_marca)
        setId_referencia(p.id_referencia)
        setId_guia(p.id_guia)

        let brandRes = await getAllBrands()
        
        if(!brandRes?.valid){
            console.log(brandRes?.error)
        }

        let catRes = await getAllCategories()

        if(!catRes?.valid){
            console.log(catRes?.error)
        }

        setCategories(buildJson(catRes?.categories, "id_categoria", "nombre"))
        setBrands(buildJson(brandRes?.brands, "id_marca", "nombre"))

      } catch (error) {
        setError(error.message)
      }
    }

    getData()

  }, [id])

    const fields = {
        //nombre de bd 
        nombre: {
            value: nombre,
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
            value: descripcion,
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
            value: precio,
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
            value: tendencia,
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
            value: descuento,
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
            value: prod_regalo,
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
            value: premio,
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
            value: stock,
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

            value: id_categoria,
            //la funcion que va a cambiar el dato
			onChange: setId_categoria,
            //tipo de input
			type: 'select',
            //nombre del input 
			name: 'id_categoria',
            //nombre visible 
			titulo: 'Categoria',
            options: categories
		},

        id_marca: {
            //la funcion que va a cambiar el dato
            value: id_marca,
			onChange: setId_marca,
            //tipo de input
			type: 'select',
            //nombre del input 
			name: 'id_marca',
            //nombre visible 
			titulo: 'Marca',
            options: brands
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
            options: {}
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
            options: {}
		}

    }

  return (

    <div className="page-container">

      {!mostrarDatos && (
        <div className="back-link-container">
          <Link className="link-regresar" to="/admin/products">
            Regresar
          </Link>
        </div>
      )}

      <section className="section-editar">

        {!mostrarDatos ? (

          <>
            <h1 className="titulo-por-h1">
              Detalles del producto {nombre}
            </h1>

            <div className="contenedor-campos">

              <p><strong>Nombre:</strong> {product?.nombre}</p>

              <p><strong>Descripción:</strong> {product?.descripcion}</p>

              <p><strong>Precio:</strong> {`$${Number(precio).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}</p>

              <p><strong>Tendencia:</strong> {product?.tendencia}</p>

              <p><strong>Descuento:</strong> {product?.descuento}</p>

              <p><strong>Producto regalo:</strong> {product?.prod_regalo}</p>

              <p><strong>Premio:</strong> {product?.premio}</p>

              <p><strong>Stock:</strong> {product?.stock}</p>

              <p><strong>Categoría:</strong> {product?.categoria}</p>

              <p><strong>Marca:</strong> {product?.marca}</p>

              <p><strong>Referencia:</strong> {product?.referencia}</p>

              <p><strong>Guía regalo:</strong> {product?.guia_regalo}</p>

            </div>
          </>

        ) : (

          <AdminFormEdit
            titulo="Editar Producto"
            campos={fields}
            onSendForm={sendData}
            error={error}
            fieldErrors={fieldErrors}
            button="Guardar cambios"
            loading={loading}
          />

        )}

        <div className="contenedor-editar-botones">

          <button
            className={mostrarDatos ? "cancelar-profile" : "modificar-profile"}
            onClick={() => setMostrarDatos(!mostrarDatos)}
          >
            {mostrarDatos ? "Cancelar" : "Modificar"}
          </button>

        </div>

      </section>

    </div>
  )
}

export default EditProduct
