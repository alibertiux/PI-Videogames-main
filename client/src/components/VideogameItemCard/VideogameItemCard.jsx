import React from "react";
import "./VideogameItemCard.css"

export const  VideogameItemCard = ({id, image , name, genre, rating})=>{
       
    return (
        <div className="card-item">
            <img src={image} alt="imagen del video juego"/>
            
            <div className="text">
                 Videogame:
                <p> {name}  </p>
            </div>
                
            <div className="text">
                Genero:
            </div>

            <div className="text-genre">
                {genre.map(element => <p>{element}</p>)}
            </div>

            <div className="text">
                 Rating: 
            </div>          
            <div className="text">
               <p> {rating}</p>
            </div>
        </div>
    )
}