const { Router, response } = require('express');
const { Op } = require ("sequelize")
const { Videogame } = require ("../db")
const { Genre } = require ("../db")
const axios = require("axios");
const {
    API_KEY,
  } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// [ ] GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal
// [ ] GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado
// [ ] GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados
// [ ] POST /videogames:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos, relacionado a sus géneros.
// [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res, next) => {
    let videogamesAPI =  await axios(`https://api.rawg.io/api/games?key=${API_KEY}`)
    let name = req.query.name;
    let videogame

    if(name) {
        try {
            let videogameDB = await Videogame.findAll({
                include: Genre,
                where: {
                    name: {
                        [Op.iLike]: "%" + name + "%"
                    }
                },
                order: [
                    ["name", "ASC"]
                ]
            })
            let videogameAPI = await axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
            if (videogameDB.length) {
                videogame = [videogameDB.concat(videogameAPI.data.results)]
            } else {
                videogame = videogameAPI.data.results
            }
            console.log(videogame)
            return res.status(200).json(videogame)
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            let localDb =  await Videogame.findAll({include: Genre})
            let subsequent = videogamesAPI.data.next
            let subsequentReq = await axios(subsequent)
            let subsequentReq2 =  await axios(subsequentReq.data.next)
            let subsequentReq3 =  await axios(subsequentReq2.data.next)
            let subsequentReq4 =  await axios(subsequentReq3.data.next)
            let subsequentReq5 =  await axios(subsequentReq4.data.next)
            videogame = [...localDb.concat(videogamesAPI.data.results).concat(subsequentReq.data.results).concat(subsequentReq2.data.results).concat(subsequentReq3.data.results).concat(subsequentReq4.data.results).concat(subsequentReq5.data.results)] ;
            return res.status(200).json(videogame)
        } catch (error) {
            next(error)
        };
        let videogames = await Videogame.findAll({include: Genre})
        return res.json(videogames)
    }
})

router.get("/videogames/:id", async (req, res, next) => {
    let id = req.params.id
    let game

    try {        
        if (id > 20000000) { 
            game = await Videogame.findByPk(id, {
                include: Genre
            })
        } else {
            let gameSearch = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            game = gameSearch.data
        }
        return res.status(200).json(game)
    } catch (error) {
        console.log()
        next(error)
    };

})

router.post("/videogames", async (req, res, next) => {
    let {name, released, rating, genres, description, metacritic, platforms, background_image, playtime} = req.body
    let genresFind
    try {

        if(!name || !released || !rating || !genres || !platforms){
            return res.status(400).json({error: "Missing key values"})
        }

        let newGame = await Videogame.create({
            name,
            released,
            platforms: platforms,
            description,
            playtime: playtime,
            rating: rating,
            metacritic: metacritic,
            background_image,
        })

        if (typeof genre === "object") {
            for (let i = 0; i < genre.length; i++) {
                genresFind = await Genre.findAll({where: {name:  genres[i] } })
                await newGame.addGenres(genresFind)
            }
        } else {
            genresFind = await Genre.findAll({where: {name:  genres } })
            await newGame.addGenres(genresFind)
        }

        let fullGame = await Videogame.findOne({
            include: Genre,
            where: {
                name: name
            }})

        res.status(201).json(fullGame)
    } catch (error) {
        next(error)
    };
});

router.get("/genres", async (req, res, next) => {
    let genreAPI = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    try {
        let newGenre = await Genre.bulkCreate(genreAPI.data.results)
        res.json(newGenre)
    } catch (error) {
        next(error)
    };
});


module.exports = router;
