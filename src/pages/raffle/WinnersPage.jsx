import { useState, useEffect } from "react"
import { getAllWinners } from "../../services/winnersService"
import { useAuth } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"

const WinnersPage = () => {

    const { isAuthenticated, user } = useAuth()
    const [winners, setWinners] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchWinners() {
            try {
                const res = await getAllWinners()
                if (res?.valid) {
                    setWinners(res?.winners?.data ?? [])
                }
            } catch (error) {
                console.log(error?.message)
            } finally {
                setLoading(false)
            }
        }
        fetchWinners()
    }, [])

    if (!isAuthenticated) {
        return (
            <div className="winners-no-auth">
                <h1>🔒</h1>
                <p>Debes iniciar sesión para ver los premiados.</p>
                <Link to="/login" className="awards-banner-btn">Iniciar sesión</Link>
            </div>
        )
    }

    return (
        <div className="winners-page">

            <div className="winners-header">
                <h1 className="winners-titulo">GANADORES</h1>
                <p className="winners-desc">Felicitamos a todos los ganadores de nuestros sorteos especiales.</p>
            </div>

            {loading ? (
                <p className="awards-cargando">Cargando ganadores...</p>
            ) : winners.length === 0 ? (
                <div className="winners-vacio">
                    <p>Aún no hay ganadores registrados.</p>
                    <Link to="/give-aways" className="awards-banner-btn" style={{marginTop: "20px", display: "inline-block"}}>Participar en sorteos</Link>
                </div>
            ) : (
                <div className="winners-lista">
                    {winners.map((winner, index) => (
                        <div key={winner.id_premiado} className="winners-card">
                            <span className="winners-numero">#{String(index + 1).padStart(2, '0')}</span>
                            <div className="winners-info">
                                <p className="winners-nombre">{winner.usuario?.nombres} {winner.usuario?.apellidos}</p>
                                <p className="winners-premio">Premio: {winner.premio?.producto?.nombre ?? `Premio #${winner.id_premio}`}</p>
                            </div>
                            {winner.usuario?.id_usuario === user?.id_usuario && (
                                <span className="winners-tu">¡Eres tú!</span>
                            )}
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default WinnersPage