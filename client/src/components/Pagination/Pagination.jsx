// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import "./Pagination.css"

// import { obtenerTodosVideogames } from '../../Redux/action';
// import { VideogameItemCard } from '../VideogameItemCard/VideogameItemCard';

// const renderData = datas =>{
//     return(
//         <ul>
//             {datas.map((todo) =>{
//                 return(<VideogameItemCard className="card" id={todo.id} image ={todo.image} name={todo.name} genre={todo.genre}/>)
//             })}
//         </ul>
//     )
// }

// export const Pagination = () => {
    
//     const {
//         filterGenre,
//         filterName,
//         filterAsc,
//         filterDesc,
//         filterRaiting
//     } = useSelector((state) => state);
        
//     const videoGames =useSelector((state) => state.videoGames);
//     const dispatch = useDispatch();
    
//     const [currentFilterItems, setcurrentFilterItems] = useState(videoGames);
//     const [currentPage, setcurrentPage] = useState(1);
//     const [gamesPerPage, setGamesPerPage] = useState(15);

//     const [pageNumberLimit, setpageNumberLimit] = useState(15);
//     const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(4);
//     const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

//     const handleClick = (e) => {
//         setcurrentPage(Number(e.target.id));
//     };

//     const pages = [];
//     for (let i = 1; i<=Math.ceil(videoGames.length/gamesPerPage); i++){
//         pages.push(i);        
//     }

//     const indexOfLastGame = currentPage * gamesPerPage;
//     const indexOfFirstGame = indexOfLastGame - gamesPerPage
//    let currentItems = [];
    
//     if(filterDesc){
//         //setcurrentFilterItems(filterDesc)
//         currentItems = filterDesc.slice(indexOfFirstGame, indexOfLastGame);
//     }else if(filterGenre){
//         //setcurrentFilterItems(filterGenre)
//         currentItems = filterGenre.slice(indexOfFirstGame, indexOfLastGame);
//     }else if(filterAsc){
//         //setcurrentFilterItems(filterAsc)
//         currentItems = filterAsc.slice(indexOfFirstGame, indexOfLastGame);
//     }else {
//         //setcurrentFilterItems(videoGames)
//         currentItems = videoGames.slice(indexOfFirstGame, indexOfLastGame);
//     }
    
    
  
//     const renderPageNumbers = pages.map(number =>{
//         if(number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
//             return(
//                 <li  
//                     key={number} 
//                     id={number} 
//                     onClick={handleClick}
//                     className={currentPage === number ? "active":null}
//                 >
//                     {number}
//                 </li>
//             );            
//         }
//         else{
//             return null;
//         }
//     });

//     useEffect(()=>{
//         dispatch(obtenerTodosVideogames());
//     }, [dispatch]);

//     const handleNextbtn =()=>{
//         setcurrentPage(currentPage+1);

//         if (currentPage + 1 > maxPageNumberLimit) {
//             setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
//             setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
//         }
//     }

//     const handlePrevbtn =()=>{
//         setcurrentPage(currentPage - 1);

//         if ((currentPage - 1 % pageNumberLimit === 0)) {
//             setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
//             setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
//         }
//     }    

//     let pageIncrementBtn = null; 
//     if(pages.length > maxPageNumberLimit){
//         pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>
//     }

//     let pageDecrementBtn = null; 
//     if(minPageNumberLimit >= 1){
//         pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>
//     }

//     return(
//         <div>
            
//         {renderData(currentItems)}
//             <ul className="pageNumbers">
//                 <li>
//                     <button onClick={handlePrevbtn}
//                     disabled={ currentPage === pages[0] ? true : false }
//                     >anterior</button>
//                 </li>                 
//                 {pageIncrementBtn}
//                 {renderPageNumbers}
//                 {pageDecrementBtn}
//                 <li>
//                     <button onClick={handleNextbtn}
//                     disabled={ currentPage === pages[pages.length - 1] ? true : false }
//                     >siguiente</button>
//                 </li>
//             </ul> 
            
//         </div>
//     );
// }
// export default Pagination;