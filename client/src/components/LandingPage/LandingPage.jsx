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

            <img  src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7a4f2faf-7d57-48f8-8b4e-ea655774db6b/ddrfu5v-8497eeac-ad03-4abf-957a-63159599231e.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzdhNGYyZmFmLTdkNTctNDhmOC04YjRlLWVhNjU1Nzc0ZGI2YlwvZGRyZnU1di04NDk3ZWVhYy1hZDAzLTRhYmYtOTU3YS02MzE1OTU5OTIzMWUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.SbdmPxKow9FRyC7SIOIuyFJIYM7go6XiJjAu4L0wRaU
            " alt="" />
            
            <div>
            <Link to="/home">
                <span className="link">Ingresar</span>
            </Link>
                <br/>
            
            </div>
        </div>
    )
}