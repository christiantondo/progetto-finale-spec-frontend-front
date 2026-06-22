import { Link } from "react-router-dom";

export default function VehicleCard({ vehicle }) {
    return (
        <div className="card">
            <h3>{vehicle.title}</h3>
            <span>{vehicle.category}</span>

            <Link to={`/vehicles/${vehicle.id}`} className="detail-button">Discover more</Link>

            <div className="card-buttons">
                <button>Compare</button>
                <button>Add to favorites ♥</button>
            </div>
        </div>
    )
}