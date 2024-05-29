import { useState, useEffect } from 'react';
import Nav from './Nav.jsx';
import '../styles/info.css?v=1.1';


export default function Info() {
    const [strState, setStrState] = useState('');

    useEffect(() => {
        const handleKeyUp = (event) => {
            setStrState((prevState) => {
                return prevState += event.key.toLowerCase();
            });
        }         
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keyup', handleKeyUp);
            if (document.getElementById('ravioli-overlay')) document.body.removeChild(document.getElementById('ravioli-overlay'));
        }
    }, []);

    useEffect(() => {
        if (strState.length < 7 || document.getElementById('ravioli')) return;
        if (strState.match(/ravioli/g)) {
            setStrState('');

            const overlay = document.createElement('div');
            overlay.id = 'ravioli-overlay';

            const ravioliContainer = document.createElement('div');
            ravioliContainer.id = 'ravioli-container';
            overlay.appendChild(ravioliContainer);
            
            const img = document.createElement('img');
            img.id = 'ravioli-img';
            img.src = '/assets/images/ravioli.jpg';
            ravioliContainer.appendChild(img);

            const source = document.createElement('a');
            source.innerText = 'https://furbooru.org/images/140252';
            source.setAttribute('href', 'https://furbooru.org/images/140252');
            source.setAttribute('target', '_blank');

            const ravioliP = document.createElement('p');
            ravioliP.id = 'ravioli-p';
            ravioliP.innerText = 'Source - ';
            ravioliP.appendChild(source);
            overlay.appendChild(ravioliP);
            
            document.body.appendChild(overlay);

            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 5500);
        }
    }, [strState])

    return (
        <>
        <div id="nav-wrapper">
            <Nav />
        </div>
        <img id='donkey-kong-img' src="/assets/images/donkey-kong.webp" alt="" />
        <main id='main-info'>
            <h2 id='h2-info'>About</h2>
            <p id="about-p">
                This is a <a href="https://www.nytimes.com/games/wordle/index.html" target='_blank'>Wordle</a> inspired game where the words will be the names of Nintendo characters. Answers are varied in length and you can choose which franchise the name will be in under "Game Options".
                <br /><br />
                This follows the same rules as Wordle, where green means that the guessed letter is in the correct position, yellow means the letter is in the answer, but in wrong position, and grey means the letter is either not in the word or the letter is used up.
                <br /><br />
                This game allows you to play as many games as you want with the "Play Again" button at the bottom. There is also a link that you can copy under the share icon at top of page that will generate a link that has your current game's answer as the answer. There also might be a couple Easter eggs...{(window.innerWidth >= 600) && ' You can hover over these hints below.'}
                <br />
                <abbr title="On Game Page - Pester Link and he will take it out on his favorite merchant...">Hint 1</abbr>
                <abbr title="On This Page - Revali, but if he were Italian...">Hint 2</abbr>
                <br /><br />
                If you want to get in contact with me, then the easiest way is to join my Discord by clicking the logo below! {true && 'adsfadsf'}
                <br /><br />
                <span>(Click "Nintendle" in nav bar  to return to game)</span>
            </p>
            <a href="https://discord.com/invite/NxFuHfvWW7" target='_blank'>
                <img src="/assets/icons/discord-icon.svg" alt="Discord Icon" id='discord-icon' />
            </a>
        </main>
        <img id='purple-inkling-img' src="/assets/images/purple-inkling.webp" alt="" />
        <img id='green-inkling-img' src="/assets/images/green-inkling.webp" alt="" />
        </>
    )
}
