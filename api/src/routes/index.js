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
    let videogames

    if(name) {
        videogamesAPI =  axios(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        videogames = Videogame.findAll({
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
    } 

    for (let i = 3498; i < 3499; i++) {
        try {
            let videogamesAPI =  `https://api.rawg.io/api/games/${i}?key=${API_KEY}`
            let videogamesData = await axios(videogamesAPI);
            finalData = await videogamesData.data
            if (!finalData.detail) {
                await Videogame.create({
                    id: finalData.id,
                    name: finalData.name,
                    description: finalData.description,
                    released: finalData.released ,
                    platforms: finalData.platforms.map(p => p.name).join(", "),
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
    res.send("Momento gamer")
    videogames = Videogame.findAll()
    // res.json(videogames)
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
    }

})

router.post("/videogames", async (req, res, next) => {
    let {name, releaseDate, rating, genre, metacritic, platforms, image, playtime} = req.body
    try {
        let newGame = await Videogame.create({
            name,
            slug: name.toLowerCase(),
            releaseDate,
            platforms: [platforms],
            playtime: playtime,
            rating: Number(rating),
            metacritic: Number(metacritic),
            genre: [genre],
            image,
        })
        res.status(201).json(newGame)
    } catch (error) {
        next(error)
    }
});

router.get("/genres", async (req, res, next) => {
    let genreAPI = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    try {
        let newGenre = await Genre.bulkCreate(genreAPI.data.results)
        res.json(newGenre)
    } catch (error) {
        next(error)
    }
})


module.exports = router;
