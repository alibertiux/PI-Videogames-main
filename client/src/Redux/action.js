/* eslint-disable no-array-constructor */
import axios from "axios";

export const OBTENER_TODOS_VIDEOGAMES = "OBTENER_TODOS_VIDEOGAMES";
export const OBTENER_VIDEOGAMES_POR_NOMBRE = "OBTENER_VIDEOGAMES_POR_NOMBRE";
export const OBTENER_TODOS_GENEROS = "OBTENER_TODOS_GENEROS";
export const OBTENER_VIDEOGAMES_POR_GENERO = "OBTENER_VIDEOGAMES_POR_GENERO";
export const OBTENER_PLATAFORMA = "OBTENER_PLATAFORMA";
export const OBTENER_VIDEOGAMES_ORDENADO_ASC = "OBTENER_VIDEOGAMES_ORDENADO_ASC";
export const OBTENER_VIDEOGAMES_ORDENADO_DESC = "OBTENER_VIDEOGAMES_ORDENADO_DESC";
export const OBTENER_VIDEOGAMES_POR_RATING_MAYOR = "OBTENER_VIDEOGAMES_POR_RATING_MAYOR";
export const OBTENER_VIDEOGAMES_POR_RATING_MENOR = "OBTENER_VIDEOGAMES_POR_RATING_MENOR";
export const CREAR_VIDEOGAME = "CREAR_VIDEOGAME";
export const VIDEOG_ID = "VIDEOG_ID";
export const GET_VIDEOGAMES_DB ="GET_VIDEOGAMES_DB";
export const GET_VIDEOGAMES_API ="GET_VIDEOGAMES_API";


export function obtenerTodosVideogames(videogameType, videoGamesList) {
    //console.log(videogameType, "videogameType");
    //console.log(videoGamesList, "vgt");
    return async function (dispatch) {
        try {
            videoGamesList = typeof videoGamesList != "undefined" ? videoGamesList : new Array();
            let videogames = videoGamesList;
            //console.log(videogames, "videogames");
            //console.log(videoGamesList, "videoGamesListdfdfgd");
            if (videoGamesList.length <= 0) {
                //console.log(videoGamesList, "videoGamesList");
                videogames = await axios.get("http://localhost:3005/api/getVideogame");
                //console.log(videogames, "videogames api");
                videogames = videogames.data;
                //console.log(videogames, "videogames.data");
            }
            if (videogameType === "" || videogameType === "Todos") {
                dispatch({
                    type: OBTENER_TODOS_VIDEOGAMES,
                    payload: videogames, // arreglo de objetos
                });
            } else if (videogameType === "API") {
                    const videogamesAPI = videogames.filter((v) => {
                        console.log(typeof v.id === "number");
                        return v.createdDb === false;
                    });
                    dispatch({
                        type: OBTENER_TODOS_VIDEOGAMES,
                        payload: videogamesAPI, // arreglo de objetos
                    });
            } else if (videogameType === "Creados") {
                console.log(videogameType, "videogameType");
                const videogamesCreados = videogames.filter((v) => {
                    console.log(typeof v.id === "string");
                    return v.createdDb === true;
                });
                if (videogamesCreados.length > 0) {
                    console.log(videogames, "vg");
                    dispatch({
                        type: OBTENER_TODOS_VIDEOGAMES,
                        payload: videogamesCreados,
                    });
                }
        }
        } catch (error) {
            console.log(Error);
        }
    };
}

export function obtenerVideogamesPorNombre(name) {
    return async function (dispatch) {
        try {
            if (name !== "") {
                const videoG = await axios.get(`http://localhost:3005/api/getVideogame?name=${name}`);
                if (videoG.data.error) {
                    alert("videojuego no encontrado")
                    console.log(videoG, "name action");                    
                }else{
                    console.log(videoG, "name action");
                    return dispatch({
                        type: OBTENER_VIDEOGAMES_POR_NOMBRE,
                        payload: videoG.data,
                    });
                }
            }
        } catch (error) {
        console.log(error);
        }
    };
}

export function obtenerTodosGeneros() {
    return async function (dispatch) {
        try {
        const generos = await axios.get("http://localhost:3005/api/getGenre"); //traigo del back
        dispatch({
            type: OBTENER_TODOS_GENEROS,
            payload: generos.data, // arreglo de objetos
        });
        } catch (error) {
        alert(Error);
        }
    };
}

