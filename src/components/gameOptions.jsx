import { useState, useEffect, useRef } from "react"
import { useOptionsContext } from "../helpers/options-context";
import '../styles/gameOptions.css';
const c = (x) => console.log(x);


export default function GameOptions({ setGameOptionsClicked }) {
    const {optionsState, setOptionsState} = useOptionsContext();
    const [tempOptionsState, setTempOptionsState] = useState([]);
    const cbRef = useRef(null);

    //Handles when a checkbox is checked/unchekced 
    const hanldeCbClick = (event) => {
        if (event.target.checked && event.target.name !== 'all') {
            let checkedCount = 0;
            for (let i = 1; i < cbRef.current.length; i++) {
                if (cbRef.current[i].checked) checkedCount += 1;
            }
            if (checkedCount === cbRef.current.length - 1) {
                cbRef.current[0].checked = true;
                setTempOptionsState(['all']);
            } else {
                setTempOptionsState(prevState => {
                    let newState;
                    if (prevState[0] === 'all') {
                        newState = [event.target.name];
                    } else {
                        newState = [...prevState, event.target.name];
                    }
                    return newState;
                });
            }
        } else if (event.target.checked && event.target.name === 'all') {
            cbRef.current.forEach(cb => {
                cb.checked = true;
            });
            setTempOptionsState(['all']);
        } else if (!event.target.checked && event.target.name === 'all') {
            cbRef.current.forEach(cb => {
                cb.checked = false;
            });
            setTempOptionsState([]);
            return;
        } else if (!event.target.checked) {
            if (event.target.name === 'all') {
                cbRef.current.forEach(cb => {
                    cb.checked = false;
                });
                setTempOptionsState(['all']);
            }
            let checkedCount = 0;
            for (let i = 0; i < cbRef.current.length; i++) {
                if (cbRef.current[i].checked) checkedCount += 1;
            }
            if (!checkedCount) {
                setTempOptionsState(['all']);
            } else {
                setTempOptionsState(prevState => {
                    const newState = prevState.filter(franchise => {
                        return franchise !== event.target.name;
                    });
                    return newState;
                });
            }   
        }
    }

    //Hook runs on first mount initiate temp options, show options, display checked boxes (if any) 
    //and add event listeners for the state of the check boxes
    useEffect(() => {
        setTempOptionsState(optionsState);
        const dialog = document.getElementById('game-options');
        dialog.showModal();
        dialog.style.top = '0%';

        const checkBoxes = [...document.querySelectorAll('input[type="checkbox"]')];
        cbRef.current = checkBoxes;

        cbRef.current.forEach(cb => {
            if (cb.name !== 'all' && optionsState.includes(cb.name)) {
                cb.checked = true;
            }
        });

        for (let i = 0; i < checkBoxes.length; i++) {
            checkBoxes[i].addEventListener('change', hanldeCbClick);
        }
        
        return () => {
            for (let i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].removeEventListener('change', hanldeCbClick);
            }
        }
    }, []);

    //Handles what to do when the options close
    const handleGameOptionsClicked = () => {
        const dialog = document.getElementById('game-options');
        async function endOptions() {
            if (!tempOptionsState.length) {
                setOptionsState(['all']);
            } else {
                setOptionsState(tempOptionsState);
            }
            dialog.style.top = '200%';
           return Promise.resolve();
        }
        endOptions()
        .then(() => {
            setTimeout(() => setGameOptionsClicked(false), 450);
        });
    }

    return (
        <>
        <dialog id="game-options" className="hidden">
            <button id="close-game-options" onClick={handleGameOptionsClicked}><img src="/assets/icons/down-arrow-white.svg" alt="Down Arrow" /></button>
            <section id="options-section">
                <h2 id="choose-franchise">Choose the Franchise</h2>
                <div id="options">
                    <div className="option-row">
                        <div className="option-container">
                            <label htmlFor="all">All</label>
                            <input type="checkbox" name="all" id="all" />
                        </div>
                    </div>
                    <div className="option-row">
                        <div className="option-container">
                            <label htmlFor="">The Legend of Zelda</label>
                            <input type="checkbox" name="The Legend of Zelda" id="theLegendOfZelda" />
                        </div>                    
                        <div className="option-container">
                            <label htmlFor="">Mario</label>
                            <input type="checkbox" name="Mario" id="mario" />
                        </div>    
                        <div className="option-container">
                            <label htmlFor="">Animal Crossing</label>
                            <input type="checkbox" name="Animal Crossing" id="animalCrossing" />
                        </div>    
                        <div className="option-container">
                            <label htmlFor="">Pokémon</label>
                            <input type="checkbox" name="Pokémon" id="pokemon" />
                        </div>    
                        <div className="option-container">
                            <label htmlFor="">Star Fox</label>
                            <input type="checkbox" name="Star Fox" id="starFox" />
                        </div>
                    </div>
                    <div className="option-row">
                        <div className="option-container">
                            <label htmlFor="">Fire Emblem</label>
                            <input type="checkbox" name="Fire Emblem" id="fireEmblem" />
                        </div>    
                        <div className="option-container">
                            <label htmlFor="">Pikmin</label>
                            <input type="checkbox" name="Pikmin" id="pikmin" />
                        </div>    
                        <div className="option-container">
                            <label htmlFor="">Xenoblade</label>
                            <input type="checkbox" name="Xenoblade" id="xenoblade" />
                        </div>    
                        <div className="option-container">
                            <label htmlFor="">Splatoon</label>
                            <input type="checkbox" name="Splatoon" id="splatoon" />
                        </div>    
                        <div className="option-container">
                            <label htmlFor="">Kirby</label>
                            <input type="checkbox" name="Kirby" id="kirby" />
                        </div>
                    </div>
                    <div className="option-row">
                        <div className="option-container">
                                <label htmlFor="">Donkey Kong</label>
                                <input type="checkbox" name="Donkey Kong" id="donkeyKong" />
                            </div>
                            <div className="option-container">
                                <label htmlFor="">Dragon Quest</label>
                                <input type="checkbox" name="Dragon Quest" id="dragonQuest" />
                            </div>
                            <div className="option-container">
                                <label htmlFor="">Mother</label>
                                <input type="checkbox" name="Mother" id="mother" />
                            </div>
                            <div className="option-container">
                                <label htmlFor="">F-Zero</label>
                                <input type="checkbox" name="F-Zero" id="fZero" />
                            </div>
                            <div className="option-container">
                                <label htmlFor="">Final Fantasy</label>
                                <input type="checkbox" name="Final Fantasy" id="finalFantasy" />
                            </div>
                            <div className="option-container">
                                <label htmlFor="">Super Smash Bros.</label>
                                <input type="checkbox" name="Super Smash Bros." id="superSmashBros" />
                            </div>
                    </div>
                </div>
                <button id="start-game" onClick={handleGameOptionsClicked}>START GAME</button>
            </section>
        </dialog>
        </>
    )
}