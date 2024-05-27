import React, { createContext, useContext, useState } from "react";

const GridContext = createContext();

export const useGridContext = () => useContext(GridContext);

export function GridProvider({ children }) {
    const [gridState, setGridState] = useState(null);

    return (
        <GridContext.Provider value={{gridState, setGridState}}>
            {children}
        </GridContext.Provider> 
    );
}