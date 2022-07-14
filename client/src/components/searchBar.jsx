import {useState} from "react"
import { search_Videogames } from "../store/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import searchIcon from "../assets/searching.png"
import nav from "./css/nav.module.css"


export default function SearchBar() {
    const [search, setSearch] = useState("");
    let history = useHistory();
    let dispatch = useDispatch();

    function onSubmit(e) {
        e.preventDefault();
        if (search.length) { 
            dispatch(search_Videogames(search))
            history.push(`/videogames`)
        } else {
            alert ("Please insert a game to search")
        }
    };

    function onInputChange(e) {
        setSearch(e.target.value)
    };

    return (
            <div>
                <form onSubmit={onSubmit}>
                    <img className={nav.icon} src={searchIcon} alt="" />
                    <input className={nav.searchBar} type="text" onChange={onInputChange} value= {search} placeholder="Game..."/>
                    <input className={nav.searchBtn} type="submit" value= "Search" onSubmit={onSubmit} />
                </form>
            </div>
    );
};