import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import loading from "../assets/loading.gif";
import main from "./cards.module.css"

export default function GameDetail() {

    let [videogame, setVideogame] = useState(null)

    let {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:3001/videogames/${id}`)
        .then ((game) => {
            setVideogame(game.data)
        })

        return () => {
            setVideogame(null)
        }
    }, [])

    return <div>
            {
                videogame ? 
                <div className={main.detail}>
                        <h1> {videogame.name} </h1>
                        <img src={videogame.image} alt="Not found :(" />
                        {videogame.description ? <h3>{videogame.description.replaceAll("<p>","").replaceAll("</p>","").replaceAll("<br />","")}</h3> : null}
                        <div>
                            {videogame.genres ? <h4> Genres: {videogame.genres.join(", ")} </h4> : <h4> Genres: {videogame.genre.join(", ")} </h4>}
                            <h4> Release date: {videogame.releaseDate} </h4>
                            <h4> Platforms: {videogame.platforms.join(", ")}</h4>
                            <h4> Rating: {videogame.rating}/5 </h4>
                            {videogame.metacritic ? <h4> Metacritic Score: {videogame.metacritic}/100</h4> : null } {/*  <h5> Metacritic: Not enough Metacritic reviews </h5>} */}
                            {videogame.playtime ? <h4> Average playtime: {videogame.playtime} hours</h4> : null } {/*  <h5> Average playtime: Not enough reviews to calculate</h5>} */}
                        </div>
                </div>  
                : 
                <div className="temp">
                        <img src={loading} alt="loading..." />
                        {setTimeout(function() {document.getElementsByClassName("temp").innerHTML = "Not found"}, 2500)} 
                </div>
            }

    </div>
}