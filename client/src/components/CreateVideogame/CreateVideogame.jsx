import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./CreateVideogame.css"
import { 
    obtenerPlataforma, 
    obtenerTodosGeneros, 
    CrearVideogame
} from "../../Redux/action";


function validateState(input) {
    console.log(input,"input");
    let error = {};
    if (input.name === "") {
        error.name = "El nombre es requerido";
    } if (input.image === "") {
        error.image = "La imagen es requerida";
    } if (input.released === "") {
        error.released = "La fecha de lanzamiento es requerids";
    } if (input.rating && (input.rating > 5 || input.rating < 0)) {
        error.rating = "El puntaje es requerido es de 0 - 5";
    } if(input.rating === ""){
        error.rating ="El valor del rating es requerido"
    } if (input.description === "") {
        error.description = "La descripcion es requerida";
    } if (input.genre.length <= 0) {
        error.genre = "El o los generos son requeridos";
    } if (input.platform.length <= 0) {
        error.platform = "La o las plataformas es requeridas";
    }   
    return error;
}

export const CreateVideogame = () => {
    const dispatch = useDispatch();
    const platform = useSelector((state) => state.platform);
    console.log(platform, "platform");
    const genres = useSelector((state) => state.genres)
    const [ error, setError] = useState({})
    const [ videogame, setVideogame ] = useState ({
        name: "",
        image: "",
        released: "",
        rating: "",
        description: "",    
        genre: [],
        platform: [],
    })
        
    async function handleSubmit(e) {
        e.preventDefault();
        dispatch( CrearVideogame (videogame))
        alert("videogame creado")
        setVideogame({
            name: "",
            image: "",
            released: "",
            rating: "",
            description: "",    
            genre: [],
            platform: [],
        });
        window.location = "../home"
    }

    function handleChange(e) {
        setVideogame({
            ...videogame,
            [e.target.name]: e.target.value
        });
        setError(validateState({
            ...videogame,
            [e.target.name]: e.target.value
        }));
    }; 

    function handleSelectGenre(e) {
        setVideogame({
            ...videogame,
            genre: [
                ...videogame.genre,
                e.target.value
            ]
        });
        setError(validateState({
            ...videogame,
            genre: [
                ...videogame.genre,
                e.target.value
            ]
        }));
    };

    function handleSelectPlatform(e) {
        setVideogame({
            ...videogame,
            platform: [
                ...videogame.platform,
                e.target.value
            ]
        });
        setError(validateState({
            ...videogame,
            platform: [
                ...videogame.platform,
                e.target.value
            ]
        }));
    };


    function handleDeleteGenre(e){
        setVideogame({
            ...videogame,
            genre: videogame.genre.filter(g => g !== e)
        });
    };

    function handleDeletePlatform(e){
        setVideogame({
            ...videogame,
            platform: videogame.platform.filter(g => g !== e)
        });
    };

    useEffect(() => {
        dispatch(obtenerPlataforma());
        dispatch(obtenerTodosGeneros());
    }, [dispatch]);

    
    return platform.length > 0 && genres.length > 0 ?  (

        <div>
            <div className="titleCreate">
                <span >Crear Videogame</span>
            </div><br/><br/>
              
            <form className="formCreate" onSubmit={e => handleSubmit(e)}>
                <label className="title">Nombre: </label>
                <input 
                className="inputCreate"
                type='text'
                cols={50}
                name='name'
                value={videogame.name} 
                onChange={e => handleChange(e)}
                id="createName"
                />
                {error.name && ( <p className='error'>{error.name}</p> )}
                <br /><br />
                
                <label className="title">Imagen :</label>
                <input 
                className="inputCreate"
                type='text'
                cols={100}
                name='image'
                value={videogame.image} 
                onChange={e => handleChange(e)}
                id="createImagen"
                />
                { error.imagen && ( <p className='error'>{error.imagen}</p> ) }
                <br /><br />
                
                <label className="title">Descripcion :</label><br/>
                <textarea 
                className="inputCreate"
                rows={10} cols={50}
                name='description'
                value={videogame.description} 
                onChange={e => handleChange(e)}
                id="createDescripcion"
                />
                { error.description && ( <p className='error'>{error.description}</p> ) }
                <br /><br />

                <label className="title">Puntuacion</label>
                <input 
                className="inputCreate"
                type='number'
                name='rating'
                value={videogame.rating} 
                onChange={e => handleChange(e)}
                id="createRating"
                />
                { error.rating && ( <p className='error'>{error.rating}</p> ) }
                <br /><br />
                
                <label className="title">Fecha de lanzamiento: </label>
                <input 
                className="inputCreate"
                type='date'
                name='released'
                value={videogame.released} 
                onChange={e => handleChange(e)}
                id="createFcha"
                />
                { error.released && ( <p className='error'>{error.released}</p> )}
                <br /><br />

                <div className="selects">
                    <div className="selects-item">
                        <select className="selectOptions" onChange={e => handleSelectGenre(e)}>
                            {genres.map((g) => (<option value={g.name}>{g.name}</option>))}
                        </select>
                        <ul>                      
                            <li>{videogame.genre.map(o =>
                                <div>
                                    <span className="selected">{o}  </span> <a className="borrar" href = "#" onClick={()=> handleDeleteGenre(o)}>X</a>
                                 </div>   
                            )}                                
                            </li>
                        </ul>                          
                        {error.genre && ( <p className='error'>{error.genre}</p> )}
                    </div> 

                    <div className="selects-item">
                        {console.log(platform,"platformcreate")}
                        <select className="selectOptions" onChange={e => handleSelectPlatform(e)}>
                            {platform?.map((p) => (<option value={p}>{p}</option>)) }
                        </select>
                        <ul>
                            <li>{videogame.platform.map(o =>
                                <div>
                                    <span className="selected">{o} </span> <a className="borrar" href = "#" onClick={()=> handleDeletePlatform(o)}>X</a>
                                 </div>   
                            )}                                
                            </li>
                        </ul>
                        {error.platform && ( <p className='error'>{error.platform}</p> )}
                    </div>   

                </div>

                <div>
                    <Link to = "/home">
                        <button className="btnCreate"> Regresar</button>
                    </Link>   

                    {error.name || error.released || error.rating || error.description || error.genre || error.platform ? (
                        <button  className="btnCreate"  type="submit" disabled > Generar videogame </button>     
                        ):
                        (
                            <button  className="btnCreate"  type="submit"  > Generar videogame </button>            
                        )
                    }                                                             
                </div>                       
            </form>
        </div>
    ):  
    (
        <div className="cargando">
            <br />
            <br />
            <br />
            <div>
                <h1>CARGANDO</h1>
                <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="no sale" />
            </div>
        </div>
    )
}