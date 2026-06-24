// - useContext: Permette al componente di accedere direttamente ai dati esposti dal GlobalContext.
// - useState: Consente di creare e gestire variabili di stato locali all'interno del componente.
// - useMemo: Ottimizzazione avanzata per memorizzare in cache i risultati di calcoli complessi o dispendiosi,
//   consente di ricaricare la pagina solo quando cambiano le sue dipendenze
import { useContext, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import VehicleCard from "../components/VehicleCard";

export default function VehicleList() {

    // Estraggo l'array "vehicles" dal Global Context.
    const { vehicles } = useContext(GlobalContext);

    // Questi tre stati tracciano i criteri di filtraggio e ordinamento scelti dall'utente:
    // - search: Stringa di testo digitata dall'utente per filtrare i veicoli in base al modello (title).
    const [search, setSearch] = useState("");
    // - category: Stringa che definisce la tipologia di veicolo selezionata ('All', 'Car', 'Bike') (category).
    const [category, setCategory] = useState("All");
    // - sortOrder: Stringa che determina la direzione dell'ordinamento alfabetico ('AZ' o 'ZA').
    const [sortOrder, setSortOrder] = useState("AZ");

    // useMemo "congelerà" l'array filteredVehicles.
    // La catena di metodi (.filter().filter().sort()) verrà eseguita nuovamente solo ed esclusivamente se 
    // almeno uno dei valori presenti nell'array delle dipendenze cambia: [vehicles, search, category, sortOrder].
    // Se il componente subisce un re-render per qualsiasi altro motivo, React prenderà l'array già pronto dalla memoria.
    const filteredVehicles = useMemo(() => {
        return vehicles
            // Prendo il titolo del veicolo e il testo cercato, convertendoli entrambi in minuscolo (.toLowerCase()).
            // Questo rende la ricerca "Case-Insensitive" (ignora maiuscole/minuscole). Il metodo .includes() 
            // restituisce true se la sottostringa è presente, mantenendo il veicolo nell'array.
            .filter(v => v.title.toLowerCase().includes(search.toLowerCase()))
            // L'operatore logico OR || valuta la prima condizione: se 'category' è impostata su "All", 
            // l'espressione restituisce immediatamente true per tutti i veicoli, interrompendo il controllo.
            // Se lo stato è "Car" o "Bike", la prima parte è false, quindi JavaScript esegue la seconda parte,
            // verificando se la categoria del singolo veicolo coincide esattamente con quella dello stato.
            .filter(v => category === "All" || v.category === category)
            // .sort() confronta i veicoli a coppie (a, b) e si aspetta un valore numerico (-1, 1, 0) per spostarli.
            // Con il ternario: se 'sortOrder' è ugual a "AZ", parte 'a.title.localeCompare(b.title)' per l'ordine crescente.
            // Altrimenti, si inverte l'ordine dei fattori in 'b.title.localeCompare(a.title)' per ottenere l'ordine decrescente (Z-A).
            // Il metodo localeCompare() gestisce l'ordine alfabetico del browser, comprese lettere accentate o speciali.
            .sort((a, b) => {
                return sortOrder === "AZ"
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            });
    }, [vehicles, search, category, sortOrder]);

    return (
        <div>
            {/* Ogni campo di input è "controllato" perché il suo value riflette lo stato di React
                e ogni onChange fa partire la funzione che aggiorna lo stato corrispondente. */}
            <div className="search-filter-vehicle">
                <h1>Our Vehicles</h1>
                <input
                    type="text"
                    placeholder="Search by model..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                </select>
                <select
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}>
                    <option value="AZ">Alphabetical A - Z</option>
                    <option value="ZA">Alphabetical Z - A</option>
                </select>
            </div>
            {/* Ciclo sull'array controllato e filtrato 'filteredVehicles' tramite il metodo .map().
                Per ogni veicolo presente nell'elenco, genera dinamicamente un componente <VehicleCard />.
                Passiamo l'intero oggetto tramite la prop 'vehicle' e specifichiamo la 'key' univoca (vehicle.id).
                La 'key' è un requisito fondamentale di React per tracciare gli elementi nel Virtual DOM 
                e aggiornare solo i nodi modificati anziché ricostruire l'intera lista. */}
            <div className="card-container">
                {filteredVehicles.map((vehicle) => (
                    <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                    />
                ))}
            </div>
        </div>
    )
}