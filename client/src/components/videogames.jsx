import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_Videogames } from "../store/actions"   
import GameCard from "./videogame"

export default function Videogames() {
    let games = useSelector(state => state.filteredVideogames)
    let dispatch = useDispatch()

    let [videogame, setVideogame] = useState()

    useEffect(() => {
        setVideogame()
   }, [])


    useEffect(() => {
         dispatch(get_Videogames())
    }, [])

    console.log(games)

    return (
      <div>
        {games.data?.map((game) => {
            return( 
            <div key={game.id} >
                <GameCard
                    id = {game.id}
                    name = {game.name} 
                    image = {game.image} 
                    genre = {game.genres ? game.genres : game.genre}
                    releaseDate = {game.releaseDate}
                    platforms= {game.platforms}
                    rating= {game.rating}
                    metacritic = {game.metacritic}
                    playtime = {game.playtime}
                    />
            </div>
            )
        })}
    </div>
    )
}