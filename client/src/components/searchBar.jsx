import {useState} from "react"
import { search_Videogames } from "../store/actions";
import { useDispatch } from "react-redux";
import searchIcon from "../assets/searching.png"
import nav from "./nav.module.css"

export default function SearchBar() {
    const [search, setSearch] = useState("")
    let dispatch = useDispatch()
    
    function onSubmit(e) {
        e.preventDefault();
        dispatch(search_Videogames(search))
    }

    function onInputChange(e) {
        setSearch(e.target.value)
    }

    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <img className={nav.icon} src={searchIcon} alt="" />
                    <input className={nav.searchBar} type="text" onChange={onInputChange} value= {search} placeholder="Game..."/>
                    <input className={nav.searchBtn} type="submit" value= "Search" onSubmit={onSubmit} />
                </form>
            </div>
        </div>

    )
}