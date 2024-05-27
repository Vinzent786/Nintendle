import { createContext, useContext, useState } from "react";

const OptionsContext = createContext();

export const useOptionsContext = () => useContext(OptionsContext);

export function OptionsProvider({children}) {
    const [optionsState, setOptionsState] = useState(['all']);

    return (
        <OptionsContext.Provider value={{optionsState, setOptionsState}}>
            {children}
        </OptionsContext.Provider>
    )
}