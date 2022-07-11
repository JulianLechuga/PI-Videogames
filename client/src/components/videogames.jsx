import GameCard from "./videogame"
import loading from "../assets/loading.gif"

export default function Videogames({vgs}) {
    if (!vgs.length) {
        return <div> <img className="loading" src={loading} alt="Loading..." /> </div>
    }
    return (
      <div>
         {vgs.map((game) => {
            return( 
            <div key={game.id} >
                <GameCard
                    id = {game.id}
                    name = {game.name} 
                    background_image = {game.background_image} 
                    genres = {game.genres}
                    released = {game.released}
                    platforms= {game.platforms}
                    rating= {game.rating}
                    metacritic = {game.metacritic}
                    playtime = {game.playtime}
                    />
            </div>
            )}
        )}
    </div>
    )
}