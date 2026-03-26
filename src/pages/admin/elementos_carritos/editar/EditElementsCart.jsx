import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import AdminFormEdit from "../../../../components/admin/AdminFormEdit"
import { getElementoCarrito, updateElementoCarrito } from "../../../../services/cartElementsService"
import { searchProduct } from "../../../../services/productsService"
import { searchCart } from "../../../../services/cartService"
import { useNavigate } from "react-router-dom"

const EditElementsCart = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})

  const [mostrarDatos, setMostrarDatos] = useState(false)

  const [elementsCart, setElementsCart] = useState(null)

  const [id_producto, setId_producto] = useState('')
  const [id_carrito, setId_carrito] = useState("")
  const [cantidad, setCantidad] = useState('')
  const [price, setPrice] = useState("")

  async function sendData() {
    try {

      setLoading(true)

      const res = await updateElementoCarrito(id, id_carrito, id_producto, cantidad, price)

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

        const res = await getElementoCarrito(id)

        if (!res?.valid) {
          setError("Error al obtener producto")
          return
        }

        const c = res.element

        setElementsCart(c)

        setId_producto(c.id_producto)
        setId_carrito(c.id_carrito)
        setCantidad(c.cantidad)
        setPrice(c.price)

      } catch (error) {
        setError(error.message)
      }
    }

    getData()

  }, [id])

    const fields = {

        producto: {
            //la funcion que va a cambiar el dato
			onChange: setId_producto,
            //tipo de input
			type: 'text-search',

            value: id_producto,
            //nombre del input 
			name: 'id_producto',
            //nombre visible 
			titulo: 'Producto',

            searchFunction: searchProduct,
            data_key: 'products',
            save_data_key: 'id_producto',
            text_keys: 'nombre',
            initial_show_value: `${elementsCart?.producto?.nombre}`
		},

        id_carrito: {
            //la funcion que va a cambiar el dato
			onChange: setId_carrito,
            //tipo de input
			type: 'text-search',

            value: id_carrito,

            //nombre del input 
			name: 'id_carrito',
            //nombre visible 
			titulo: 'Carrito',



            searchFunction: searchCart,
            data_key: 'carts',
            save_data_key: 'id_carrito',
            text_keys: 'id_carrito',
            initial_show_value: `${elementsCart?.id_carrito}`
		},

        cantidad: {
            //la funcion que va a cambiar el dato
			onChange: setCantidad,
            //tipo de input
			type: 'number',

            value: cantidad,
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

            value: price,
            //nombre del input 
			name: 'price',
            //nombre visible 
			titulo: 'Precio',
		}
    }

    console.log(elementsCart)


  return (

    <div className="page-container">

      {!mostrarDatos && (
        <div className="back-link-container">
          <button className="link-regresar" onClick={() => navigate(-1)}>
            Regresar
          </button>
        </div>
      )}

      <section className="section-editar">

        {!mostrarDatos ? (

          <>
            <h1 className="titulo-por-h1">
              Detalles de elementos carrito
            </h1>

            <div className="contenedor-campos">

              <p><strong>Producto:</strong> {elementsCart?.producto?.nombre}</p>

              <p><strong>Id carrito:</strong> {elementsCart?.id_carrito}</p>

              <p><strong>Cantidad:</strong> {elementsCart?.cantidad}</p>

              <p><strong>Precio:</strong> {`$${Number(elementsCart?.price).toLocaleString('en-US', { maximumFractionDigits: 0 })}`}</p>

            </div>
          </>

        ) : (

          <AdminFormEdit
            titulo="Editar Elementos del carrito"
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

export default EditElementsCart