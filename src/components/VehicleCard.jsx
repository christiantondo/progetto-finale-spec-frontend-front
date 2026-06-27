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

    const isFavorite = favorites.some(favorite => favorite.id === vehicle.id);

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
                        className={isCompared ? "btn btn-compare active-compare" : "btn"}
                    > {isCompared ? "Added to Compare list" : "Compare"}
                    </button>
                    <button
                        onClick={() => toggleFavorites(vehicle)}
                        className={isFavorite ? "btn btn-fav active-fav" : "btn btn-fav"}
                    >
                        {isFavorite ? "Remove ♥" : "Add ♥"}</button>
                </div>
            </div>
        </div>
    )
}