export function obtenerVideoGamesPorGenero(videogame, name) {
    return async function (dispatch) {
        try {
            if (name !== "") {
                //videogame.filter((v) => console.log( v.genre, "genre"));
                const videogameFilter = videogame?.filter((v) => v.genre?.includes(name));                
                if (videogameFilter.length > 0) {
                    dispatch({
                        type: OBTENER_VIDEOGAMES_POR_GENERO,
                        payload: videogameFilter,
                    });
                } else {
                    alert("videojuego no encontrado");
                }
            } else {
                dispatch({
                    type: OBTENER_VIDEOGAMES_POR_GENERO,
                    payload: videogame,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
}

export function obtenerPlataforma(videojuegos, name) {
    return async function (dispatch) {
        try {
            const videojuegos = await axios.get("http://localhost:3005/api/getVideogame");
            console.log(videojuegos,"videojuegos");
            let filter = [];
            let platformSet = new Set();
            videojuegos.data.map((platforms) => {
                return platforms.platform?.map((plataforma) => {
                    if (plataforma.name!== undefined) {
                        platformSet.add(plataforma.name);
                    }
                    return platformSet;
                });          
            });
            filter = Array.from(platformSet)
            console.log(filter, "filterMap");
            dispatch({
                type: OBTENER_PLATAFORMA,
                payload: filter,
            });
        } catch (error) {
            alert(error + ". Please change de api key");
        }
    };
}

export function obtenerVideogamesOrdenadasAsc(videojuegos) {
    return function (dispatch) {
        try {
            videojuegos.sort((a, b) => {
                if (a.name < b.name) return -1;
                else if (a.name > b.name) return 1;
                return 0;
            });
        dispatch({
            type: OBTENER_VIDEOGAMES_ORDENADO_ASC,
            payload: videojuegos,
        });
        } catch (error) {
            console.log(error + "verifica tu APIKEY");
        }
    };
}

export function obtenerVideogamesOrdenadasDesc(videojuegos) {
    return function (dispatch) {
        try {
            videojuegos.sort((a, b) => {
                if (a.name > b.name) return -1;
                else if (a.name < b.name) return 1;
                return 0;
            });
            //console.log(videojuegos);
            dispatch({
                type: OBTENER_VIDEOGAMES_ORDENADO_DESC,
                payload: videojuegos,
            });
        } catch (error) {
            console.log(error + "verifica tu APIKEY");
        }
    };
}

export function obtenerVideogamesPorRatingMayor(videojuegos) {
    return function (dispatch) {
        try {
            videojuegos.sort((a, b) => {
                if (a.rating > b.rating) return -1;
                else if (a.rating < b.rating) return 1;
                return 0;
            });
            dispatch({
                type: OBTENER_VIDEOGAMES_POR_RATING_MAYOR,
                payload: videojuegos,
            });
        } catch (error) {
            alert(error + ". Please change de api key");
        }
    };
}

export function obtenerVideogamesPorRatingMenor(videojuegos) {
    return function (dispatch) {
        try {
            videojuegos.sort((a, b) => {
                if (a.rating < b.rating) return -1;
                else if (a.rating > b.rating) return 1;
                return 0;
            });
            //console.log(videojuegos);
            dispatch({
                type: OBTENER_VIDEOGAMES_POR_RATING_MENOR,
                payload: videojuegos,
            });
        } catch (error) {
            console.log(error + "verifica tu APIKEY");
        }
    };
}

export function CrearVideogame(payload) {
    return async function (dispatch) {
        const addVideogame = await axios.post(`http://localhost:3005/api/addVideogame`,payload);
        return addVideogame;
    };
}

export function videogId(id) {
    return async function (dispatch) {
        try {
        const gameId = await axios.get(`http://localhost:3005/api/getVideogameDetail/${id}`);
        console.log(gameId, "gameID");
        return dispatch({
            type: VIDEOG_ID,
            payload: gameId.data,
        });
        } catch (error) {
            console.log(error);
        }
    };
}

export function getVideogamesDB (){
    return async function(dispatch){
        try{
            const videogameDB = await axios.get(`http://localhost:3005/api/getVideogameDB`)
            console.log(videogameDB,"videogameDB");
            dispatch({
                type:GET_VIDEOGAMES_DB,
                payload: videogameDB.data,
            })
        }catch (e){
            console.log(Error);
        }
    }
}

export function obtenerVideogamesAPI () {
    //console.log(videogameType, "videogameType");
    //console.log(videoGamesList, "vgt");
    return async function (dispatch) {
        try {
            const videogames = await axios.get("http://localhost:3005/api/getVideogame");
            const videogamesAPI = videogames.data.filter((v) => {
                console.log(typeof v.id === "number");
                return v.createdDb === false;
            });
            dispatch({
                type: GET_VIDEOGAMES_API,
                payload: videogamesAPI, // arreglo de objetos
            });            
        } catch (error) {
            console.log(Error);
        }
    };
}