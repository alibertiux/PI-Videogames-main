import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./FilterPagination.css"

import { 
    obtenerTodosVideogames,
    obtenerTodosGeneros,
    obtenerVideoGamesPorGenero,
    obtenerVideogamesOrdenadasAsc,
    obtenerVideogamesOrdenadasDesc,
    obtenerVideogamesPorRatingMayor,
    obtenerVideogamesPorRatingMenor,
    getVideogamesDB,
    obtenerVideogamesAPI
} from '../../Redux/action';

import { VideogameItemCard } from '../VideogameItemCard/VideogameItemCard';

export const FilterPagination = () => {

    const renderData = datas =>{
        return (
            <div className='card'>
                {datas?.map((todo) =>{
                    return ( <a href={`/detalle/${todo.id}`}>
                        <VideogameItemCard
                        id={todo.id} 
                        image ={todo.image} 
                        name={todo.name} 
                        genre={todo.genre} 
                        rating={todo.rating}
                        /></a>) 
                })}
            </div>
        )
    }
 
    //----------------filtros-------------------------
    
    const handleVideogameCreados = (e) => {
        e.preventDefault()
        if (e.target.value === "Todos") {
            //console.log(e.target.value," value");
             dispatch (obtenerTodosVideogames(e.target.value, []))
         }
         else if (e.target.value === "API") {
             dispatch (obtenerVideogamesAPI())
         }
         else if (e.target.value === "Creados") {
         dispatch (getVideogamesDB())
        }
    }

    const handleGeneros = (e) => {
        //e.preventDefault()
        if (e.target.value === "Todos"){
            dispatch (obtenerTodosVideogames("Todos"),[])
            setcurrentPage(1);
            return
        }        
        dispatch(obtenerVideoGamesPorGenero(videoGames, e.target.value));
        setcurrentPage(1);
    };

    const handleFilterOrd = (e) => {
        if (e.target.value === "Todos") {
            dispatch (obtenerTodosVideogames("Todos"),[])
        }
        else if (e.target.value === "A - Z") {
              dispatch(obtenerVideogamesOrdenadasAsc(videoGames));
        }
        else if (e.target.value === "Z - A") {
              dispatch(obtenerVideogamesOrdenadasDesc(videoGames));
        };
    }

    const handleFilterRaiting = (e) => {
        if (e.target.value === "Todos") {
            dispatch (obtenerTodosVideogames("Todos"),[])
        }
        else if (e.target.value === "Mayor Puntaje") {
              dispatch(obtenerVideogamesPorRatingMayor(videoGames));
        }
        else if (e.target.value === "Menor Puntaje") {
              dispatch(obtenerVideogamesPorRatingMenor(videoGames));
        };
    }

const handleReset = (e) => {          
    e.preventDefault();
    
    dispatch(obtenerTodosVideogames("Todos"),[]);        
        const filterGenre = document.querySelector("#filterGenre");
        filterGenre.value = "";
        const filterOrd = document.querySelector("#filterOrd");
        filterOrd.value = "";
        const filterPuntaje = document.querySelector("#filterPuntaje");
        filterPuntaje.value = "";
        const filterVideogames = document.querySelector("#filterVideogames");
        filterVideogames.value = "";
}

    //----------------paginado-------------------------

    const dispatch = useDispatch();
    const videoGames =useSelector((state) => state.videoGames);
    const { genres} = useSelector((state) => state);


    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(15);

    //const [pageNumberLimit, setpageNumberLimit] = useState(15);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(7);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    
    const pages = [];
    let currentItems = [];
    let renderPageNumbers = [];

    const handleClick = (e) => {
        setcurrentPage(Number(e.target.id));
    };
    if(!videoGames.error){

        const pages = [];
        for (let i = 1; i<=Math.ceil(videoGames.length/itemsPerPage); i++){
            pages.push(i);        
        }
    
        const indexOfLastItem = currentPage * itemsPerPage; 
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        currentItems = videoGames.slice(indexOfFirstItem, indexOfLastItem);

        renderPageNumbers = pages.map(number =>{ 
            if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){ 
                return( 
                    <li  
                        key={number}
                        id={number} 
                        onClick={handleClick} 
                        className={currentPage === number ? "active":null}>
                        {number} 
                    </li> 
                );            
            }
            else{
                return null;
            }
        });
    }
    
    const handlePrevbtn =()=>{
        setcurrentPage(currentPage - 1);

        // if ((currentPage - 1) % pageNumberLimit === 0) {// checar
        //     setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        //     setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        // }
    } 

    const handleNextbtn =()=>{//
        setcurrentPage(currentPage+1);//

        // if (currentPage + 1 > maxPageNumberLimit) { //checar
        //     setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        //     setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        // }
    }

    // let pageIncrementBtn = null; //checar
    // if(pages.length > maxPageNumberLimit){
    //     pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>
    // }

    // let pageDecrementBtn = null; //checar
    // if(minPageNumberLimit >= 1){
    //     pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>
    // }

    useEffect(()=>{
        dispatch(obtenerTodosVideogames("Todos"),[]);
        dispatch(obtenerTodosGeneros()); 
    }, [dispatch])

    return (
        <div>
            <div className='filter-container '>
                <div>
                    <span className="spanFilter">Filtrar por:</span><br/>
                    <select className="select" id="filterVideogames" onChange={(e) => {handleVideogameCreados (e)}}>
                        <option value='Todos'>Todos los Videogames</option>
                        <option value='API'>Videogames de API</option>
                        <option value='Creados'>videogames creados</option>
                    </select>
                </div><br/>

                <div>
                    <span className="spanFilter"> Generos:</span><br/>
                    <select className="select" id="filterGenre" onChange={(e) => {handleGeneros(e)}}>
                        <option value="Todos">Todos</option>
                            { genres?.map(o => (<option value={o.name}>{o.name}</option>))}
                    </select>
                </div><br/>
                                
                <div>
                    <span className="spanFilter">Ordenamiento:</span><br/>
                    <select className="select" id="filterOrd" onChange={(e) => {handleFilterOrd (e)}}>
                        <option value="Todos">Todos</option>
                        <option value='A - Z'>Ascendente</option>
                        <option value='Z - A'>Descendente</option>
                    </select>
                </div><br/>

                <div>
                    <span className="spanFilter">Puntaje:</span><br/>
                    <select className="select" id="filterPuntaje"onChange={(e) => {handleFilterRaiting (e)}}>
                        <option value="Todos">Todos</option>
                        <option value='Mayor Puntaje'>Mayor Puntaje</option>
                        <option value='Menor Puntaje'>Menor Puntaje</option>
                    </select>
                </div><br/>

                <div>
                    <button className="btn" onClick={(e) => {handleReset (e)}}>Borrar Filtros </button>
                </div>
            </div>

            {videoGames.length > 0 && genres.length > 0 }           
            <div className="numberPagination">
                <div className="pageNumbers">
                    <div> 
                        <button className='btnPagination' onClick={handlePrevbtn} //
                        disabled={ currentPage === pages[0] ? true : false }//
                        >anterior</button>
                    </div>                
                              
                        {/* {pageDecrementBtn}  */}
                        {renderPageNumbers} {/*}{*/}
                        {/* {pageIncrementBtn}  */}

                    <div>  
                        <button className='btnPagination' onClick={handleNextbtn} //
                        disabled={ currentPage === pages[pages.length - 1] ? true : false }//
                        >siguiente</button> 
                    </div>
                </div> 
            </div>

            <div className="pagination-container">
                {renderData(currentItems)} 
            </div>
        </div> )
}
export default FilterPagination;