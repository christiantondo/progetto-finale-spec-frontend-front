import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import VehicleCard from "../components/VehicleCard";

export default function VehicleList() {

    const { vehicles } = useContext(GlobalContext);
    console.log("All Vehicles", vehicles);

    return (
        <div>
            <h1>Our Vehicles</h1>
            <div>
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