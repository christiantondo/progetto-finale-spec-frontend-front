//   Componenti fondamentali per gestire la SPA (Single Page Application) lato front-end:
// - BrowserRouter: Sincronizza l'interfaccia utente con l'URL del browser.
// - Routes: Esamina i figli e renderizza solo la rotta che corrisponde all'URL attuale.
// - Route: Definisce l'associazione singola tra un indirizzo URL (path) e un componente (element).
// - NavLink: Crea link di navigazione intelligenti, applicando automaticamente la classe '.active' quando l'URL coincide.
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

// Importazione dei componenti pagina
import Homepage from './pages/Homepage';
import VehicleList from './pages/VehicleList';
import UserFavorite from './pages/UserFavorite';
import DetailPage from './pages/DetailPage'
import ComparePage from "./pages/ComparePage";
import FavoritesSidebar from "./components/FavoritesSidebar";
import CompareSideBar from "./components/CompareSideBar";

// Importazione del Contesto Globale: rende disponibili i dati in tutta l'applicazione.
import { GlobalProvider } from './context/GlobalContext';
import VideoBackground from "./components/VideoBackground";

function App() {

    return (

        // Il GlobalProvider vvolge l'intera applicazione rendendo disponibili i dati che saranno accessibili 
        // in qualsiasi sotto-componente dell'albero senza dover passare le props manualmente (Prop Drilling).
        <GlobalProvider>

            {/* Il BrowserRouter Abilita la navigazione dinamica all'interno dei componenti figli, 
            intercettando i cambi di URL senza far ricaricare la pagina web al browser ottimizzando il sito. */}
            <BrowserRouter>

                <VideoBackground />

                <div className="app-content-wrapper">

                    {/* Contiene i link globali del sito. Grazie a NavLink, se l'utente si trova ad esempio su '/vehicles', 
                    il relativo tag riceverà la classe active per permetterci di evidenziarlo via CSS. */}

                    <nav className='navbar'>
                        <NavLink to="/" className="link-logo"><img src="/LSV-nobg.png" alt="LSV Logo" className="nav-logo" draggable="false" /></NavLink>
                        <NavLink to="/vehicles">Vehicles</NavLink>
                        <NavLink to="/compare">Compare Vehicles</NavLink>
                    </nav>

                    <FavoritesSidebar />
                    <CompareSideBar />

                    <div className='container-boxed'>
                        {/* Routes valuta l'URL attuale e mostra solo il componente associato 
                        alla prima rotta che combacia perfettamente. */}
                        <Routes>
                            {/* Rotta iniziale, Homepage del sito. */}
                            <Route path="/" element={<Homepage />} />

                            {/* Rotta con la lista dei veicoli e i filtri di ricerca. */}
                            <Route path="/vehicles" element={<VehicleList />} />

                            <Route path="/compare" element={<ComparePage />} />

                            {/* Rotta dinamica per la visualizzazione dei dettagli del singolo veicolo con id:x. */}
                            <Route path="/vehicles/:id" element={<DetailPage />} />
                        </Routes>
                    </div>

                </div>

            </BrowserRouter>

        </GlobalProvider >
    )
}

export default App
