import {useState} from "react"
import { search_Videogames } from "../store/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom"
import searchIcon from "../assets/searching.png"
import nav from "./nav.module.css"

export default function SearchBar() {
    const [search, setSearch] = useState("");
    let history = useHistory();
    let dispatch = useDispatch();
    let timeoutID;

    function delayedAlert() {
        if (search.length) { 
        timeoutID = window.setTimeout(notFound, 5000);
        const timeout = document.getElementsByClassName("loading")
        setTimeout(hideElement, 5000)
        function hideElement() {
        timeout.style.display = 'none'
                }
            }
    };

    function notFound() {
    alert("The specified game was not found!");
    };
    
    function onSubmit(e) {
        e.preventDefault();
        if (search.length) { 
            history.push(`/videogames`)
            dispatch(search_Videogames(search))
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
                    <input className={nav.searchBtn} type="submit" value= "Search" onSubmit={onSubmit} onClick={delayedAlert} />
                </form>
            </div>
    );
};