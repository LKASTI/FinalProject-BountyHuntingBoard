import "./navbar.css"
import SearchBar from "./SearchBar.jsx"
import { Link, Outlet } from "react-router-dom"
 
const NavBar = ({handleSearch}) => {

    return(
        <>
            <div className="nav-bar">
                <SearchBar handleSearch={handleSearch}/>
                <h1 className="nav-bar-heading">Bounty Hunter's Board</h1>
                <div className="nav-bar-links">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/createpost"}>Create Post</Link>
                </div>
            </div>
            <Outlet/>
        </>
    )
}

export default NavBar