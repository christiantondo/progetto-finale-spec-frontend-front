import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function ComparePage() {

    // Prelevo l'array dei veicoli selezionati dallo Stato Globale
    const { compare } = useContext(GlobalContext);

    // Stato locale per salvare i dati ricchi (prezzo, km, anno...) ricevuti dal server
    const [vehicleSpecs, setVehicleSpecs] = useState([]);

    useEffect(() => {
        // Recupero l'URL base del backend dalle variabili d'ambiente (.env)
        const { VITE_API_URL } = import.meta.env;

        // Trasformo l'array dei veicoli scelti in un array di promesse (Fetch asincrone).
        // Per ogni veicolo, interrogo l'endpoint specifico (/vehicles/:id) ed entro nell'oggetto '.vehicle'
        const requests = compare.map(vehicle =>
            fetch(`${VITE_API_URL}/vehicles/${vehicle.id}`)
                .then(res => res.json())
                .then(data => data.vehicle)
        );

        // Promise.all esegue tutte le fetch in parallelo e attende che siano tutte completate
        Promise.all(requests)
            .then(data => {
                setVehicleSpecs(data);
            })
            .catch(err => {
                console.error("Error fetching compare details:", err);
            });
    }, [compare]); // Se l'utente rimuove un veicolo l'operazione riparte

    // Se non ci sono elementi nel comparatore, mostro un messaggio
    if (compare.length === 0) {
        return (
            <div className="compare-page">
                <h1>Vehicle Comparison</h1>
                <p>No vehicles selected for comparison. Go back to the list and add some!</p>
            </div>
        );
    }

    return (
        <div className="compare-page">
            <h1>Vehicle Comparison</h1>
            <p>You are comparing {vehicleSpecs.length} vehicles</p>

            <table>
                <thead>
                    <tr>
                        <th>Vehicle name</th>
                        {/* Genero le colonne superiori ciclando i titoli dei veicoli */}
                        {vehicleSpecs?.map(((vehicle) =>
                            <th key={vehicle.id}>{vehicle.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* RIGA CATEGORIA */}
                    <tr>
                        <td><strong>Category</strong></td>
                        {vehicleSpecs?.map((vehicle) =>
                            <td key={vehicle.id}>{vehicle.category}</td>
                        )}
                    </tr>
                    <tr>
                        {/* RIGA PREZZO */}
                        <td><strong>Price</strong></td>
                        {vehicleSpecs?.map((vehicle) =>
                            <td key={vehicle.id}>{Number(vehicle.price).toLocaleString('it-IT')} €</td>
                        )}
                    </tr>
                    <tr>
                        {/* RIGA ANNO DI USCITA */}
                        <td><strong>Release Year</strong></td>
                        {vehicleSpecs?.map((vehicle) =>
                            <td key={vehicle.id}> {vehicle.releaseYear}</td>
                        )}
                    </tr>
                    <tr>
                        {/* RIGA PROPRIETARI PRECEDENTI */}
                        <td><strong>Previous Owners</strong></td>
                        {vehicleSpecs?.map((vehicle) =>
                            <td key={vehicle.id}> {vehicle.owners}</td>
                        )}
                    </tr>
                    <tr>
                        {/* RIGA CHILOMETRAGGIO */}
                        <td><strong>Total Km</strong></td>
                        {vehicleSpecs?.map((vehicle) =>
                            <td key={vehicle.id}> {Number(vehicle.km).toLocaleString('it-IT')}</td>
                        )}
                    </tr>
                    <tr>
                        {/* RIGA ALIMENTAZIONE */}
                        <td><strong>Fuel Type</strong></td>
                        {vehicleSpecs?.map((vehicle) =>
                            <td key={vehicle.id}> {vehicle.fuelType}</td>
                        )}
                    </tr>
                    <tr>
                        {/* RIGA CILINDRATA */}
                        <td><strong>Engine Size</strong></td>
                        {vehicleSpecs?.map((vehicle) =>
                            <td key={vehicle.id}>{vehicle.engineSize}cc</td>
                        )}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}