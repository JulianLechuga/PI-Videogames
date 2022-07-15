//[ ] Al menos tener un componente del frontend con sus tests respectivos
import rootReducer from './reducer/index';
import {  FETCH_VIDEOGAMES, FETCH_GENRES, SEARCH_VIDEOGAMES, SORT, FILTER, get_Videogames, get_Genres, search_Videogames, filter, sort } from './actions/index.js';
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
            "platforms": ["PC", "PS5", "XBOX360"],
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
    const store = mockStore({
        videogames : [],
        filteredVideogames: [],
        genres: []
        });

    beforeEach(() => store.clearActions());

    describe('FETCH_VIDEOGAMES', () => {

        it("Should save the action type FETCH_VIDEOGAMES inside the FETCH_VIDEOGAMES action", () => {
            expect(FETCH_VIDEOGAMES).toBe('FETCH_VIDEOGAMES');
        });

        it('When dispatching get_Videogames(), the action type of said dispatch should be FETCH_VIDEOGAMES', async () => {
            return store.dispatch(get_Videogames())
                .then(() => {
                    const actions = store.getActions();
                    expect(actions[0].type).toEqual(
                        'FETCH_VIDEOGAMES'
                    );
                })
                .catch(err => console.error(err));
        });
    });

    describe('FETCH_GENRES', () => {

        it("Should save the action type 'FETCH_GENRES' inside the FETCH_GENRES action", () => {
            expect(FETCH_GENRES).toBe('FETCH_GENRES');
        });

        it('When dispatching get_Genres(), the action type of said dispatch should be FETCH_GENRES', async () => {
            return store.dispatch(get_Genres())
                .then(() => {
                    const actions = store.getActions();
                    expect(actions[0].type).toEqual(
                        'FETCH_GENRES'
                    );
                })
                .catch(err => console.error(err));
        });
    });

    describe('SEARCH_VIDEOGAMES', () => {

        it("Should save the action type 'SEARCH_VIDEOGAMES' inside the SEARCH_VIDEOGAMES action", () => {
            expect(SEARCH_VIDEOGAMES).toBe('SEARCH_VIDEOGAMES');
        });
    
        it('When dispatching search_Videogames(), the action type of said dispatch should be SEARCH_VIDEOGAMES', () => {
            return store.dispatch(search_Videogames())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual(
                    'SEARCH_VIDEOGAMES'
                );
            })
            .catch(err => console.error(err));
        });
    });

    describe('Filter / Sort', () => {

        it("Should save the action type 'FILTER' inside the FILTER action", () => {
            expect(FILTER).toBe('FILTER');
        });

        it("Should save the action type 'SORT' inside the SORT action", () => {
            expect(SORT).toBe('SORT');
        });
    })
});
