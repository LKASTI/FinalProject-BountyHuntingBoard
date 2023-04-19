import { useState } from "react"
import "./searchbar.css"


const SearchBar = ({handleSearch}) => {
    const [searchVal, setSearchVal] = useState("")

    const handleSearchValueChange = (e) => {
        setTimeout(() => {
            handleSearch(e.target.value)
        }, 1000)
    }

    return(
        <label className="search-bar">
            <input 
                className="" 
                type="text"
                placeholder='search for a post'
                value={searchVal} 
                onChange={(e) => {
                    setSearchVal(e.target.value)
                    handleSearchValueChange(e)
                }}
            />
        </label>
    )
}

export default SearchBar