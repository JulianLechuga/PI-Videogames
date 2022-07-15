//  Al menos tener un modelo de la base de datos con sus tests respectivos
const { Op } = require ("sequelize")
const { conn, Videogame, Genre } = require('../src/db');
const axios = require("axios");
const { API_KEY } = process.env;

describe('Videogame Model', () => {
    beforeAll(async () => {
      await conn.sync({ force: true });
    });

    it('should create the Videogame if all the properties are the correct type of data', async () => {
        const videogameTest = await Videogame.create({
          name: 'Grand Project Testing V',
          description: "This is a test description",
          genres: ["Action","Puzzle", "Family"],
          platforms: ["PC", "Xbox"],
          rating: 3,
          playtime: 15,
          released: "1954-01-19",
          metacritic: 98,
        })
        expect(videogameTest.toJSON()).toEqual({
          id: videogameTest.id,
          name: videogameTest.name,
          description: videogameTest.description,
          platforms: videogameTest.platforms,
          rating: videogameTest.rating,
          playtime: videogameTest.playtime,
          released: videogameTest.released,
          metacritic: videogameTest.metacritic,
          background_image: "https://cdn.pixabay.com/photo/2020/05/02/07/32/gaming-5120169_960_720.jpg",
          createdInDB: true,
        });
      });

    it('should return an error if there are missing values neccesary to create the Videogame', async () => {
      try {
        const videogameError = await Videogame.create({
          description: "This is a test description",
          rating: 3,
          playtime: 15,
          released: "1977-04-03",
          metacritic: 9,
        })
      } catch (error) {
          expect(error.message).toBeDefined();
      };
    })

    it('should return an error if any value neccesary to create the Videogame is of the incorrect type', async () => {
      try {
        const videogameError = await Videogame.create({
          name: 'Grand Project Testing V',
          description: "This is a test description",
          platforms: 745,
          rating: "Not sure about this one",
          released: "1954-01-19",
          playtime: "Chief",
          metacritic: "Breaking down the code",
        })
      } catch (error) {
          expect(error.message).toBeDefined();
      };
    })

    it('should search the Videogame when the name is given', async () => {
        const videogameTest = await Videogame.create({
          name: 'Grand Project Testing V',
          description: "This is a test description",
          genres: ["Action","Puzzle", "Family"],
          platforms: ["PC", "Xbox"],
          rating: 3,
          playtime: 15,
          released: "1954-01-19",
          metacritic: 98,
        })

        let findGame = await Videogame.findAll({
          include: Genre,
          where: {
              name: {
                  [Op.iLike]: "%" + videogameTest.name + "%"
              }
          },
          order: [
              ["name", "ASC"]
          ]
      })
      expect(findGame.length).toBeTruthy();
    })

    it('should search the Videogame when the id is given', async () => {
      const videogameTest = await Videogame.create({
        name: 'Grand Project Testing V',
        description: "This is a test description",
        genres: ["Action","Puzzle", "Family"],
        platforms: ["PC", "Xbox"],
        rating: 3,
        playtime: 15,
        released: "1954-01-19",
        metacritic: 98,
      })

      let findGame = await Videogame.findByPk(videogameTest.id)

      expect(findGame.toJSON()).toEqual({
        id: videogameTest.id,
        name: videogameTest.name,
        description: videogameTest.description,
        platforms: videogameTest.platforms,
        rating: videogameTest.rating,
        playtime: videogameTest.playtime,
        released: videogameTest.released,
        metacritic: videogameTest.metacritic,
        background_image: "https://cdn.pixabay.com/photo/2020/05/02/07/32/gaming-5120169_960_720.jpg",
        createdInDB: true
      });
    })

    it('should return no results when searching for a videogame name that doesn´t exists', async () => {
      let findGame = await Videogame.findAll({
        include: Genre,
        where: {
            name: {
                [Op.iLike]: "%" + "This is not a videogame name"+ "%"
            }
        },
        order: [
            ["name", "ASC"]
        ]
    })
    expect(findGame.length).toBeFalsy();
  })

    it('should return an error when searching a Videogame id that doesn`t exist', async () => {
      let findGame = await Videogame.findByPk(18974561654)
      expect(findGame).toEqual(null);
    });

    it('should create a Genre if the name is valid', async () => {
      const genreTest = await Genre.create({
          id: 267,
          name: "Action",
          games_count: 948685132
      })
      expect(genreTest.toJSON()).toEqual({
        id: genreTest.id,
        name:genreTest.name,
        games_count:genreTest.games_count
      })
    });  

    it('should NOT create a Genre if the name is not valid', async () => {
      try {
        const genreTest = await Genre.create({
          id: 493,
          name: "Genre Testing",
          games_count: 158
      })
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });  


    it('should create all the genres from the API, then create a game and assign its corresponding genres', async () => {
      const request = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      const allGenres = await Genre.bulkCreate(request.data.results)
      const videogameTest = {
        name: 'Grand Project Testing V',
        description: "This is a test description",
        genres: ["Action", "Puzzle", "Family"],
        platforms: ["PC", "Xbox"],
        rating: 3,
        playtime: 15,
        released: "1954-01-19",
        metacritic: 98,
      }

      let newGame = await Videogame.create(videogameTest)
          for (let j = 0; j < videogameTest.genres.length; j++) {
              let eachGenre = await Genre.findOne({where: { name: videogameTest.genres[j] }})
              await newGame.addGenres(eachGenre)
              }
      let findGame = await Videogame.findByPk(newGame.id,{include: Genre})
      console.log(findGame.length)

      expect(Object.keys(findGame).length).toBeTruthy() && expect(findGame.genres.length).toBeTruthy()
    })

afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
    })
});