const { Router } = require("express");
//const express = require("express");
const { getGenres, addGenres } = require("../controllers/GenrersController");

const router = Router();

//Obtener todos los tipos de géneros de videojuegos posibles
//En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
//https://api.rawg.io/api/genres
//[ ] GET /genres:
router.get("/getGenre", getGenres);

//[ ] POST /genres:
router.post("/addGenre", addGenres);

module.exports = router;