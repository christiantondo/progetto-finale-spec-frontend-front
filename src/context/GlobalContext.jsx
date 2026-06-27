// - createContext: Inizializza il canale di comunicazione globale (il contesto).
// - useEffect: Gestisce gli effetti collaterali, in questo caso il recupero asincrono dei dati (fetch) all'avvio dell'app.
// - useState: Crea lo stato centralizzato che conterrà i dati distribuiti a tutti i componenti.
import { createContext, useEffect, useState } from "react";

// Estraggo la variabile d'ambiente 'VITE_API_URL' configurata nel file '.env'.
// Questa sintassi basata su 'import.meta.env' è lo standard moderno di Vite per caricare costanti sensibili o di configurazione
// (come l'indirizzo IP o la porta del server backend, es: http://localhost:3001) senza scriverle a mano nel codice.
const { VITE_API_URL } = import.meta.env;

// Inizializzo l'oggetto 'GlobalContext' tramite createContext(). 
// Questo oggetto conterrà i dati globali.
// Viene esportato singolarmente per consentire ai componenti figli (come VehicleList) di importarlo e consumarlo con useContext.
export const GlobalContext = createContext();

// Il componente 'GlobalProvider' ha la responsabilità di avvolgere l'albero dell'applicazione (in App.jsx)
// e passarei dati a tutti i suoi figli. Tramite la prop 'children', React cattura e renderizza 
// automaticamente tutti i tag e i componenti racchiusi all'interno del Provider.
export function GlobalProvider({ children }) {

    // Inizializzo lo stato come un array vuoto '[]'.
    // Questo array si popolerà non appena la chiamata API restituirà i dati dei veicoli.
    const [vehicles, setVehicles] = useState([]);

    const [favorites, setFavorites] = useState([]);

    const [compare, setCompare] = useState([]);

    const toggleFavorites = (vehicle) => {
        setFavorites(prevFavorites => {
            const isFavorite = prevFavorites.some(favorite => favorite.id === vehicle.id);

            return isFavorite
                ? prevFavorites.filter(favorite => favorite.id !== vehicle.id)
                : [...prevFavorites, vehicle];
        })
    };

    const toggleCompare = (vehicle) => {
        setCompare(prevCompare => {
            const isCompared = prevCompare.some(item => item.id === vehicle.id);

            if (isCompared) {
                return prevCompare.filter(item => item.id !== vehicle.id)
            }
            if (prevCompare.length >= 4) {
                alert("You can compare up to 4 vehicles at the same time!")
                return prevCompare;
            }

            return [...prevCompare, vehicle];
        })
    };

    useEffect(() => {
        // Eseguo una richiesta HTTP di tipo GET verso l'endpoint generale dei veicoli del server.
        // Questa rotta restituisce l'array dei veicoli mostrando solo id, title e category.
        fetch(`${VITE_API_URL}/vehicles`)
            .then(res => res.json()) // Trasformo i dati ricevuti in un oggetto JSON.
            .then(data => setVehicles(data)) // Salvo l'array ottenuto direttamente nello stato globale tramite la funzione setVehicles.
            .catch(err => console.error(err)); // Intercetta e stampa in console eventuali errori di rete o crash del server.
    }, []); // L'array vuoto garantisce che questo effetto collaterale venga eseguito UNA SOLA VOLTA 
    // durante l'intero ciclo di vita dell'applicazione (ovvero al caricamento iniziale della pagina).
    // Questo evita loop infiniti di fetch causati dai continui aggiornamenti di stato.

    return (
        /* Il tag '.Provider' prende una prop fondamentale chiamata 'value'.
        Tutto ciò che viene inserito all'interno dell'oggetto 'value' (in questo caso l'array dei veicoli e la sua funzione per aggiornarlo)
        diventa istantaneamente accessibile in tempo reale a qualunque componente si trovi dentro {children},
        eliminando la necessità di passare i dati di padre in figlio tramite le props tradizionali. */
        <GlobalContext.Provider value={{ vehicles, setVehicles, favorites, toggleFavorites, compare, toggleCompare }}>
            {children}
        </GlobalContext.Provider>
    )
}