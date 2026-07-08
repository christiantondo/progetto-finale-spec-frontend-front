// Importo Link per consentire la navigazione tra le pagine.
// Il vantaggio di Link al posto del tag <a> è che impedisce il ricaricamento 
// dell'intera pagina web, aggiornando solo i componenti necessari e ancora una volta allegerendo il sito.
import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

// Il componente riceve dall'esterno un oggetto 'props'. 
// Tramite la destrutturazione { vehicle }, estraggo direttamente la singola entità del veicolo passata dal componente padre (VehicleList).
export default function VehicleCard({ vehicle }) {

    const { favorites, toggleFavorites, compare, toggleCompare } = useContext(GlobalContext);

    /* Il metodo '.some()' sull'array globale dei preferiti verifica se esiste già 
       un veicolo salvato con lo stesso ID di questa specifica card (vehicle.id). 
       Restituisce TRUE se trova una corrispondenza esatta, altrimenti restituisce FALSE. */
    const isFavorite = favorites.some(favorite => favorite.id === vehicle.id);

    /* Segue la stessa logica di isFavorite ma lavora sull'array globale 'compare'.
       Restituisce TRUE se il veicolo attuale è già stato inserito nella lista di comparazione, 
       se quindi restituisce TRUE l'elemento di interfaccia viene aggiornato (button). */
    const isCompared = compare.some(item => item.id === vehicle.id);

    return (

        // Card che racchiude i dettagli del veicolo
        <div className="card">
            <div>
                <h3>{vehicle.title}</h3>
                <span>{vehicle.category}</span>
            </div>

            <div className="btn-wrapper">
                {/* Utilizzando i "Template Literals" di JavaScript inietto dinamicamente 
                  l'ID del veicolo attuale nell'URL di destinazione (es. /vehicles/1, /vehicles/2).
                  Al click, React Router intercetta il percorso e monta la 'DetailPage'. */}
                <Link to={`/vehicles/${vehicle.id}`} className="btn btn-detail">Discover more</Link>

                <div className="card-buttons">
                    {/* - Compare permetterà l'inserimento del veicolo ad un lista di comparazione.
                    - Add to favorites consentirà all'utente di salvare dei veicoli preferiti e di visualizzarli nell'apposita
                    pagina "Your favorites". */}
                    <button
                        onClick={() => toggleCompare(vehicle)}
                        /* Se isCompared è TRUE, l'operatore ternario assegna la classe speciale '.active-compare' per cambiare colore. 
                        Se è FALSE, lascia la classe base '.btn'. */
                        className={isCompared ? "btn btn-compare active-compare" : "btn"}
                    >
                        {/* Se isCompared è TRUE significa che il veicolo è già nel Context, quindi mostra "Added to Compare list". 
                        Se è FALSE, mostra la scritta standard "Compare". */ }
                        {isCompared ? "Added to Compare list" : "Compare"}
                    </button>
                    <button
                        onClick={() => toggleFavorites(vehicle)}
                        /* Se isFavorite è TRUE, applica la classe '.active-fav' che colora il bottone di rosso. 
                        Se è FALSE, applica il grigio standard di '.btn-fav'. */
                        className={isFavorite ? "btn btn-fav active-fav" : "btn btn-fav"}
                    >
                        {/* Cambia l'etichetta in tempo reale: se l'auto è già salvata offre l'azione di rimozione ("Remove ♥"), 
                           altrimenti invita l'utente ad aggiungerla ("Add ♥"). */}
                        {isFavorite ? "Remove ♥" : "Add ♥"}</button>
                </div>
            </div>
        </div>
    )
}