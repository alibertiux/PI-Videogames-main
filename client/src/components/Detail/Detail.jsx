import React, { useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {videogId} from '../../Redux/action'
import "./Detail.css"

export const Detail = () => {

    const dispatch = useDispatch()
    const detail = useSelector((state) => state.detail)
    console.log(detail, "detail");
    const {id} = useParams();
    
    useEffect(() => {
        dispatch(videogId(id))

    }, [dispatch])

        return (
        <div>
            <img className='imagen' src={detail.image} alt="imagen del video juego"/>  
            <br/><br/>

            <div>
                <span className='titleDetail'> Videogame: {detail.name} </span>
            </div><br/>

            <span className='titleDetail'>Genero:</span>
            <div>
                {detail.genre?.map((element) => <span className='spanDetail' >{element} &nbsp; </span>)}
            </div><br/>
          
            <span className='titleDetail'>Descripcion:</span>
            <div className='detail'>
                <span className='spanDetail'> {detail.description} </span>
            </div><br/>

            <span className='titleDetail'>Fecha de lanzamiento:</span>
            <div>
                <span className='spanDetail'> {detail.released} </span>
            </div><br/>
          
            <span className='titleDetail'>Puntuacion:</span>
            <div>
                <span className='spanDetail'> {detail.rating} </span>
            </div><br/>

            <span className='titleDetail' >Plataformas:</span>
            <div>
                {detail.platform?.map((element) => (
                    <span className='spanDetail'>{element.name ? element.name : element} &nbsp; </span>)
                )}
            </div><br/>
            
            <Link to = "/home">
                <button className="btnDetail">Regresar</button>
            </Link>           
        </div>
    )
};