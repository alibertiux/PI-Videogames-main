const { Router } = require("express");

const {
  getVideogames,
  getVideogamesByName,
  getVideogamesById,
  addVideogames,
  getVideogamesDB,
  getVideogameAPI

} = require("../controllers/VideogamesController.js");

const router = Router();

//[ ] GET /videogames:
//Obtener un listado de los videojuegos
//Debe devolver solo los datos necesarios para la ruta principal
//https://api.rawg.io/api/games
router.get("/getVideogame", getVideogames);

//[ ] GET /videogames?name="...":
//Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
//Si no existe ningún videojuego mostrar un mensaje adecuado
//https://api.rawg.io/api/games?search={game}
router.get("/getVideogame/:name", getVideogamesByName);  // by name

//[ ] GET /videogame/{idVideogame}:
//Obtener el detalle de un videojuego en particular
//Debe traer solo los datos pedidos en la ruta de detalle de videojuego
//Incluir los géneros asociados
//https://api.rawg.io/api/games/{id}
router.get("/getVideogameDetail/:id", getVideogamesById);

//Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
//Crea un videojuego en la base de datos
//[ ] POST /videogame:
router.post("/addVideogame", addVideogames);


router.get("/getVideogameDB", getVideogamesDB);

router.get("/getVideogameAPI", getVideogameAPI);


module.exports = router;