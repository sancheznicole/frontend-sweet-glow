import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getAllAwards } from "../../services/awardsService"

const STORAGE_URL = import.meta.env.VITE_STORAGE_URL

const AwardsPage = () => {

    const [awards, setAwards] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchAwards() {
            try {
                const res = await getAllAwards()
                if (res?.valid) {
                    setAwards(res?.awards?.data ?? [])
                }
            } catch (error) {
                console.log(error?.message)
            } finally {
                setLoading(false)
            }
        }
        fetchAwards()
    }, [])

    return (
        <div className="awards-page">

            {/* HERO */}
            <div className="awards-hero">
                <img
                    src={`/assets/awards-hero.jpg`}
                    alt="Premios Sweet Glow"
                    className="awards-hero-img"
                />
                <div className="awards-hero-overlay">
                    <h1 className="awards-titulo">PREMIOS</h1>
                </div>
            </div>

            {/* PRODUCTOS PREMIADOS */}
            <div className="awards-contenido">
                <h2 className="awards-subtitulo">Productos en sorteo</h2>
                <p className="awards-descripcion">
                    Estos son los productos que podrías ganar en nuestros sorteos especiales.
                </p>

                {loading ? (
                    <p className="awards-cargando">Cargando premios...</p>
                ) : awards.length === 0 ? (
                    <p className="awards-vacio">No hay premios disponibles por el momento.</p>
                ) : (
                    <div className="awards-grid">
                        {awards.map((award) => (
                            <div key={award.id_premio} className="awards-card">

                                {/* 🔥 CONTENEDOR DE IMAGEN */}
                                <div className="awards-card-img-container">
                                    {award.producto?.imagenes?.[0]?.filename ? (
                                        <img
                                            src={`${STORAGE_URL}/${award.producto.imagenes[0].filename}`}
                                            alt={award.producto?.nombre}
                                            className="awards-card-img"
                                        />
                                    ) : (
                                        <div className="awards-card-no-img"></div>
                                    )}
                                </div>

                                {/* INFO */}
                                <div className="awards-card-info">
                                    <p className="awards-card-nombre">
                                        {award.producto?.nombre}
                                    </p>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* BANNER PREMIADOS */}
            <div className="awards-banner-container">
                <div className="awards-banner">
                    <div className="awards-banner-contenido">
                        <p className="awards-banner-eyebrow">✦ resultados</p>
                        <h2 className="awards-banner-titulo">
                            ¿Saliste<br />premiado?
                        </h2>
                        <p className="awards-banner-texto">
                            Consulta la lista de ganadores de nuestros sorteos especiales.
                        </p>
                        <Link to="/winners" className="awards-banner-btn">
                            Ver ganadores
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AwardsPage