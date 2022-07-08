import { FETCH_VIDEOGAMES, SEARCH_VIDEOGAMES, SORT, FILTER } from "../actions"

const initialState = {
    videogames : [],
    filteredVideogames: [],
    genres: []
    }

    export default function reducer(state=initialState, action){
        switch(action.type){
            case FETCH_VIDEOGAMES:
                return {
                    ...state,
                    videogames: action.payload,
                    filteredVideogames: action.payload,
                }
            case SEARCH_VIDEOGAMES:
                return {
                    ...state,
                    filteredVideogames: action.payload,
                }    
            case SORT:
                let ordered = [...state.filteredVideogames].sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return action.payload === "A_Z" ? -1 : 1;
                    }
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return action.payload === "A_Z" ? 1 : -1;
                    }
                    return 0
                })
                return {
                    ...state,
                    filteredVideogames: ordered
                }        
            case FILTER: 
            if(action.payload.length) {
                let filtered = state.videogames.data.filter(v => v.genres.includes(action.payload))
                console.log(filtered)
                return {
                    ...state,
                    filteredVideogames: filtered // Action
                }       
            } else {
                return {
                    ...state,
                }    
            }
            default:
                return state
        }
    };