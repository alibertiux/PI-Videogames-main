import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { obtenerVideogamesPorNombre } from "../../Redux/action";
import "./SearchBar.css"

export function SearchBar (){

    const dispatch = useDispatch()
    const [ name, setName ] = useState (" ");

    function handleChange(e){
        e.preventDefault();
        setName(e.target.value)
    };

    function handleSubmit(e){
        e.preventDefault();
        console.log(name,"name");
        dispatch(obtenerVideogamesPorNombre(name))
        const searchBar = document.querySelector("#searchBar");
        searchBar.value = "";
        setName(" ")
    }
    
    return(
        <div >
            <input className="input"  id="searchBar" 
                type = "text"
                placeholder = "buscar Videogame"
                onChange = {((e) => handleChange(e))}
            />
            <button className="btn"
                type= "submit"
                onClick={((e) => handleSubmit(e))}> Buscar
            </button>
        </div>
    )
}