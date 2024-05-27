import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Scores from "./Scores";
import '../styles/nav.css';
import CustomLink from "./CustomLink";


export default function Nav() {
    let nav;
    const [navHeight, setNavHeight] = useState(0);
    const handleNavHeight = (height) => setNavHeight(height);
    const [scoresClicked, setScoresClicked] = useState(false);
    const [customLinkClicked, setCustomLinkClicked] = useState(false);
    const rootPath = window.location.hash === '#/' || false;
    const [scDialog, setScDialog] = useState(false);

    const handleScreenShot = () => {
        setScDialog(true);

        document.getElementById('content-wrapper').style.transform = 'translateX(0%)';

        const waterMark = document.createElement('span');
        waterMark.id = 'watermark';
        waterMark.innerText = 'Nintendle.io';

        const grid = document.getElementById('grid-el');
        grid.appendChild(waterMark);
        
        const dialog = document.getElementById('screen-shot-dialog');
        const screenShotContainer = document.getElementById('screen-shot-container');

        setTimeout(() => {
            grid.style.border = '2px solid #ffffff';
            grid.style.padding = '15px';
            html2canvas(grid, {
                backgroundColor: '#0d181f', 
                border: '2px solid white',
                scale: window.devicePixelRatio
            })
            .then(originalCanvas => {
                const canvas = document.createElement('canvas');
                canvas.width = originalCanvas.width;
                canvas.height = originalCanvas.height;
    
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = 'transparent';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(originalCanvas, 0, 0, canvas.width, canvas.height);
                
                screenShotContainer.innerHTML = '';
                screenShotContainer.appendChild(canvas);
                dialog.showModal();

                grid.removeChild(waterMark);
                grid.style.padding = '0px';
                grid.style.border = 'none';
            });
        }, 200);
    }

    const handleCloseScreenShot = () => {
        const dialog = document.getElementById('screen-shot-dialog');
        const screenShotContainer = document.getElementById('screen-shot-container');
        screenShotContainer.removeChild(document.getElementsByTagName('canvas')[0]);
        dialog.close();
        setScDialog(false);
    };

    const handleDownload = () => {
        const dialog = document.getElementById('screen-shot-dialog');
        const screenShot = document.getElementsByTagName('canvas')[0];
        const link = document.createElement('a');
        link.download = 'Nintendle Screenshot.png';
        link.href = screenShot.toDataURL('image/png');
        link.click();
        if (document.getElementById('check-mark')) return;
        const checkMark = document.createElement('div');
        checkMark.id = 'check-mark';
        const img = document.createElement('img');
        img.src = '/Nintendle/assets/icons/check-mark-icon.svg';
        img.alt = 'Check Mark Icon';
        checkMark.appendChild(img);
        dialog.appendChild(checkMark);


    }

    useEffect(() => {
        if (scDialog) return;
        if (document.getElementById('check-mark')) {
            document.getElementById('screen-shot-dialog').removeChild(document.getElementById('check-mark'));
        }
    }, [scDialog]);

    useEffect(() => {
        nav = document.getElementsByTagName('nav')[0];
        const navResizeObserver = new ResizeObserver(() => handleNavHeight(nav.clientHeight));
        navResizeObserver.observe(nav);

        return () => {
            navResizeObserver.unobserve(nav);
            navResizeObserver.disconnect();
        }
    }, []);
    
    //This is for setting a height to nav-wrapper that is always the height of nav
    //so nav can be fixed without overlapping content when at top of screen
    useEffect(() => {
        const navWappper = document.getElementById('nav-wrapper');
        navWappper.style.height = `${navHeight}px`;
        const luigiImg = document.getElementById('luigi-img');
        if (luigiImg) luigiImg.style.top = `calc(5% + ${navHeight}px)`;
    }, [navHeight]);

    const handleScoresClick = () => setScoresClicked(true);
    const handleCustomLinkClick = () => setCustomLinkClicked(true);

    
    return (
        <>
        <nav id="nav">
        <img id="pikachu-img" src="/Nintendle/assets/images/pikachu.webp" alt="Pikachu" />
            <Link to={'/'}>
                <h1>Nintendle</h1>
            </Link>
            <div id="nav-right">
                {(
                    rootPath && 
                    <button className="nav-buttons" id="camera" onClick={handleScreenShot}>
                    <img src="/Nintendle/assets/icons/camera-icon.svg" alt="" /></button>
                )}
                <Link to={'/info.jsx'}>
                    <button className="nav-buttons" id='info-icon'><img src="/Nintendle/assets/icons/info-icon.svg" alt="info icon"/></button>
                </Link>
                <button className="nav-buttons" id="share-icon" onClick={handleCustomLinkClick}><img src="/Nintendle/assets/icons/share-icon.svg" alt="Share Icon" /></button>
                <button className="nav-buttons" id='scores' onClick={handleScoresClick}>Scores</button>
            </div>
        </nav>
        {(
            rootPath && 
            <dialog id="screen-shot-dialog">
                <button id="close-screen-shot" onClick={handleCloseScreenShot}>X</button>
                <div id="screen-shot-container"></div>
                <button id="download" onClick={handleDownload}>Download</button>
            </dialog>
        )}
        {customLinkClicked && <CustomLink setCustomLinkClicked={setCustomLinkClicked} />}
        {scoresClicked && <Scores setScoresClicked={setScoresClicked} />}
        </>
    );
}