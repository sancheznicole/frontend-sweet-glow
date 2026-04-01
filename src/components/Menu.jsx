	//MENU DE NAVEGACION 

import DesktopMenu from "./Menus/DesktopMenu"
import MobilesMenu from "./Menus/MobilesMenu"
// import { useLocation } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useState, useEffect } from "react"

function Menu({isTransparent, bgWhite, fixed}) {
	const { isAuthenticated, user } = useAuth()
	const [isMobile, setIsMobile] = useState(undefined)

	useEffect(() => {
		if(window.innerWidth <= 800){
			setIsMobile(true)
		}else{
			setIsMobile(false)
		}
	})

	return (
		isMobile ? (
			<MobilesMenu bgWhite={bgWhite} fixed={fixed} isTransparent={isTransparent} isAuthenticated={isAuthenticated} user={user} />
		) : (
			<DesktopMenu bgWhite={bgWhite} fixed={fixed} isTransparent={isTransparent} isAuthenticated={isAuthenticated} user={user}></DesktopMenu>
		)
	)
}

export default Menu
