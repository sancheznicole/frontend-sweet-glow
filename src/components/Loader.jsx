

const Loader = ({text = "Regalanos unos instantes mientras cargamos la informacion del usuario"}) => {
    return (
        <div className="user-loader">
            <h1>Cargando información...</h1>
            <p>{text}</p>
        </div>
    )
}

export default Loader