import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function DetailPage() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        const { VITE_API_URL } = import.meta.env;
        fetch(`${VITE_API_URL}/vehicles/${id}`)
            .then(res => res.json())
            .then(data => setVehicle(data.vehicle))
            .catch(err => console.error("Cannot get data", err));
    }, [id]);

    if (vehicle === null) {
        return <h2>Loading...</h2>
    }

    if (!vehicle) {
        return (
            <h2>Vehicle not found</h2>
        )
    }

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