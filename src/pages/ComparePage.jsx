import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export default function ComparePage() {

    const { compare } = useContext(GlobalContext);

    return (
        <div className="compare-page">
            <h1>Vehicle Comparison</h1>
            <p>You are comparing {compare.length} vehicles</p>
        </div>
    );
}