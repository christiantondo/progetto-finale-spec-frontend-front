import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function VehicleList() {

    const { vehicles } = useContext(GlobalContext);
    console.log("All Vehicles", vehicles);

    return (
        <div>
            <h1>Our Vehicles</h1>
        </div>
    )
}