import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LandingPage } from "./components/LandingPage/LandingPage";
import { Home } from "./components/Home/Home.jsx";
import { CreateVideogame } from "./components/CreateVideogame/CreateVideogame.jsx";
import { Detail } from "./components/Detail/Detail";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { VideogameItemCard } from "./components/VideogameItemCard/VideogameItemCard";


function App() {
    return (
        <div id="fondo-radial">
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/Videogames" element={<VideogameItemCard />} />
                    <Route path="/createvideogame" element={<CreateVideogame />} />
                    <Route path="/detalle/:id" element={<Detail/>} />
                    <Route path="/busqueda" element={<SearchBar/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;