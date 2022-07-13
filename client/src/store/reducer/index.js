import { A_Z } from "../../constants/sort"
import { FETCH_VIDEOGAMES, SEARCH_VIDEOGAMES, SORT, FILTER, FETCH_GENRES } from "../actions"

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
            case FETCH_GENRES:
                return {
                    ...state,
                    genres: action.payload,
                }    
            case SEARCH_VIDEOGAMES:
                return {
                    ...state,
                    filteredVideogames: action.payload,
                }    
            case SORT:
                if (action.payload === "base"){
                    return {
                        ...state,
                        filteredVideogames: state.videogames
                    }
                }
                if (action.payload === "ratingAsc"){
                    let ratingOrder =  [...state.filteredVideogames].sort((a, b) => {
                        if (a.rating < b.rating) {
                            return  -1
                        }
                        if (a.rating > b.rating) {
                            return  1
                        }
                        return 0 
                       })
                       return {
                        ...state,
                        filteredVideogames: ratingOrder
                    }    
                }
                if (action.payload === "ratingDesc"){
                    let ratingOrder =  [...state.filteredVideogames].sort((a, b) => {
                        if (a.rating < b.rating) {
                            return  1
                        }
                        if (a.rating > b.rating) {
                            return  -1
                        }
                        return 0 
                        })
                        return {
                        ...state,
                        filteredVideogames: ratingOrder
                    }    
                }
                let ordered = [...state.filteredVideogames].sort((a, b) => {
                    if (a.name < b.name) {
                        return action.payload === A_Z ? -1 : 1;
                    }
                    if (a.name > b.name) {
                        return action.payload === A_Z ? 1 : -1;
                    }
                    return 0
                })
                return {
                    ...state,
                    filteredVideogames: ordered
                }        
            case FILTER: 
                if (action.payload === "base"){
                    return {
                        ...state,
                        filteredVideogames: state.videogames
                    }
                }
                if (action.payload === "userMade") {
                    let userFilter = state.videogames.filter(v => v.id.toString().length > 8)
                    return {
                        ...state,
                        filteredVideogames: userFilter
                    }    
                }
                if (action.payload === "library") {
                    let APIFilter = state.videogames.filter(v => v.id.toString().length < 7)
                    return {
                        ...state,
                        filteredVideogames: APIFilter
                    }    
                }
                if(action.payload.length) {
                    let filtro = state.videogames.filter(v => v.genres.find(g => g.name === action.payload))
                    console.log(state.videogames.filter(v => v.genres.find(g => g.name === action.payload)))
                    return {
                        ...state,
                        filteredVideogames: filtro
                    }       
                } else {
                    return {
                        ...state,
                    }    
                }
            default:
                return state
        };
    };