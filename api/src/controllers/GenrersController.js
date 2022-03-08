const axios = require("axios");
const { Genre } = require("../db");
const APIKEY = process.env.YOUR_API_KEY;

//lista, obtener todos
const getGenres = async (req, res, next) => {
    try {
        let genreDB = await Genre.findAll();
        if (genreDB <= 0) {
        const genreList = await axios.get(
            `https://api.rawg.io/api/genres?key=${APIKEY}`
        );
        if (genreList) {
            let aux = genreList.data.results?.map((g) => {
                return {
                    id: g.id,  
                    name: g.name
                }
            });
            let genres = [];
            for (let i = 0; i < aux.length; i++) {
                genres.push(
                    await Genre.findOrCreate({
                    where: { name: aux[i].name },
                    })
                );
            }
            await Promise.all(genres).then((response) => {
                genreDB = genres;
            });
            return res.status(200).send(genreDB);
        } else {
            res.json({ message: "Error" });
        }
        } else {
            return res.status(200).send(genreDB);
        }
    } catch (e) {
        next(e);
    }
};

const addGenres = async (req, res) => {
    const { genero } = req.body;
    console.log(genero);
    if (genero) {
        try {
            let nuevo = await Genre.create(genero);
            if (nuevo) res.json({ message: "creado", data: nuevo });
            else res.json({ message: " no se pudo crear" });
        } catch (e){
            res.send(e);
        }
    } else {
        res.json({ message: "error" });
    }
};

module.exports = {
    getGenres,
    addGenres,
};
