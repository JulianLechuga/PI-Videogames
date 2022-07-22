import axios from "axios";
import { useState } from "react";
import main from "./css/various.module.css";
import { Action, Puzzle, Indie, Adventure, Arcade, RPG, Strategy, Shooter, Casual, Simulation, Racing, Platformer, Massively_Multiplayer, Sports, Fighting, Board_Games, Card, Educational, Family } from "../constants/sort"
import { useHistory } from "react-router-dom";

export default function AddGame() {
   let history = useHistory();
   let [check, setCheck] = useState([]);
   let [plats, setPlats] = useState([]);
   let genArr = [];
   let platArr = [];

   let [videogame, setVideogame] = useState({
        name: "",
        genres: "",
        released: "",
        rating: "",
        metacritic: undefined,
        playtime: undefined,
        description:"",
        platforms: "",
        background_image: undefined,
     });

   let [error, setError] = useState({
        name: '',
        genres: "",
        rating: "",
        released: "",
        platforms:"",
     });

   function setGenre(e) {
      if (!check.includes(e.target.value)) {
         genArr.push(e.target.value)
         setCheck([...check.concat(genArr)])
      } else {
         setCheck([...check].filter(j => j !== e.target.value))
      };
   };

   function setPlatform(e) {
      if (!plats.includes(e.target.value)) {
         platArr.push(e.target.value)
         setPlats([...plats.concat(platArr)])
      } else {
         setPlats([...plats].filter(j => j !== e.target.value))
      };
   }; 

   function onInputChange(e) {
        e.preventDefault()
        setVideogame({
            ...videogame,
            [e.target.name]: e.target.value,
            platforms: plats,
            genres: check,
            [e.target.released]: e.target.value,
            [e.target.rating]: e.target.value,
            [e.target.metacritic]: e.target.value,
            [e.target.playtime]: e.target.value,
            [e.target.description]: e.target.value,
            [e.target.background_image]: e.target.value,
        });
    };
        
    function onSubmit(e) {
        e.preventDefault();
        let regexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
        if (videogame.name === '') {
            setError(error = {
              ...error,
              name: 'Name cannot be blank'
           });
         } else if (!/\S/.test(videogame.name)) {
            setError(error = {
              ...error,
              name: 'Name cannot be an empty space'
           })
        } else {
            setError(error = {
              ...error,
              name: ''
           })
        };
        if (!check.length) {
            setError(error = {
                ...error,
                genres: 'Must select at least one genre'
             })
         } else {
            setError(error = {
               ...error,
               genres: ""
            })
         };
        if (videogame.released === '') {
            setError(error = {
              ...error,
              released: 'Must introduce a release date'
           });
        } else if (new Date(videogame.released) > new Date()){ 
            setError(error = {
               ...error,
               released: "Games can't be from the future"
            })
        } else if (!regexDate.test(videogame.released)) {
            setError(error = {
                ...error,
                released: 'Must introduce a date with the format Year/Month/Day'
             })
        } else {
            setError(error = {
              ...error,
              released: ''
           })
        };
        if (e.target.rating.value === "" || e.target.rating.value > 5 || e.target.rating.value < 0) {
            setError(error = {
              ...error,
              rating: 'Rating must be a number between 0 & 5'
           })
        } else {
            setError(error = {
              ...error,
              rating: ""
           })
        };
        if (!check.length) {
            setError(error = {
                ...error,
                platforms: 'Must introduce at least one platform'
             })
         } else {
            setError(error = {
               ...error,
               platforms: ""
            })
         };
         if (!/\S/.test(videogame.name) || !new Date(videogame.released) > new Date() || !e.target.name.value || !e.target.released.value || !check.length || !plats.length || !e.target.rating.value) {
            alert("Key values are missing") 
        }  else { 
            axios.post(`/videogames`, videogame)
            .then(() => {})
             alert("Videogame added succesfully") 
             history.push(`/videogames`);
             window.location.reload(true);
        };
    };

    return (
        <form action="" onSubmit={onSubmit} className={main.form}>
            <label htmlFor="">*Name: </label>
            <input className={main.formInputs} placeholder="Name..." onChange={onInputChange} name= "name" type="text" value= {videogame.name}/>
            {error.name && <p style={{ 'color': 'red' }}>{error.name}</p>}
            <br />
            <div className={main.checkDiv}>
               <label htmlFor="">*Genres: </label>
                  <select className = {main.select} onChange={setGenre}>
                     <option value="" defaultValue>Genres</option>
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
            {error.genres && <p style={{ 'color': 'red' }}>{error.genres}</p>}
            {check && <h3>{check.join(" - ")}</h3>}
            </div>
            <label htmlFor="">*Release Date: </label>
            <input className={main.formInputs} placeholder="YYYY/MM/DD" onChange={onInputChange} name= "released" type="date" value= {videogame.released}/>
            {error.released && <p style={{ 'color': 'red' }}>{error.released}</p>}
            <br />
            <label htmlFor="">*Rating: </label>          
            <input className={main.formInputs} placeholder="0 / 5" onChange={onInputChange} name= "rating" type="number" value= {videogame.rating} min="0" max="5" step=".01"/>
            {error.rating && <p style={{ 'color': 'red' }}>{error.rating}</p>}
            <br />
            <label htmlFor="">Metacritic score: </label>
            <input className={main.formInputs} placeholder="0-100" onChange={onInputChange} name= "metacritic" type="number" value= {videogame.metacritic} min="0" max="100"/>
            <br />
            <label htmlFor="">*Platforms: </label>
            <select className = {main.select} onChange={setPlatform}>
                     <option value="" defaultValue>Platforms</option>
                     <option value={"PC"} >PC</option>
                     <option value={"Linux"} >Linux</option>
                     <option value={"macOS"} >macOS</option>
                     <option value={"iOS"} >iOS</option>
                     <option value={"Android"} >Android</option>
                     <option value={"PlayStation 5"} >PlayStation 5 </option>
                     <option value={"PlayStation 4"} >PlayStation 4 </option>
                     <option value={"PlayStation 3"} >PlayStation 3 </option>
                     <option value={"PlayStation 2"} >PlayStation 2 </option>
                     <option value={"Xbox Series S/X"} >Xbox Series S/X </option>
                     <option value={"XBOX One"} >XBOX One </option>
                     <option value={"XBOX 360"} >XBOX 360 </option>
                     <option value={"XBOX"} >XBOX </option>
                     <option value={"Nintendo Switch"} >Nintendo Switch </option>
                     <option value={"Nintendo WiiU"} >Nintendo WiiU </option>
                     <option value={"Nintendo Wii"} >Nintendo Wii </option>
            </select>
            {error.platforms && <p style={{ 'color': 'red' }}>{error.platforms}</p>}
            {plats && <h3>{plats.join(" - ")}</h3>}
            <label htmlFor="">Description: </label>
            <input className={main.formInputs} placeholder="Game's description" onChange={onInputChange} name= "description" type="text" value= {videogame.description} maxLength="500" />
            <br />
            <label htmlFor="">Playtime: </label>
            <input className={main.formInputs} placeholder="Playtime..." onChange={onInputChange} name= "playtime" type="number" min="0" value= {videogame.playtime}/>
            <br />
            <label htmlFor="">Image URL: </label>
            <input className={main.formInputs} onChange={onInputChange} placeholder="URL..." name= "background_image" type="text" value= {videogame.background_image}/>
            <br />
            <input type="submit" value= "Add" onSubmit={onSubmit}/>
            <h4> *Required fields </h4>
        </form>
    );
};