import { Link } from "react-router-dom"
import main from "./cards.module.css"

export default function GameCard({id, name, background_image, genres}) {

    return (<div className={main.Card}>
            <Link to={`/videogames/${id}`}>
                <div className="showCard">
                        <h3 className={main.cardName}> {name} </h3>
                        <img src={background_image} alt="Not found :(" /> 
                        <h4>  {genres.map(g => g.name).join(", ")} </h4>
                </div>
            </Link> 
    </div>)
}