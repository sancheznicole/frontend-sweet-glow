import { Link } from "react-router-dom"
import { useState } from "react"

const MobilesMenu = ({ isTransparent, bgWhite, fixed, isAuthenticated, user }) => {
    const [visible, setVisible] = useState(false)

    return (
        <div className="mobile-menu">
            <div className={`phrase-section`}>
                <p> Disfrute de nuestras excelentes tarifas </p>
            </div>

            <header id="header" className={`${bgWhite == true ? 'bg-white' : ''} ${ isTransparent == true ? '' : 'short-header' } ${ fixed == true ? 'fixed' : 'page-container' }`}>
                <div className="mobile-main-container">
                    <ul>
                        <li>
                            <Link to={"/"} title="Sweet glow pagina de inicio">
                                <h1 className="title">
                                    SWEET GLOW
                                </h1>
                                <h2>
                                    XOXO
                                </h2>
                            </Link>
                        </li>
                        <li>
                            <button className="switcher-button" onClick={() => {setVisible(!visible)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeWinecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
                            </button>
                        </li>
                    </ul>
                </div>

                {visible && (
                    <nav>
                        <ul className="upper-line">

                            <li>
                                <Link to={"/wishlist"} title="Lista de deseos">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-heart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
                                </Link>

                                {isAuthenticated ? (
                                    <Link to={"/profile"} title="Cuenta">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                                    </Link>
                                ) : (
                                    <Link to={"/login"} title="Cuenta">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                                    </Link>
                                )}

                                <Link to={"/search"} title="Buscador">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                                </Link>

                                <Link to={"/cart"} title="Carrito de compras">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-bag"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304" /><path d="M9 11v-5a3 3 0 0 1 6 0v5" /></svg>
                                </Link>
                            </li>

                        </ul>

                        <ul className="bottom-line">
                            {user?.id_rol === 1 && <li className="link-panel-administrativo"><Link to={"/admin"}>Panel administrativo</Link></li>}
                            <li><Link to={"/categories"}>Categorias</Link></li>
                            {/* <li><Link to={"/"}> <CategoriasMenu titulo={"Lista de categorias"}></CategoriasMenu> </Link></li>} */}
                            <li><Link to={"/blog"}>Blog</Link></li>
                            <li><Link to={"/gift-guide"}>Guía de regalos</Link></li>
                            <li><Link to={"/give-aways"}>Sorteos</Link></li>
                            <li><Link to={"/about-us"}>Sobre nosotros</Link></li>
                        </ul>
                    </nav>
                )}

                <Link to="https://wa.me/573108327636?text=Hola%20quiero%20información%20sobre%20sus%20productos" target="_blank" id="floating-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#996c74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
                </Link>
            </header>
        </div>
    )
}

export default MobilesMenu