import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

export default function CompareSideBar() {
    // Tramite la destrutturazione dell'oggetto, prelevo l'array 'compare' 
    // dal GlobalContext.
    // Questo array si aggiorna in tempo reale ogni volta che l'utente aggiunge un veicolo da comparare.
    const { compare, toggleCompare } = useContext(GlobalContext);

    // - Se l'array è vuoto (length === 0), il componente esegue un 'return null'.
    // Non stamperà in pagina il componente.
    if (compare.length === 0) {
        return null;
    }

    return (

        <div className="compare-sidebar">

            <div className="sidebar-content">

                <h2>Compare Vehicles ({compare.length})</h2>
                <div className="sidebar-cards-container">
                    {compare.map((vehicle) => (
                        <div key={vehicle.id} className="sidebar-mini-card">
                            <p>{vehicle.title}</p>
                            <button
                                className="btn-remove-compare"
                                onClick={() => toggleCompare(vehicle)}
                            >
                                x
                            </button>
                        </div>
                    ))}
                </div>

                <Link to={"/compare"} className="btn btn-start-compare">
                    Compare now
                </Link>
            </div>

        </div>
    )

}