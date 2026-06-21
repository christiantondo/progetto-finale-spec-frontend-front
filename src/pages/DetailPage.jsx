import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function DetailPage() {
    const { id } = useParams();
    const { vehicles } = useContext(GlobalContext);
    const vehicle = vehicles.find(v => v.id === parseInt(id));

    if (!vehicle) {
        return (
            <h2>Vehicle not found</h2>
        )
    }

    return (
        <div>Detail Page</div>
    )
}