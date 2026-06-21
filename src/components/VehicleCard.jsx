export default function VehicleCard({ vehicle }) {
    return (
        <div>
            <h3>{vehicle.title}</h3>
            <span>{vehicle.category}</span>
            <div>
                <button>Details</button>
                <button>Compare</button>
                <button>Add to favorites ♥</button>
            </div>
        </div>
    )
}