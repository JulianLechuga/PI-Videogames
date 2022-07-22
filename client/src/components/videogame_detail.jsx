import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import loading from "../assets/loading.gif";
import cards from "./css/cards.module.css";

export default function GameDetail() {
    let [videogame, setVideogame] = useState(null);
    let {id} = useParams();

    useEffect(() => {
        axios.get(`/videogames/${id}`)
        .then ((game) => {
            setVideogame(game.data)
        })
        return () => {
            setVideogame(null)
        }
    }, [id]);

    return <div>
            {
                videogame ? 
                <div className={cards.detail}>
                        <h1> {videogame.name} </h1>
                        <img src={videogame.background_image} alt="Not found :(" />
                        {videogame.description ? <h3> Description: <br/> {videogame.description.replaceAll("<p>","").replaceAll("</p>","").replaceAll("<br />","").replaceAll("<br/>","").replaceAll("<strong>","").replaceAll("</strong>","").replaceAll("<ul>","").replaceAll("</ul>","").replaceAll("<li>","").replaceAll("</li>","").replaceAll("[object Object]","").replaceAll("<h3>", "").replaceAll("&#39;", "")} </h3> : null}
                        <div>
                            <h3> Genres: {videogame.genres.map(g => g.name).join(", ")} </h3>
                            <h3> Release date: {videogame.released} </h3>
                            <h3> Platforms: {videogame.createdInDB ? videogame.platforms :  videogame.platforms.map(p => p.platform.name).join(", ")} </h3>
                            <h3 className={cards.rating}> Rating: {videogame.rating} / 5 
                                    {Math.round(videogame.rating) === 0 && <div><span className={cards.offstars}> ★ ★ ★ ★ ★ </span></div>} 
                                    {Math.round(videogame.rating) === 1 && <div><span className={cards.stars}> ★  </span> <span className={cards.offstars}> ★ ★ ★ ★ </span></div>}
                                    {Math.round(videogame.rating) === 2 && <div><span className={cards.stars}> ★ ★  </span> <span className={cards.offstars}> ★ ★ ★ </span></div>}
                                    {Math.round(videogame.rating) === 3 && <div><span className={cards.stars}> ★ ★ ★  </span> <span className={cards.offstars}> ★ ★ </span></div>}
                                    {Math.round(videogame.rating) === 4  && <div><span className={cards.stars}> ★ ★ ★ ★ </span> <span className={cards.offstars}> ★ </span></div>}
                                    {Math.round(videogame.rating) === 5 && <div><span className={cards.stars}> ★ ★ ★ ★ ★ </span></div>}
                            </h3>
                            {videogame.metacritic ? <h4> Metacritic Score: {videogame.metacritic}/100</h4> : null }
                            {videogame.playtime ? <h4> Average playtime: {videogame.playtime} hours</h4> : null }
                        </div>
                </div>  
                : 
                <div>
                        <img src={loading} alt="loading..." />
                </div>
            };

    </div>
};