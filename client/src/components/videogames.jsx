import GameCard from "./videogame"
import loading from "../assets/loading2.gif"
import main from "./various.module.css"

export default function Videogames({vgs}) {
    while (vgs.length === 0) {
        // function blink() {
        //     if (vgs.length === 0) {
        //         function hide () {
        //             document.getElementById("1").style.visibility = "hidden";
        //             document.getElementById("2").style.visibility= 'visible' ;
        //         }
        //         setTimeout(hide, 5500) 
        //     };
        // };
        return (
            <div>
                <div> 
                    <img  id="1" className={main.loading}src={loading} title="loading" alt="Loading..." />
                    <span id="2" className={main.loadingError}> <h1> No games were found :( </h1> This might be due to a couple reasons: <br /> <li> Are you sure you typed it's name correctly? </li> <li> The game you searched might not exist in this database </li> <li> You can try adding the game if you don't find it </li></span>
                </div>
            </div>
            );
        };



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