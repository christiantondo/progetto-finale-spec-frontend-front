// - useParams: Fondamentale per intercettare i parametri dinamici passati nell'URL della rotta.
// - useEffect: Gestisce gli effetti collaterali, in questo caso la fetch dei dettagli per ID al montaggio.
// - useState: Memorizza i dati del singolo veicolo recuperati dal database del server.
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function DetailPage() {
    // Tramite la destrutturazione { id } estraggo la variabile definita come ':id' in App.jsx.
    // Se l'utente naviga su '/vehicles/3', la costante 'id' conterrà esattamente il valore stringa "3".
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        const { VITE_API_URL } = import.meta.env;
        // Eseguo una fetch specifica concatenando l'ID del veicolo (es: http://localhost:3001/vehicles/3).
        // Questa rotta mirata sul backend restituisce l'oggetto completo di tutte le proprietà tecniche (price, km, owners...).
        fetch(`${VITE_API_URL}/vehicles/${id}`)
            .then(res => res.json())
            .then(data => setVehicle(data.vehicle))
            .catch(err => console.error("Cannot get data", err));
    }, [id]);
    // Mettendo id nelle dipendenze garantisce che se l'utente, mentre si trova nella pagina di dettaglio, clicca su un link 
    // che punta a un altro veicolo (cambiando l'ID nell'URL), l'effetto si riattivi immediatamente
    // scaricando i nuovi dati ed evitando che a schermo rimanga bloccato il veicolo precedente.

    // Durante i primi millisecondi, appena fatto il fetch lo stato 'vehicle' è ancora 'null'.
    // Questo blocco interrompe temporaneamente il rendering e mostra un testo di caricamento.
    if (vehicle === null) {
        return <h2>Loading...</h2>
    }

    // Se la fetch si è conclusa (quindi 'vehicle' non è più null) ma il server ha risposto che l'ID cercato
    // non esiste nel file JSON (restituendo undefined), questo controllo intercetta l'anomalia
    // e mostra un messaggio di errore mostrando all'utente che l'id inserito non corrisponde a nessun dato.
    if (!vehicle) {
        return (
            <h2>Vehicle not found</h2>
        )
    }
    // Se i controlli sono stati superati con successo stampo in pagina i dati completi del veicolo per ID.
    return (
        <div>
            <h2>{vehicle.title}</h2>
            <p>Price: {vehicle.price}</p>
            <p>Brand: {vehicle.brand}</p>
            <p>Release Year: {vehicle.releaseYear}</p>
            <p>Total Km: {vehicle.km}</p>
            <p>Previous owners: {vehicle.owners}</p>
            <p>Fuel type: {vehicle.fuelType}</p>
            <p>Engine size: {vehicle.engineSize}</p>
        </div>
    )
}