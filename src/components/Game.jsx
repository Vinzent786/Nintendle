import { useState, useEffect, useRef } from "react";
import Nav from './Nav.jsx';
import Grid from './Grid.jsx';
import GameOptions from "./GameOptions.jsx";
import '../styles/game.css?v=1.3'
import { useOptionsContext } from "../helpers/options-context.jsx";
import { answersObj, checkInAnswers } from "../helpers/answers.js?v=1.1";
import { useAnswerContext } from "../helpers/answer-context.jsx";
import { useGridContext } from "../helpers/grid-context.jsx";
import { gameFunctions } from '../helpers/game-functions.js';

export default function Game() {
    const {
        answerState, setAnswerState, 
        franchiseShown, setFranchiseShown,
    } = useAnswerContext();
    const {gridState, setGridState} = useGridContext();
    const [playAgain, setPlayAgain] = useState(false);
    const [gameOptionsClicked, setGameOptionsClicked] = useState(false);
    const {optionsState, setOptionsState} = useOptionsContext();
    const [showVid, setShowVid] = useState(false);
    const optionRef = useRef(optionsState);
    const handlePlayAgain = () => {
        window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
        setPlayAgain(true);
    }
    const [clickTimeStamps, setClickTimeStamps] = useState([]);

    // Re renders component and grid component with new answer
    useEffect(() => {
        if (!playAgain) return; //Guard clause to return if playAgain is false
        setAnswerState(null);
        setGridState(null);
        setPlayAgain(false);
        decideShowFranchise();
    }, [playAgain]);

    //Used to decide wether to show the franchise
    const decideShowFranchise = () => {
        if (optionsState.length === 1 ) {
            if (optionsState[0] === 'all') {
                setFranchiseShown(false);
            } else {
                setFranchiseShown(true);
            }
        } else {
            setFranchiseShown(false);
        }
    }

    //This funtion returns an array that holds answer and answer franchise
    const genAnswer = (franchise) => {
        const genName = (objKey) => {
            const randomName =  answersObj[objKey][Math.floor(Math.random() * answersObj[objKey].length)];
            return [objKey, randomName];
        }
        switch (franchise) {
            case 'all':
                const keys = Object.keys(answersObj);
                const randomkey = keys[Math.floor(Math.random() * keys.length)];
                return genName(randomkey);    
            default:
                for (const key in answersObj) {
                    if (franchise === key) {
                        return genName(key);
                    }
                }
                break;
        }
    }

    //Used for generating the answer on first load and when playAgain is set to true
    useEffect(() => {
        if (answerState) return;  
        const [CLanswerName, CLanswerFranchise] = window.location.href.split('?').reverse();
        //This is for handling a custom link
        if (CLanswerName && CLanswerFranchise) {
            try {
                const URIdecodedName = decodeURIComponent(CLanswerName);
                const URIdecodedFranchise = decodeURIComponent(CLanswerFranchise);
                const b64DecodedName = atob(URIdecodedName);
                const b64DecodedFranchise = atob(URIdecodedFranchise);
                if (checkInAnswers([b64DecodedFranchise, b64DecodedName])) {
                    setAnswerState([b64DecodedFranchise, b64DecodedName]);
                } else {
                    window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
                    window.location.reload();
                }
            } catch {
                window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
                window.location.reload();
            } finally {
                return;
            }
        }
        decideShowFranchise();
        if (!optionsState.length) {
            const answer = genAnswer('all');
            setAnswerState(answer);
        } else {
            const randomIndex = Math.floor(Math.random() * optionsState.length);
            const randomFranchise = optionsState[randomIndex];
            const answer = genAnswer(randomFranchise);
            setAnswerState(answer);
        }
    }, [answerState]);

    //Used for when the optionState changes to generate a new answer
    useEffect(() => {
        decideShowFranchise();
        if (optionRef.current === optionsState) return;
        if (!optionsState.length) {
            const answer = genAnswer('all');
            setAnswerState(answer);
        } else {
            const randomIndex = Math.floor(Math.random() * optionsState.length);
            const randomFranchise = optionsState[randomIndex];
            const answer = genAnswer(randomFranchise);
            setAnswerState(answer);
        }
        setPlayAgain(true);
    }, [optionsState]);

    //This hook is used for handling the button to show which franchise the answer is from
    useEffect(() => {
        if (!answerState) return;
        const [answerFranchise, answerName] = answerState;
        const showFranchise = document.getElementById('show-franchise');
        const handleShowFranchise = () => {
            gameFunctions.showFranchise(showFranchise, answerFranchise);
            setFranchiseShown(true);
        }
        //This is for checking if the franchise was shown or not previously and how it should be displayed based off of that
        if (!franchiseShown) {
            showFranchise.classList.add('show-franchise-hover');
            showFranchise.innerText = 'SHOW WHICH FRANCHISE NAME IS FROM';
            showFranchise.addEventListener('click', () => handleShowFranchise());
        } else if (franchiseShown) {
            showFranchise.innerText = answerFranchise;
        } 

        return () => {
            showFranchise.removeEventListener('click', () => handleShowFranchise());
        }
    }, [answerState]);

    //Hook to run on first mount to handle display of the game
    useEffect(() => {
        decideShowFranchise();
        //This is for setting the height of the content wrapper dynamically 
        const handleResize = () => {
            const contentWrapper = document.getElementById('content-wrapper');
            const navHeight = document.getElementsByTagName('nav')[0].clientHeight;
            contentWrapper.style.minHeight = `calc(100% - ${navHeight}px)`;
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleGameOptionsClicked = () => setGameOptionsClicked(true);

    const handleCloseBeedle = () => {
        document.getElementById('beedle-dialog').classList.add('beedle-slide-out');
        setTimeout(() => setShowVid(false), 500);
    }

    useEffect(() => {
        const dialog = document.getElementById('beedle-dialog');
        if (!showVid) {
            dialog.classList.remove('beedle-slide-in');
            dialog.close();
            return;
        }
        dialog.classList.remove('beedle-slide-out');
        const videoContainer = document.getElementById('video-container');
        videoContainer.style.display = 'flex';

        setTimeout(() => {
            const script = document.createElement('script');
            script.src = '//s.imgur.com/min/embed.js';
            script.async = true;
            script.charset = 'utf-8';
            document.body.appendChild(script);

            const blockquote = document.querySelector('.imgur-embed-pub');
            if (blockquote) {
                blockquote.setAttribute('autoplay', 'true');
                blockquote.setAttribute('muted', 'false');
            }
        });

        dialog.showModal();
        dialog.classList.add('beedle-slide-in');

        return () => dialog.close();

    }, [showVid]);

    const handleLinkClick = (event) => {
        const linkImg = document.getElementById('link-img');
        const rect = linkImg.getBoundingClientRect();
        const { clientX, clientY } = event;
        if (
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom
        ) {
            const time = new Date().getTime();
            setClickTimeStamps((prevTime) => [...prevTime, time]);
        }
    }

    useEffect(() => {
        if (showVid) return;
        const currentTime = new Date().getTime();
        const tempTime = clickTimeStamps
        .filter(time => currentTime - time < 1000);
        if (tempTime.length >= 5) setShowVid(true);
    }, [clickTimeStamps]);

    //This is used for fixing a bug with this animation affecting the screenshot
    useEffect(() => {
        const contentWrapper = document.getElementById('content-wrapper');
        contentWrapper.style.animation = 'slide-in-left  400ms forwards';
        setTimeout(() => {
            contentWrapper.style.animation = '';
        }, 500);
    }, []);


    return (
        <>
        <div id="nav-wrapper">
            <Nav />
        </div>
        <div id="content-wrapper" onClick={handleLinkClick}>
            <main id="main-game">
                <p id="show-franchise"></p>
                {answerState && <Grid answer={answerState}/>}
                <div id="play-again-container">
                    <button id="play-again" onClick={handlePlayAgain}>PLAY AGAIN</button>
                </div>
            </main>
            <div id="show-options" onClick={handleGameOptionsClicked}>
                <p>GAME OPTIONS</p>
                <button><img src="/assets/icons/down-arrow-white.svg" alt="Down Arrow" /></button>
            </div>
        </div>
        <dialog id="beedle-dialog">
            <div id="close-beedle-container">
                <div id="close-beedle" onClick={handleCloseBeedle}>X</div>
            </div>
            <div id="video-container">
                <blockquote className="imgur-embed-pub" lang="en" data-id="a/eMVVo0I">
                    <a href="//imgur.com/a/eMVVo0I">Link Tackles Beedle</a>
                </blockquote>
                <script async src="//s.imgur.com/min/embed.js" charSet="utf-8"></script>
            </div>
        </dialog>
        <img className="game-img" id="luigi-img" src="/assets/images/luigi.webp" alt="" />
        <img className="game-img" id="mario-img" src="/assets/images/mario.webp" alt="" />
        <img className="game-img" id="link-img" src="/assets/images/link.webp" alt="" />
        {gameOptionsClicked && <GameOptions setGameOptionsClicked={setGameOptionsClicked} />}
        </>
    )
}
