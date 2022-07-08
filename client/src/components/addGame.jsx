import axios from "axios"
import { useState } from "react"
import main from "./various.module.css"

export default function AddGame() {
  //  let [videogame, setVideogame] = useState({})
    
    let [videogame, setVideogame] = useState({
        name: '',
        genre: '',
        releaseDate: '',
        rating: "",
        metacritic: "",
        playtime: "",
        platforms: "",
        image: "",
     });

     let [error, setError] = useState({
        name: '',
        genre: "",
        rating: "",
        releaseDate: "",
        platforms:"",
        metacritic: "",
        playtime: "",
        image: "",
     });

    function onInputChange(e) {
        e.preventDefault()
        setVideogame({
            ...videogame,
            [e.target.name]: e.target.value,
            [e.target.genre]: e.target.value,
            [e.target.releaseDate]: e.target.value,
            [e.target.rating]: e.target.value,
            [e.target.metacritic]: e.target.value,
            [e.target.playtime]: e.target.value,
            [e.target.platforms]: e.target.value,
            [e.target.image]: e.target.value, 
        })
    }
        
    function onSubmit(e) {
        e.preventDefault()

        let rejexDate = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

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

        if (typeof e.target.genre.value !== "string") {
            setError(error = {
               ...error,
               genre: 'Genres can only be text'
            })
         } else if (!e.target.genre.value.length) {
            setError(error = {
                ...error,
                genre: 'Must introduce at least one genre'
             })
         } else {
            setError(error = {
               ...error,
               genre: ""
            })
         }

        if (videogame.releaseDate === '') {
            setError(error = {
              ...error,
              releaseDate: 'Must introduce a release date'
           })
        } else if (!rejexDate.test(videogame.releaseDate)) {
            setError(error = {
                ...error,
                releaseDate: 'Must introduce a date with the format Year/Month/Day'
             })
        } else {
            setError(error = {
              ...error,
              releaseDate: ''
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

         if (!e.target.name.value || !e.target.genre.value || !e.target.releaseDate || !e.target.platforms.value || !e.target.rating.value) {
            alert("Key values are missing") 
        }  else { 
            axios.post(`http://localhost:3001/videogames`, videogame)
            .then(() => {})
             alert("Videogame added succesfully") 
        }
    }

       
        

    return (
        <form action="" onSubmit={onSubmit} className={main.form}>

            <label htmlFor="">*Name: </label>
            <input className={main.formInputs} placeholder="Name..." onChange={onInputChange} name= "name" type="text" value= {videogame.name}/>
            {error.name && <p style={{ 'color': 'red' }}>{error.name}</p>}
            <br />
            <label htmlFor="">*Genres: </label>
            <input className={main.formInputs} placeholder="Genres..." onChange={onInputChange} name= "genre" type="text" value= {videogame.genre}/>
            {error.genre && <p style={{ 'color': 'red' }}>{error.genre}</p>}
            <br />
            <label htmlFor="">*Release Date: </label>
            <input className={main.formInputs} placeholder="YYYY/MM/DD" onChange={onInputChange} name= "releaseDate" type="text" value= {videogame.releaseDate}/>
            {error.releaseDate && <p style={{ 'color': 'red' }}>{error.releaseDate}</p>}
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
            <label htmlFor="">Image: </label>
            <input className={main.formInputs} onChange={onInputChange} name= "image" type="file" value= {videogame.image}/>
            <br />
            <input type="submit" value= "Add" onSubmit={onSubmit}/>
            <h4> *Required fields </h4>
        </form>
    )
}