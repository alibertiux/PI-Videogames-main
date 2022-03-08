import React from "react";
import "./VideogameItemCard.css"

export const  VideogameItemCard = ({id, image , name, genre, rating})=>{
       
    return (
        <div className="card-item">
        
                <img src={image} alt="imagen del video juego"/>
                <div className="text">
                    <p > Videogame: <br/>{name}  </p>
                </div>
                
                <div className="text">
                    <p >Genero:</p>
                </div>
                <div className="text-genre">
                    {genre.map(element => <p >{element}</p>)}
                </div>

                <div className="text-genre">
                    <p >rating: {rating}</p>
                </div>          
        </div>
    )
}