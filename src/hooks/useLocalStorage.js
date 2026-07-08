import { useState, useEffect } from "react";

// La funzione accetta due parametri: la chiave (molto importante) e il valore iniziale di riserva.
// La chiave è importante per rendere riutilizzabile l'hook, altrimenti si sarebbero dovuti creare due hook separati:
// Uno che gestiva "compare" e uno che gestiva "favorites".
export default function useLocalStorage(key, initialValue) {

    const [state, setState] = useState(() => {
        // Verifichiamo se esiste già un dato salvato con quella chiave
        const savedItem = localStorage.getItem(key);

        // Se il dato esiste, viene convertito da stringa a oggetto/array
        return savedItem ? JSON.parse(savedItem) : initialValue;
    });

    // Con useEffect salvo i dati ogni volta che cambiano
    useEffect(() => {
        // Lo stato viene trasformato in una stringa e salvato nel database del browser
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]) // Viene triggerato quando cambiano questi valori

    // Restituisco lo state e il setState per aggiornarlo
    return [state, setState];
}