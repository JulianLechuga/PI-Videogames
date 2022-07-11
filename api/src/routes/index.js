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
    let name = req.query.name;
    let videogame

    if(name) {
        videogame = await Videogame.findAll({
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
        return res.json(videogame)
    };

    for (let i = 0; i < 30; i++) { //108
        try {
            let videogamesAPI =  `https://api.rawg.io/api/games/${i}?key=${API_KEY}`
            let videogamesData = await axios(videogamesAPI);
            finalData = await videogamesData.data
            if (!finalData.detail) {
                await Videogame.create({
                    id: finalData.id,
                    name: finalData.name,
                    description: finalData.description.replaceAll("<p>","").replaceAll("</p>","").replaceAll("<br />","").replaceAll("<br/>","").replaceAll("<strong>","").replaceAll("</strong>","").replaceAll("<ul>","").replaceAll("</ul>","").replaceAll("<li>","").replaceAll("</li>","").replaceAll("[object Object]",""),
                    released: finalData.released ,
                    platforms: finalData.platforms.map(ps => ps.platform.name),
                    background_image: finalData.background_image,
                    rating: parseInt(finalData.rating),
                    metacritic: finalData.metacritic,
                    playtime: parseInt(finalData.playtime),
                })
            let genreMap = finalData.genres.map(g => g.id)
            if ( typeof genreMap[0] === "number") {
                for (let j = 0; j < genreMap.length; j++) {
                    let toSet = await Videogame.findByPk(finalData.id)
                    let genreBdd = await Genre.findByPk(genreMap[j])
                    await toSet.addGenres(genreBdd)
                    }
                }
            }
        } catch (error) {
            continue
        };
    };
    let videogames = await Videogame.findAll({include: Genre})
    res.json(videogames)
})

router.get("/videogames/:id", async (req, res, next) => {
    let id = req.params.id
    let game
    try {
        game = await Videogame.findByPk(id, {
            include: Genre
        })
        return res.json(game)
    } catch (error) {
        next(error)
    };

})

router.post("/videogames", async (req, res, next) => {
    let {name, released, rating, genre, metacritic, platforms, background_image, playtime} = req.body
    let genres
    try {
        let newGame = await Videogame.create({
            name,
            released,
            platforms: [platforms],
            playtime: Number(playtime),
            rating: Number(rating),
            metacritic: Number(metacritic),
            background_image,
        })

        if (typeof genre === "object") {
            for (let i = 0; i < genre.length; i++) {
                genres = await Genre.findAll({where: {name:  genre[i] } })
                await newGame.addGenres(genres)
            }
        } else {
            genres = await Genre.findAll({where: {name:  genre } })
            await newGame.addGenres(genres)
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
