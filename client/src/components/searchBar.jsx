import {useState} from "react"
import { search_Videogames } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import searchIcon from "../assets/searching.png"
import nav from "./nav.module.css"

export default function SearchBar() {
    const [search, setSearch] = useState("");
    let history = useHistory();
    let dispatch = useDispatch();
    let vgs = useSelector(state => state.filteredVideogames)

    function notFound() {
            setTimeout(hideElement, 4000)
            function hideElement() {
                if (!vgs.length) {
                alert("The specified game was not found!")
            ;
          }
        };
    };
    
    function onSubmit(e) {
        e.preventDefault();
        if (search.length) { 
            dispatch(search_Videogames(search))
            history.push(`/videogames`)
            notFound();
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
                    <input className={nav.searchBtn} type="submit" value= "Search" onSubmit={onSubmit} onClick={notFound} />
                </form>
            </div>
    );
};