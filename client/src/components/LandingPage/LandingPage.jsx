import React from "react";
import  "./LandingPage.css"
import { Link } from 'react-router-dom'


export const LandingPage = () => {
    return(
        <div >
            <div>
                <span className="span">Henry Videogames PI</span>                
                <br/>
            </div>

            <img  src="https://img.unocero.com/2021/11/Videojuegos-compras-online--1024x576.jpg" alt="" />
            
            <div>
            <Link to="/home">
                <span className="link">Ingresar</span>
            </Link>
                <br/>
            
            </div>
        </div>
    )
}