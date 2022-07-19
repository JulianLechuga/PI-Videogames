import * as ReactIs from "react-is";
import Videogames from "./videogames"
import Nav from "./nav";
import Pagination from "./pagination";
import GameDetail from "./videogame_detail";
import About from "./about";
import Order from "./order";
import SearchBar from "./searchBar";
import GameCard from "./videogame";
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Link } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('Component Testing', () => {
    describe('Front-End Components', () => {
            it('Should recognize Nav as a valid React Function Components', () => { 
                expect(ReactIs.isValidElementType(Nav)).toBeTruthy();
            });
            it('Should recognize Videogames as a valid React Function Components', () => {
                    expect(ReactIs.isValidElementType(Videogames)).toBeTruthy();
            });
            it('Should recognize Pagination as a valid React Function Components', () => {
                    expect(ReactIs.isValidElementType(Pagination)).toBeTruthy();
            });
            it('Should recognize GameDetail as a valid React Function Components', () => {
                expect(ReactIs.isValidElementType(GameDetail)).toBeTruthy()
            });
            it('Should recognize Order as a valid React Function Components', () => {
                expect(ReactIs.isValidElementType(Order)).toBeTruthy();
            });
            it('Should recognize About as a valid React Function Components', () => {
                expect(ReactIs.isValidElementType(About)).toBeTruthy();
            });
            it('Should recognize SearchBar as a valid React Function Components', () => {
                expect(ReactIs.isValidElementType(SearchBar)).toBeTruthy();
            });
            it('Should recognize GameCard as a valid React Function Components', () => {
                expect(ReactIs.isValidElementType(GameCard)).toBeTruthy();
            });
        });
    });

describe('Nav', () => {
    let nav;
    beforeEach(() => {
        nav = shallow(<Nav/>);
        expect(nav).toBeTruthy();
    });

    it('Should render at least TWO Links', () => {
        expect(nav.find(Link).length).toBeGreaterThanOrEqual(3);
    });

    it('At least one link to the main route or Home=> "/videogames"', () => {
        expect(nav.find(Link).at(0).prop('to')).toEqual('/videogames');
        expect(nav.find(Link).at(0).text()).toEqual(' Home ');
    });

    it('At least one link to the form where you can create a new game => "/add"', () => {
        expect(nav.find(Link).at(1).prop('to')).toEqual('/add');
        expect(nav.find(Link).at(1).text()).toEqual(' Add new game ');
    });

    it('Additional "about" link just for fun :) => "/about"', () => {
        expect(nav.find(Link).at(2).prop('to')).toEqual('/about');
        expect(nav.find(Link).at(2).text()).toEqual(' About ');
    });

    it('Should render the Search Bar', () => {
        expect(nav.find(SearchBar).length).toBeGreaterThanOrEqual(1);
    });
});