import { createContext, useEffect, useState } from "react";
const { VITE_API_URL } = import.meta.env;

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetch(`${VITE_API_URL}/vehicles`)
            .then(res => res.json())
            .then(data => setVehicles(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <GlobalContext.Provider value={{ vehicles, setVehicles }}>
            {children}
        </GlobalContext.Provider>
    )
}