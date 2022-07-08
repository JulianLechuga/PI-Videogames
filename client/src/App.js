import './App.css';
import Videogames from './components/videogames';
import {Route, Switch} from "react-router-dom"
import Order from './components/order';
import About from './components/about';
import GameDetail from './components/videogame_detail';
import AddGame from "./components/addGame"
import Nav from './components/nav';

function App() {
  return (
    <div className="App">

      <Nav/>

      <Switch>

      <Route path="/about">
          <About/>
        </Route>

      <Route path="/add">
          <AddGame/>
        </Route>

        <Route path="/:id">
          <GameDetail/>
        </Route>

        <Route path="/">
          <Order/>
          <Videogames/>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
