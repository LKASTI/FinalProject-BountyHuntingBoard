import "./header.css"
import { Outlet } from "react-router-dom"
// import HeaderImage from "../assets/images/Fettcrashesthecantina.png"
import HeaderImage from "../assets/images/mando_background.jpg"
 
const Header = () => {

    return(
        <>
            <div className="header">
                <img className="header-img" src={HeaderImage}/>
                <h1 className="">Bounty Hunter's Board</h1>
            </div>
            <Outlet/>
        </>
    )
}

export default Header