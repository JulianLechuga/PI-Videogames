import { Link } from "react-router-dom"
import loading from "../assets/loading.gif";
import main from "./cards.module.css"

export default function GameCard({id, name, image, genre}) {

    return <div className={main.Card}>
        {
            id ? 
            <Link to={`/${id}`}>
            <div>
                
                    <h3 className={main.cardName}> {name} </h3>
                    <img src={image} alt="Not found :(" />
                {<h4>{genre.join(", ")}</h4>}
            </div>
            </Link>
       : 
            <div>
                <img src={loading} alt="loading..." />
            </div>
        } 
    </div>
}