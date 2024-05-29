import { useEffect, useRef } from "react";
import Keyboard from "./Keyboard.jsx";
import { gameFunctions } from "../helpers/game-functions.js";
import { useGridContext } from "../helpers/grid-context.jsx";


export default function Grid({answer}) {
    const [answerFranchise, answerName] = answer;
    console.log(answer);
    const {gridState, setGridState} = useGridContext();
    let gridRef = useRef(gridState);
    let gameReady = false;

    useEffect(() => {
        gridRef.current = gridState;
        if (gridRef.current) gameReady = true;
    }, [gridState]);

    const setColumnTemplate = (grid) => {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 1000) {
            grid.style.gridTemplateColumns = `repeat(${answerName.length}, minmax(20px, 80px))`;
        } else {
            grid.style.gridTemplateColumns = `repeat(${answerName.length}, minmax(20px, 50px))`;
        }
    }

    const handleReSize = () => {
        const grid = document.getElementById('grid-el') || null;
        if (grid) setColumnTemplate(grid);
    }

    useEffect(() => {
        window.addEventListener('resize', handleReSize);
        
        return () => window.removeEventListener('resize', handleReSize);
    }, []);

    useEffect(() => {
        document.getElementById('play-again').blur(); //Makes sure play again button isn't in focus. This helps with pressing enter for the answer not accidently triggering a new game
        let grid = document.getElementById('grid-el');
        const gridContainer = document.getElementById('grid-container');
        //If gridState already exists, then append the grid and return out of function
        if (gridState) {
            gridContainer.appendChild(gridState);
            return;
        }
        grid = document.createElement('div');
        grid.id = 'grid-el';
        grid.setAttribute('game_over', false);
        
        setColumnTemplate(grid);

        for (let row = 0; row < 6; row++) {
            for (let i = 0; i < answerName.length; i++) {
                const newDiv = document.createElement('div');
                newDiv.classList.add('char-container');
                const attributes = {
                    'finished': false,
                    'row': `${row + 1}`,
                    'row-finished': false
                }
                for (const key in attributes) {
                    newDiv.setAttribute(key, attributes[key]);
                }
                grid.append(newDiv);
            }
        }
        setGridState(grid);
        gridRef.current = grid;
        gridContainer.appendChild(grid);

        return () => {
            gridContainer.removeChild(grid);
        }
    }, [answer]);


    useEffect(() => {
        const handleKeyUp = (event) => {
            const dialogs = Array.from(document.querySelectorAll('dialog'));
            if (dialogs.some(dialog => dialog.open)) return; //Checks to make sure that a dialog isn't open
            const key = event.key.toUpperCase();
            gameFunctions.handleInput(gridRef.current, key, answerName);
        }
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
            gameReady = false;
        }
    }, []);



    useEffect(() => {
        const handleClick = (event) => {
            const key = event.target.closest('button').getAttribute('data-key').toUpperCase();
            gameFunctions.handleInput(gridRef.current, key, answerName);
        }
        const kbKeys = [...document.getElementsByClassName('kb-key')];
        kbKeys.forEach((key) => {
            key.addEventListener('click', handleClick);
        });

        return () => {
            kbKeys.forEach((key) => {
                key.removeEventListener('click', handleClick);
            });
        }
    }, []);


    return (
        <>
        <div id="grid-container"></div>
        <Keyboard />
        </>
    );
}
