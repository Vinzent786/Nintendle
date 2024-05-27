import { createContext, useContext, useState } from "react";

const answerContext = createContext();

export const useAnswerContext = () =>  useContext(answerContext);

export function AnswerProvider({children}) {
    const [answerState, setAnswerState] = useState(null);
    const [franchiseShown, setFranchiseShown] = useState(false);

    return (
        <answerContext.Provider value={
            {
                answerState, setAnswerState, 
                franchiseShown, setFranchiseShown
            }
            }>
            {children}
        </answerContext.Provider>
    )
}