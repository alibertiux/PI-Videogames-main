const axios = require("axios");
const { Videogame } = require("../db.js");
const APIKEY = process.env.YOUR_API_KEY;

//lista, obtener todos

const getVideogames = async (req, res, next) => {
    const name = req.query.name;
    let allVideogames = [];
    if (name) {
        const videogame = await getVideogamesByName(name);
        return res.send(videogame);
    }
    try {
        // hacemos pedido a api
        const videogameList = [];
        for (let i = 1; i <= 5; i++) {
        videogameList.push(
            await axios
            .get(`https://api.rawg.io/api/games?key=${APIKEY}&page=${i}`)
            .then((response) => {
                return response;
            })
        );
        }
        console.log(videogameList, "videogameList");
        const videogameDB = await Videogame.findAll();
        await Promise.all(videogameList).then((response) => {
        for (let i = 0; i < videogameList.length; i++) {
            allVideogames = allVideogames.concat(
            videogameList[i].data.results?.map((v) => {
                return {
                id: v.id,
                name: v.name,
                released: v.released,
                rating: v.rating,
                platform: v.platforms.map((p) => {
                    return {
                    name: p.platform.name,
                    };
                }),
                image: v.background_image,
                genre: v.genres.map((g) => {
                    return g.name;
                }),
                createdDb: false,
                };
            })
            );
        }
        });
        if (videogameList || videogameDB) {
            let videogames = [...videogameDB ,...allVideogames];
            console.log(videogames.length);
            res.send(videogames);
        } else {
            res.json({ message: "Error" });
        }
    } catch (e) {
        next(e);
    }
};

const getVideogamesByName = async (name) => {
    try {
        const Sequelize = require("sequelize");
        const Op = Sequelize.Op;
        // hacemos pedido a api
        const videogame = await axios.get(
        `https://api.rawg.io/api/games?search=${name}&key=${APIKEY}`
        );
        //console.log(name, "name controller");
        //console.log(videogame,"videogame controller");
        //pedidio a la DB
        const videogameDB = await Videogame.findAll({
        where: {
            name: {
            [Op.like]: `%${name}%`,
            },
        },
        });
        console.log(videogameDB);
        if (videogame || videogameDB) {
        //id: videogame.data.id,
        let aux = videogame.data.results.map((v) => {
            //console.log(v,"v");
            return {
            id: v.id,
            name: v.name,
            platform: v.platforms.map((p) => {
                return p.platform.name;
            }),
            released: v.released,
            image: v.background_image,
            rating: v.rating,
            genre: v.genres.map((g) => {
                return g.name;
            }),
            };
        });
        aux.push(...videogameDB);
        //console.log(aux,"aux");
        return aux;
        } else {
            return { message: "Error" };
        }
    } catch (e) {
        return { error: e };
    }
};

const getVideogamesById = async (req, res, next) => {
    try {
        const id = req.params.id;
        let matcher =
        "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$";
        if (id.match(matcher)) {
            const videogameDB = await Videogame.findOne({
                where: {
                id: id,
                },
            });
            if (videogameDB) {
                console.log(videogameDB);
                return res.send(videogameDB);
            }
        }
        console.log(typeof parseInt(id, 10), "fgvhbjnk");
        const videogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${APIKEY}`);
        console.log(videogame);
        if (videogame.status === 200) {
        let aux = {
            id: videogame.data.id,
            name: videogame.data.name,
            description: videogame.data.description_raw,
            released: videogame.data.released,
            rating: videogame.data.rating,
            platform: videogame.data.platforms.map((p) => {
            return {
                name: p.platform.name,
            };
            }),
            image: videogame.data.background_image,
            genre: videogame.data.genres.map((g) => {
            return g.name;
            }),
        };
        res.send(aux);
        }
    } catch (e) {
        next(e);
    }
};

const addVideogames = async (req, res) => {
    const {
        name,
        description,
        released,
        rating,
        platform,
        image,
        createdDb,
        genre,
    } = req.body;
    console.log(req.body, "vj");
    if (name) {
        try {
            let nuevo = await Videogame.create({
                name,
                description,
                released,
                rating,
                platform,
                image,
                genre,
            });
                if (nuevo) res.json({ message: "creado", data: nuevo });
                else res.json({ message: " no se pudo crear" });
        } catch (e) {
            res.send(e);
        }
    } else {
        res.json({ message: "error" });
    }
};

const getVideogamesDB = async (req, res) => {
    const videogameDB = await Videogame.findAll()
        .then((videogameDB) => {
            res.send(videogameDB);
        })
        .catch((e) => {
            return "e";
        });
};

const getVideogameAPI = async (req, res) => {
    try {
        const videogameList = [];
        for (let i = 1; i <= 5; i++) {
            videogameList.push(
                await axios
                .get(`https://api.rawg.io/api/games?key=${APIKEY}&page=${i}`)
                .then((response) => {
                    res.send(response[0]);
                })
            );
        }
    } catch (e) {
        return e;
    }
};

module.exports = {
  getVideogames,
  getVideogamesByName,
  getVideogamesById,
  addVideogames,
  getVideogamesDB,
  getVideogameAPI,
};
