import axios from "axios"
import { useState } from "react"
import main from "./various.module.css"
import {Action, Puzzle, Indie, Adventure, Arcade, RPG, Strategy, Shooter, Casual, Simulation, Racing, Platformer, Massively_Multiplayer, Sports, Fighting, Board_Games, Card, Educational, Family} from "../constants/sort"
import { useHistory } from "react-router-dom";

export default function AddGame() {
   let history = useHistory();
   let [check, setCheck] = useState([]);
   let arr = [];
    
   let [videogame, setVideogame] = useState({
        name: "",
        genre: "",
        released: "",
        rating: "",
        metacritic: "",
        playtime: "",
        platforms: "",
        background_image: "",
     });

   let [error, setError] = useState({
        name: '',
        genre: "",
        rating: "",
        released: "",
        platforms:"",
        metacritic: "",
        playtime: "",
     });

   function setData(e) {
      if (!check.includes(e.target.value)) {
         arr.push(e.target.value)
         setCheck([...check.concat(arr)])
      } else {
         setCheck([...check].filter(j => j !== e.target.value))
      }
     }

   function onInputChange(e) {
        e.preventDefault()
        setVideogame({
            ...videogame,
            [e.target.name]: e.target.value,
            genre: check,
            [e.target.released]: e.target.value,
            [e.target.rating]: e.target.value,
            [e.target.metacritic]: e.target.value,
            [e.target.playtime]: e.target.value,
            [e.target.platforms]: e.target.value,
            [e.target.background_image]: e.target.value, 
        })
    }
        
    function onSubmit(e) {
        e.preventDefault()
        let regexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

        if (videogame.name === '') {
            setError(error = {
              ...error,
              name: 'Name cannot be blank'
           })
        } else {
            setError(error = {
              ...error,
              name: ''
           })
        } 
        if (!check.length) {
            setError(error = {
                ...error,
                genre: 'Must select at least one genre'
             })
         } else {
            setError(error = {
               ...error,
               genre: ""
            })
         }
        if (videogame.released === '') {
            setError(error = {
              ...error,
              released: 'Must introduce a release date'
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
        } 
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
        }
        if (typeof e.target.platforms.value !== "string") {
            setError(error = {
               ...error,
               platforms: 'Platforms can only be text'
            })
         } else if (!e.target.platforms.value.length) {
            setError(error = {
                ...error,
                platforms: 'Must introduce at least one platform'
             })
         } else {
            setError(error = {
               ...error,
               platforms: ""
            })
         }
         if (!e.target.name.value || !e.target.released.value || !e.target.platforms.value || !e.target.rating.value) {
            alert("Key values are missing") 
        }  else { 
            axios.post(`http://localhost:3001/videogames`, videogame)
            .then(() => {})
             alert("Videogame added succesfully") 
             history.push(`/videogames`);
        }
    }

    return (
        <form action="" onSubmit={onSubmit} className={main.form}>

            <label htmlFor="">*Name: </label>
            <input className={main.formInputs} placeholder="Name..." onChange={onInputChange} name= "name" type="text" value= {videogame.name}/>
            {error.name && <p style={{ 'color': 'red' }}>{error.name}</p>}
            <br />
            <div className={main.checkDiv}>
               <label htmlFor="">*Genres: </label>
                  <select className = {main.select} onChange={setData}>
                     <option value="" defaultValue>Genre</option>
                     <option value={Action} >Action</option>
                     <option value={Indie} >Indie</option>
                     <option value={Adventure} >Adventure</option>
                     <option value={RPG} >RPG</option>
                     <option value={Strategy} >Strategy</option>
                     <option value={Shooter} >Shooter</option>
                     <option value={Casual} >Casual</option>
                     <option value={Simulation} >Simulation</option>
                     <option value={Puzzle} >Puzzle</option>
                     <option value={Arcade} >Arcade</option>
                     <option value={Platformer} >Platformer</option>
                     <option value={Racing} >Racing</option>
                     <option value={Massively_Multiplayer} >Massively Multiplayer</option>
                     <option value={Sports} >Sports</option>
                     <option value={Fighting} >Fighting</option>
                     <option value={Family} >Family</option>
                     <option value={Board_Games} >Board Games</option>
                     <option value={Educational} >Educational</option>
                     <option value={Card} >Card</option>
            </select>
            {error.genre && <p style={{ 'color': 'red' }}>{error.genre}</p>}
            {check && <h3>{check.join(" - ")}</h3>}
            </div>

            <label htmlFor="">*Release Date: </label>
            <input className={main.formInputs} placeholder="YYYY/MM/DD" onChange={onInputChange} name= "released" type="text" value= {videogame.released}/>
            {error.released && <p style={{ 'color': 'red' }}>{error.released}</p>}
            <br />
            <label htmlFor="">*Rating: </label>
            <input className={main.formInputs} placeholder="0 / 5" onChange={onInputChange} name= "rating" type="text" value= {videogame.rating}/>
            {error.rating && <p style={{ 'color': 'red' }}>{error.rating}</p>}
            <br />
            <label htmlFor="">*Platforms: </label>
            <input className={main.formInputs} placeholder="Platforms..." onChange={onInputChange} name= "platforms" type="text" value= {videogame.platforms}/>
            {error.platforms && <p style={{ 'color': 'red' }}>{error.platforms}</p>}
            <br />
            <label htmlFor="">Metacritic score: </label>
            <input className={main.formInputs} placeholder="0-100" onChange={onInputChange} name= "metacritic" type="text" value= {videogame.metacritic}/>
            <br />
            <label htmlFor="">Playtime: </label>
            <input className={main.formInputs} placeholder="Playtime..." onChange={onInputChange} name= "playtime" type="text" value= {videogame.playtime}/>
            <br />
            <label htmlFor="">Image URL: </label>
            <input className={main.formInputs} onChange={onInputChange} placeholder="URL..." name= "background_image" type="url" value= {videogame.background_image}/>
            <br />
            <input type="submit" value= "Add" onSubmit={onSubmit}/>
            <h4> *Required fields </h4>
        </form>
    )
}