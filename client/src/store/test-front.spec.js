//[ ] Al menos tener un componente del frontend con sus tests respectivos
import rootReducer from './reducer/index';
import {  FETCH_VIDEOGAMES, FETCH_GENRES, SEARCH_VIDEOGAMES, SORT, FILTER } from './actions/index.js';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('Reducer', () => {
    const initialState = {
        videogames : [],
        filteredVideogames: [],
        genres: []
        }
    
    const videogames = [
        {
            "id": 1,
            "name": "League of testing",
            "genres": ["Puzzle", "Strategy"],
            "released": "2011-04-18",
            "rating": 5,
            "platforms": ["PC"],

          },
          {
            "id": 2,
            "name": "Call of Front: Testing Warfare II",
            "genres": ["Action", "Shooter"],
            "released": "2015-08-04",
            "rating": 4,
            "platforms": ["PC", "PS5", "XBOX360s"],
          },
    ]
    const genres =[
        {
            "id": 1,
            "name": "Action",
            "games_count": 3482
          },
          {
            "id": 2,
            "name": "Shooter",
            "games_count": 2635
          },
          {
            "id": 3,
            "name": "Puzzle",
            "games_count": 1083
          },
          {
            "id": 4,
            "name": "Strategy",
            "games_count": 1649
          }
    ]
    
    const filteredVideogames = []

    it('Should return the initial state if no action is specified', () => {
        expect(rootReducer(undefined, [])).toEqual({ videogames: [], genres: [], filteredVideogames: []});
    });

    it('Should save the videogames from the API when called', () => {
        const result = rootReducer(initialState, { type: FETCH_VIDEOGAMES, payload: videogames });
        expect(result).not.toEqual(initialState);
        expect(result).toEqual({
            videogames: videogames,
            genres: [],
            filteredVideogames: videogames,
        });
    });

    it('Should save the genres from the API when called', () => {
        const result = rootReducer(initialState, { type: FETCH_GENRES, payload: genres });
        expect(result).not.toEqual(initialState);
        expect(result).toEqual({
            videogames: [],
            genres: genres,
            filteredVideogames: [],
        });
    });

    it('Should save the specified videogames searched from the API without modifying the other props', () => {
        const result = rootReducer(initialState, { type: SEARCH_VIDEOGAMES, payload: videogames});
        expect(result).not.toEqual(initialState);
        expect(result).toEqual({
            videogames: [],
            genres: [],
            filteredVideogames: videogames,
        });
    });
        
 });

 describe('Actions', () => {

    const mockStore = configureStore([thunk]);
    const store = mockStore({ users: [], });

    beforeEach(() => store.clearActions());

    describe('getAllUsers', () => {

        it('Debería guardar en una variable GET_ALL_USERS el type "GET_ALL_USERS" que vamos a usar en la action creator "getAllUsers"', () => {
            expect(GET_ALL_USERS).toBe('GET_ALL_USERS');
        });

        it('Debería hacer un dispatch con las propiedades type "GET_ALL_USERS" y como payload, el resultado del fetch al link provisto', async () => {
            // La respuesta del get nos va a traer un montón de cosas. Agregar al payload solamente lo necesario.

            return store.dispatch(getAllUsers())
                .then(() => {
                    const actions = store.getActions();
                    expect(actions[0].type).toEqual(
                        'GET_ALL_USERS'
                    );
                })
                .catch(err => console.error(err));
        });
    });

    describe('getAllUserPosts', () => {

        it('Debería guardar en una variable GET_ALL_USERS_POST el type "GET_ALL_USERS_POST" que vamos a usar en la action creator "getAllUserPosts"', () => {
            expect(GET_ALL_USERS_POST).toBe('GET_ALL_USERS_POST');
        });

        it('Debería hacer un dispatch con las propiedades type "GET_ALL_USERS_POST" y como payload, el resultado del fetch al link provisto', async () => {
            return store.dispatch(getAllUserPosts())
                .then(() => {
                    const actions = store.getActions();
                    expect(actions[0].type).toEqual(
                        'GET_ALL_USERS_POST'
                    );
                })
                .catch(err => console.error(err));
        });
    });

    describe('getAllCommentsPost', (id) => {

        it('Debería guardar en una variable GET_ALL_COMMENTS_POST el type "GET_ALL_COMMENTS_POST" que vamos a usar en la action creator "getAllCommentsPost"', () => {
            expect(GET_ALL_COMMENTS_POST).toBe('GET_ALL_COMMENTS_POST');
        });
    
        it('Debería hacer un dispatch con las propiedades type "GET_ALL_COMMENTS_POST" y como payload, los values recibidos como argumento y un ID incremental en la action creator "getAllCommentsPost"', () => {
            const id = 1
    
            return store.dispatch(getAllCommentsPost(id))
            .then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(
                    'GET_ALL_COMMENTS_POST'
                );
            })
            .catch(err => console.error(err));
        });
    });

    describe('getAllPosts', () => {

        it('Debería guardar en una variable GET_ALL_POSTS el type "GET_ALL_POSTS" de la action createHouse', () => {
            expect(GET_ALL_POSTS).toBe('GET_ALL_POSTS');
        });
        
        it('Debería hacer un dispatch con las propiedades type "GET_ALL_POST" y como payload, los values recibidos como argumento en la action creator "getAllPosts"', () => {
        return store.dispatch(getAllPosts())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(
                    'GET_ALL_POSTS'
                );
            })
            .catch(err => console.error(err));
        });
    });

})