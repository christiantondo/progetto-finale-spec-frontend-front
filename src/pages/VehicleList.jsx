import { useContext, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import VehicleCard from "../components/VehicleCard";

export default function VehicleList() {

    const { vehicles } = useContext(GlobalContext);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sortOrder, setSortOrder] = useState("AZ");

    const filteredVehicles = useMemo(() => {
        return vehicles
            .filter(v => v.title.toLowerCase().includes(search.toLowerCase()))
            .filter(v => category === "All" || v.category === category)
            .sort((a, b) => {
                return sortOrder === "AZ"
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            });
    }, [vehicles, search, category, sortOrder]);

    return (
        <div>
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