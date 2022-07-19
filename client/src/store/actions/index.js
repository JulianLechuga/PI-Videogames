import axios from "axios"
export const FETCH_VIDEOGAMES = "FETCH_VIDEOGAMES"
export const FETCH_GENRES = "FETCH_GENRES"
export const SEARCH_VIDEOGAMES = "SEARCH_VIDEOGAMES"
export const SORT = "SORT"
export const FILTER = "FILTER"


export function get_Videogames(){
    return async function (dispatch){
        await axios (`/videogames`)
        .then(res => dispatch ({type: FETCH_VIDEOGAMES, payload: res.data}))
    };
};

export function search_Videogames(search){
    return async function (dispatch){
        await axios (`/videogames?name=${search}`)
        .then(res => dispatch ({type: SEARCH_VIDEOGAMES, payload: res.data}))
    };
};

export function get_Genres(){
    return async function (dispatch){
        await axios (`/genres`)
        .then(res => dispatch ({type: FETCH_GENRES, payload: res.data}))
    };
};

export function sort(order){
    return {
        type: SORT,
        payload: order
    };
};

export function filter(base){
    return {
        type: FILTER,
        payload: base
    };
};