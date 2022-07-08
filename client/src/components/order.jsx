import { useDispatch } from "react-redux"
import { A_Z, metacriticOrder, ratingOrder, Z_A, library, userMade, Action, Puzzle} from "../constants/sort"
import { sort, filter } from "../store/actions"

export default function Order() {
    let dispatch = useDispatch()

    function onSelectChange(e) {
        dispatch(sort(e.target.value))
    }

    function onSelectFilter(e) {
        dispatch(filter(e.target.value))
    }

    return (
        <div>
        <select onChange={onSelectChange}>
            <option value={A_Z} defaultValue>A-Z</option>
            <option value={Z_A} >Z-A</option>
            <option value={ratingOrder} > Rating </option>
        </select>

        <select onChange={onSelectFilter}>
            <option value="value4" defaultValue>Genre</option>
            <option value={Action} defaultValue>Action</option>
            <option value={Puzzle} defaultValue>Puzzle</option>
        </select>

        <select onChange={onSelectFilter}>
            <option value={library}>Library</option>
            <option value={userMade} >User-Created</option>
        </select>
        </div>
    )
}