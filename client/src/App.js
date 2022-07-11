import './App.css';
import Videogames from './components/videogames';
import {Route, Switch} from "react-router-dom"
import Order from './components/order';
import About from './components/about';
import GameDetail from './components/videogame_detail';
import AddGame from "./components/addGame"
import Nav from './components/nav';
import Pagination from './components/pagination';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { get_Genres, get_Videogames } from "../src/store/actions"
import LandingPage from './components/landing';

function App() {
  let [vgs, setVgs] = useState([]);
  vgs = useSelector(state => state.filteredVideogames)
  let [current, setCurrent] = useState(1);
  let [vgsPerPage] = useState(12);

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(get_Genres())
    dispatch(get_Videogames())
  }, [])

  let indexOfLastPost = current * vgsPerPage;
  let indexOfFirstPost = indexOfLastPost - vgsPerPage;
  let currentVgs = vgs.slice(indexOfFirstPost,indexOfLastPost)
  let paginate = (pageNumber) => setCurrent(pageNumber);


  return (
    <div className="App">
      <Switch>

        <Route path="/about">
          <Nav/>
          <About/>
        </Route>

        <Route path="/add">
          <Nav/>
          <AddGame/>
        </Route>

        <Route path="/videogames/:id">
          <Nav/>
          <GameDetail/>
        </Route>

        <Route path="/videogames">
          <Nav/>
          <Order/>
          <Videogames vgs={currentVgs}/>
          <Pagination vgsPerPage={vgsPerPage} totalVgs={vgs.length} paginate={paginate}/>
        </Route>

        
        <Route path="/">
          <LandingPage/>
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
