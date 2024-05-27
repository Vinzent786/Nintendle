import { useState, useEffect } from "react";
const c = (x) => console.log(x);

export default function Scores({ setScoresClicked }) {
    const [scoresState, setScoresState] = useState(JSON.parse(localStorage.getItem('scores')));

    const newScores = () => {
        return {
            1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 'Played': 0, 'Won': 0, 'Lost': 0, 'Win %': 0
        };
    }

    function showScores(scores) {
        const scoresContainer = document.getElementById('scores-container');
        scoresContainer.innerHTML = ''; // Clear existing scores
        for (const key in scores) {
            let text;
            let p = document.createElement('p');
            switch(key) {
                case '1':
                    text = `1st Guess - ${scores[key]}`;
                    p.innerText = text;
                    break;
                case '2':
                    text = `2nd Guess - ${scores[key]}`;
                    p.innerText = text;
                    break;
                case '3':
                    text = `3rd Guess - ${scores[key]}`;
                    p.innerText = text;
                    break;
                case '4':
                    text = `4th Guess - ${scores[key]}`;
                    p.innerText = text;
                    break;
                case '5':
                    text = `5th Guess - ${scores[key]}`;
                    p.innerText = text;
                    break;
                case '6':
                    text = `6th Guess - ${scores[key]}`;
                    p.innerText = text;
                    break;
                case 'Played':
                    text = `${scores[key]} Games Played`;
                    document.getElementById('games-played').innerText = text;
                    break;
                case 'Lost':
                    break;
                case 'Win %':
                    if (scores['Lost']) {
                        text = `${Math.round(((scores['Won'] / scores['Played']) * 100))}% Won`;
                    } else if (!scores['Lost'] && !scores['Won']) {
                        text = '0% Won';
                    } else if (!scores['Lost'] && scores['Won']) {
                        text = '100% Won';
                    }
                    document.getElementById('win-percent').innerText = text;
                    break;
                default:
                    break;
            }
            if (text) scoresContainer.appendChild(p);
        }
    }

    const handleClearScores = () => {
        localStorage.clear();
        setScoresState(null);
    }

    const handleCloseScores = () => {
        setScoresClicked(false);
    }

    useEffect(() => {
        const scores = scoresState || newScores();
        showScores(scores);
        localStorage.setItem('scores', JSON.stringify(scores));
    }, [scoresState]);

    useEffect(() => {
        const closeScores = document.getElementById('close-scores');
        const clearScores = document.getElementById('clear-scores');
        closeScores.addEventListener('click', handleCloseScores);
        clearScores.addEventListener('click', handleClearScores);
        const scoresDialog = document.getElementById('scores-dialog');
        scoresDialog.showModal();

        return () => {
            closeScores.removeEventListener('click', handleCloseScores);
            clearScores.removeEventListener('click', handleClearScores);
        }
    }, []);

    return (
        <>
        <dialog id="scores-dialog">
            <button id="close-scores" onClick={handleCloseScores}>X</button>
            <article>
                <div>
                    <h2>Scores</h2>
                    <p id="games-played"></p>
                    <p id="win-percent"></p>
                </div>
                <div id="scores-container"></div>
            </article>
            <button id="clear-scores">CLEAR SCORES</button>
        </dialog>
        </>
    )
}
