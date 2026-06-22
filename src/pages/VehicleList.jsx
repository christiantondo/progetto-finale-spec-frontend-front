import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import VehicleCard from "../components/VehicleCard";

export default function VehicleList() {

    const { vehicles } = useContext(GlobalContext);

    return (
        <div>
            <div className="search-filter-vehicle">
                <h1>Our Vehicles</h1>
                <input
                    type="text"
                    placeholder="Search by model..."
                />
                <select>
                    <option value="All">All</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                </select>
                <select>
                    <option value="AZ">Alphabetical A - Z</option>
                    <option value="ZA">Alphabetical Z - A</option>
                </select>
            </div>
            <div className="card-container">
                {vehicles.map((vehicle) => (
                    <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                    />
                ))}
            </div>
        </div>
    )
}