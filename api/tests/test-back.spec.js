//[ ] Al menos tener una ruta del backend con sus tests respectivos

//const session = require('supertest-session');
// const app = require('../../src/app.js');
//const { Videogame, Genre, conn } = require('../src/db.js');
// const server = require('../src/routes/index');

const chaiHTTP = require('chai-http');
const chai = require('chai');
const { expect } = require('chai');
chai.use(chaiHTTP);

const expectStatus = (expected, res, method) => {
    if (expected === 500 || expected === 404) {
      throw new Error(
        "The expected status should be something other than 404 or 500"
      );
    }
  
    switch (res.status) {
      case 500:
        throw new Error(
          `The server threw an error while executing the request ${method} to this path (status code 500)`
        );
  
      case 404:
        throw new Error(
          `The handler for the request ${method} is not implemented (status code 404).`
        );
  
      default:
        if (expected !== res.status) {
          const msg = `Expected status ${expected} but got ${res.status} from this route`;
          throw new Error(msg);
        }
  
        expect(res).to.be.json;
  
        if (expected === 422) {
          expect(res.body).to.have.property('error');
        }
    }
  };

const req = (method, status, body = null, path = "/videogames") => {
    const property = method.toLowerCase();
    let request = chai.request("http://localhost:3001")[property](path);
  
    if (body) {
      request = request.send(body);
    }

    return request
      .catch((err) => {
        if (err.response) {
          return err.response;
        }
        throw err;
      })
      .then((res) => {
        expectStatus(status, res, method);
        return res.body;
      });
  };

const addGame = (game) => {
    return req("POST", 201, game).then((newGame) => {
      expect(newGame).to.have.property('name').that.equals(game.name);
      expect(newGame).to.have.property('genres')
      expect(newGame).to.have.property('platforms').that.contains(game.platforms);
      expect(newGame).to.have.property('released').that.equals(game.released);
      expect(newGame).to.have.property('rating').that.equals(game.rating);
      expect(newGame).to.have.property('background_image')
      expect(newGame).to.have.property('playtime');
      expect(newGame).to.have.property('metacritic');
      expect(newGame).to.have.property('description');
      expect(newGame).to.have.property('id').that.is.a('number').and.to.be.gt(201100000);
      game.id = newGame.id;
      return game;
    });
  };


describe('POST /videogames', () => {
      it('Adds a new Videogame', () => {
        const game = { name: "Counter Routing: Global State", genres: ["Action", "Strategy", "Puzzle"], platforms: "PC", rating: "5.00", released: "1971-04-06", playtime: 23, metacritic: 100, description: null };
        return addGame(game)
          .then((gameReturned) => {
            expect(gameReturned).to.deep.equal(game);
          });
      });
  
      it('Returns an error when the name is missing', () => {
        return req("POST", 400, { genres: ["Action", "Shooter", "Puzzle"], platforms: "PC", rating:"3.56", released: "1971-04-06", playtime: 23, metacritic: 100, description: null });
      });
  
      it('Returns an error when genres are missing', () => {
        return req("POST", 400, { genres: ["Action", "Shooter", "Puzzle"], platforms: "PC", rating:"4.20", released: "1971-04-06", playtime: 23, metacritic: 100, description: null });
      });
  
      it('Returns an error when platforms are missing', () => {
        return req("POST", 400, { name: 'Counter Routing: Global State', genres: ["Action", "Shooter", "Puzzle"], rating: 5.00, released: "1971-04-06", playtime: 23, metacritic: 100, description: null });
      });

      it('Returns an error when rating is missing', () => {
        return req("POST", 400, { name: 'Counter Routing: Global State', genres: ["Action", "Shooter", "Puzzle"], rating: "5.00", released: "1971-04-06", playtime: 23, metacritic: 100, description: null });
      });

      it('Adds a new Videogame even with missing non-key parameters', () => {
        const game = { name: "Counter Routing: Global State", genres: ["Action", "Strategy", "Puzzle"], platforms: "PC", rating: "5.00", released: "1971-04-06"};
        return addGame(game)
          .then((gameReturned) => {
            expect(gameReturned).to.deep.equal(game);
          });
      });
});   