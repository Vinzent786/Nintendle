import { useEffect, useState } from "react";
import { useAnswerContext } from "../helpers/answer-context";

export default function CustomLink({setCustomLinkClicked}) {
    const { answerState } = useAnswerContext();
    const [customLinkState, setCustomLinkState] = useState('https://nintendle.io/');

    useEffect(() => {
        let customPath;
        try {
            const [answerFranchise, answerName] = answerState;
            const b64EncodedAnswerName = btoa(answerName);
            const b64EncodedAnswerFranchise = btoa(answerFranchise);
            const URIEncodedAnswerName = encodeURIComponent(b64EncodedAnswerName);
            const URIEncodedAnswerFranchise = encodeURIComponent(b64EncodedAnswerFranchise);
            const URIDecodedAnswerName = decodeURIComponent(URIEncodedAnswerName);
            const URIDecodedAnswerFranchise = decodeURIComponent(URIEncodedAnswerFranchise);
            customPath = `https://nintendle.io?${URIEncodedAnswerFranchise}?${URIEncodedAnswerName}`;

            const promise = new Promise((res, rej) => {
                let customLink = document.getElementById('custom-link');
                if (!customLink) rej('Unable to get the custom link element :c');
                res(customLink);
            });
    
            promise
            .then(customLink => {
                customLink.innerText = customPath;
                setCustomLinkState(customLink.innerText);
            })
            .catch((err) => {
                alert(err);
            });
        } catch {
            console.log('There was an error generating your custom link :c');
            const promise = new Promise((res, rej) => {
                let customLink = document.getElementById('custom-link');
                if (!customLink) rej('Unable to get the custom link element :c');
                res(customLink);
            });
            promise
            .then(customLink => {
                customLink.innerText = 'https://nintendle.io/';
                setCustomLinkState(customLink.innerText);
            })
            .catch((err) => {
                alert(err);
            });
        } finally {
            document.getElementById('custom-link-dialog').showModal();
        }
    }), [];

    const copyLink = () => {
        const p = document.getElementById('custom-link');
        const text = p.innerText;
        navigator.clipboard.writeText(text);

        const dialog = document.getElementById('copied');
        dialog.showModal();

        const linkContainer = document.getElementById('custom-link-container');
        const linkContainerPosition = linkContainer.getClientRects()[0];
        const screenWidth = screen.width;

        dialog.style.margin = `${linkContainerPosition.bottom - 5}px auto 0`;
    

        setTimeout(() => {
            dialog.close();
        }, 1000);
    }

    const handleCloseCustomLink = () => setCustomLinkClicked(false);

    const handleShare = (event) => {
        switch (event.target.id) {
            case 'discord-icon':
                break;
            case 'twitter-icon':
                const tweet = `https://twitter.com/intent/tweet?text=Check out Nintendle! ${customLinkState}`;
                window.open(tweet);
                break;
            case 'facebook-icon':
                const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${customLinkState}`;
                window.open(facebookShare);
                break;
            default:
                break;
        }
    }


    return (
        <>
        <dialog id="custom-link-dialog">
            <button id="close-custom-link" onClick={handleCloseCustomLink}>X</button>
            <div id="link-container">
                <p>Share game link that has this game's answer</p>
                <div id="custom-link-container">
                    <button onClick={copyLink}><img src='/assets/icons/copy-icon.svg' alt="Copy Icon" /></button>
                    <dialog id="copied">Link Copied!</dialog>
                    <p id="custom-link"></p>
                </div>
                {/* Make share to discord and twitter */}
            </div>
            <div id="share-container">
                <img src="/assets/icons/twitter-icon.svg" alt="Twitter / X Logo" id="twitter-icon" className="social-media-icon" onClick={handleShare}/>
                <img src="/assets/icons/facebook-icon.svg" alt="Facebook Logo" id="facebook-icon" className="social-media-icon" onClick={handleShare}/>
            </div>
        </dialog>
        </>
    )
}
