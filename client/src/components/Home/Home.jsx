import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Nav } from "../Nav/Nav";
import  "./Home.css";
import {SearchBar} from '../SearchBar/SearchBar'
import { 
    obtenerTodosVideogames,
    obtenerTodosGeneros,
} from '../../Redux/action';

export const Home = () => {
    
    function onChange(videogame) {
        console.log(videogame, "videogame");
          if (videogame === "") return;
    }

    const videoGames =useSelector((state) => state.videoGames);
    const genres = useSelector((state) => state.genres)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(obtenerTodosVideogames("Todos"), []);
        dispatch(obtenerTodosGeneros()); 
    }, [dispatch])
    // if(videoGames.error){
    //     //alert("videojuego no encontrado")
    // }
    
    // return videoGames.length > 0 && genres.length > 0 (
        return (
        <div className="contenedor">
            <h1>
            <span className="spanHome">Videogames</span>
            </h1>  
           <div className="navigation">
               <div>
                    <Link to = "/createvideogame">
                    <button className="btnHome">Crear Videogame</button>
                    </Link>                 
                </div>
                <div> 
                    <SearchBar /> 
                </div>
            </div>      
            <div>
                <Nav onChange={onChange}/>
            </div>
        </div>
    )
    // ): (
    // <div className="cargando">
    //     <br />
    //     <br />
    //     <br />
    //     <div>
    //         <span>CARGANDO</span><br/>
    //         <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="no sale" />
    //     </div>
    // </div>)
}