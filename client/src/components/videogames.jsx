import GameCard from "./videogame"
import loading from "../assets/loading2.gif"
import main from "./css/various.module.css"

export default function Videogames({vgs}) {
    if (!vgs.length) {
            return (
                    <div> 
                        <img id="1" onLoad={loadCheck} className={main.loading}src={loading} title="loading" alt="Loading..." />
                        <span id="2" className={main.loadingError}> <h1> No games were found :( </h1>  <h3> This might be due to a couple reasons: </h3> <li> Are you sure you typed the game's name correctly? </li> <li> The game you searched might not exist in this database </li> <li> You can try adding the game if you don't find it </li> <li> Maybe our database is down, please try again in a few minutes </li></span>
                    </div>
                );
            }

    function checkStatus () {
        if(vgs.length === 0) {
            if (document.getElementById("1")) {
                document.getElementById("1").style.visibility = "hidden"
                document.getElementById("2").style.visibility = "visible"
            }

        } else {
            setTimeout(checkStatus, 8000)
        }
    }

    function loadCheck() {
        setTimeout(checkStatus, 8000)
    }
    

    return (
      <div className="games">
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