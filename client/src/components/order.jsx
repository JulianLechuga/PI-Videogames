import { useDispatch } from "react-redux"
import { A_Z, base, ratingAsc, ratingDesc, Z_A, library, userMade, Action, Puzzle, Indie, Adventure, Arcade, RPG, Strategy, Shooter, Casual, Simulation, Racing, Platformer, Massively_Multiplayer, Sports, Fighting, Board_Games, Card, Educational, Family} from "../constants/sort"
import { sort, filter } from "../store/actions"
import main from "./css/cards.module.css"

export default function Order() {
    let dispatch = useDispatch();

    function resetAndDispatch(e) {
        document.getElementById("order").value = base;
        document.getElementById("genre").value =  base;
        document.getElementById("database").value = base;
        dispatch(sort(e.target.value));
    };

    function onSelectChange(e) {
        dispatch(sort(e.target.value));
    };

    function onSelectFilter(e) {
        dispatch(filter(e.target.value));
    };

    return (
        <div className={main.orderDiv}>
        <button className={main.orderBtn} type="submit" value= {base} onClick={resetAndDispatch}>Reset</button> 

        <select id="order" onChange={onSelectChange} className={main.select}>
            <option value={base}>Order by</option>
            <option value={A_Z} >A-Z</option>
            <option value={Z_A} >Z-A</option>
            <option value={ratingAsc} > Rating 0 - 5 </option>
            <option value={ratingDesc} > Rating 5 - 0 </option>
        </select>

        <select id="genre" onChange={onSelectFilter} className={main.select}>
                <option value={base}>Genre</option>
                <option value={Action} >Action</option>
                <option value={Adventure} >Adventure</option>
                <option value={Arcade} >Arcade</option>
                <option value={Board_Games} >Board Games</option>
                <option value={Card} >Card</option>
                <option value={Casual} >Casual</option>
                <option value={Educational} >Educational</option>
                <option value={Family} >Family</option>
                <option value={Fighting} >Fighting</option>
                <option value={Indie} >Indie</option>
                <option value={Massively_Multiplayer} >Massively Multiplayer</option>
                <option value={Platformer} >Platformer</option>
                <option value={Puzzle} >Puzzle</option>
                <option value={RPG} >RPG</option>
                <option value={Racing} >Racing</option>
                <option value={Shooter} >Shooter</option>
                <option value={Simulation} >Simulation</option>
                <option value={Sports} >Sports</option>
                <option value={Strategy} >Strategy</option>
        </select>

        <select id="database" onChange={onSelectFilter} className={main.select}>
            <option value={base}>Origin</option>
            <option value={library}>Library</option>
            <option value={userMade} >User-Created</option>
        </select>
        </div>
    );
};