import {
    OBTENER_TODOS_VIDEOGAMES,
    OBTENER_VIDEOGAMES_POR_NOMBRE,
    OBTENER_TODOS_GENEROS,
    OBTENER_VIDEOGAMES_POR_GENERO,
    OBTENER_PLATAFORMA,
    OBTENER_VIDEOGAMES_ORDENADO_ASC,
    OBTENER_VIDEOGAMES_ORDENADO_DESC,
    OBTENER_VIDEOGAMES_POR_RATING_MAYOR,
    OBTENER_VIDEOGAMES_POR_RATING_MENOR,
    CREAR_VIDEOGAME,
    VIDEOG_ID,
    GET_VIDEOGAMES_DB,
    GET_VIDEOGAMES_API
} from "./action.js";

const initialState = {
    videoGames: [],
    genres: [],
    platform: [],
    detail: [],
    allVideogames:[]
};

export default function rootReducer (state = initialState, action) {

    switch (action.type) {
        case OBTENER_TODOS_VIDEOGAMES:
            return {
                ...state,
                videoGames: action.payload,
                allVideogames:action.payload
                //filter: action.payload,
            };
        case OBTENER_VIDEOGAMES_POR_NOMBRE:
            return {
                ...state,
                videoGames: action.payload,
            };
        case OBTENER_TODOS_GENEROS:
            return {
                ...state,
                genres: action.payload,
                //allVideogames:action.payload
            };
        case OBTENER_VIDEOGAMES_POR_GENERO:
            return {
                ...state,
                videoGames: action.payload,
            };
        case OBTENER_PLATAFORMA:
            return {
                ...state,
                platform: action.payload,
            };
        case OBTENER_VIDEOGAMES_ORDENADO_ASC:
            return {
                ...state,
                videoGames: action.payload,
            };
        case OBTENER_VIDEOGAMES_ORDENADO_DESC:
            return {
                ...state,
                videoGames: action.payload,
            };
        case OBTENER_VIDEOGAMES_POR_RATING_MAYOR:
            return {
                ...state,
                videoGames: action.payload,
            };
        case OBTENER_VIDEOGAMES_POR_RATING_MENOR:
            return {
                ...state,
                videoGames: action.payload,
            };
        case CREAR_VIDEOGAME:
            return {
                ...state,
                videoGames: action.payload,
            }; 
        case VIDEOG_ID:
            return {
                ...state,
                detail: action.payload,
            };
        case GET_VIDEOGAMES_DB:
            return {
                ...state,
                videoGames: action.payload,
            };
        case GET_VIDEOGAMES_API:
            return {
                ...state,
                videoGames: action.payload,
            };
        default:
        return state;
    }
}