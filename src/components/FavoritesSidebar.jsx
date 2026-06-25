import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import VehicleCard from "./VehicleCard";

export default function FavoritesSidebar() {
    // Tramite la destrutturazione dell'oggetto, prelevo l'array 'favorites' 
    // dal GlobalContext.
    // Questo array si aggiorna in tempo reale ogni volta che l'utente aggiunge un preferito.
    const { favorites } = useContext(GlobalContext);

    // - Se l'array è vuoto (length === 0), il componente esegue un 'return null'.
    // Non stamperà in pagina il componente.
    if (favorites.length === 0) {
        return null;
    }

    return (

        <div className="favorites-sidebar">

            <div className="sidebar-content">

                <h2>Your Favorites ({favorites.length})</h2>
                <div className="sidebar-cards-container">
                    {favorites.map((vehicle) => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                </div>

            </div>

        </div>
    )

}