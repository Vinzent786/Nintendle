import { answersObj } from './answers';

const gameFunctions = {
    checkInput: function(userAnswer) {
        let validName = false;
        for (const franchise in answersObj) {
            if(validName) break;
            if (answersObj[franchise].includes(userAnswer)) {
                validName = true;
                break;
            }
        }
        return validName;
    },
    handleInput: function(grid, key, answerName) {
        const gridDivs = Array.from(grid.children);
        const allowedChars = /^[A-Z]{1}$/;
        let game_over = document.getElementById('grid-el').getAttribute('game_over');
    
        const helpers = {
            //Handles all grid animations
            handleAnimations: function(element, animation)  {
                switch (animation) {
                    case 'text-scale':
                        element.classList.toggle(animation);
                        break;
                    case 'shake':
                        element.classList.add(animation);
                        setTimeout(() => {
                            element.classList.remove(animation);
                        }, 350);
                        break;
                    case 'invalid-name-shake':
                        element.classList.add(animation);
                        setTimeout(() => {
                            element.classList.remove(animation);
                        }, 350);
                        break;
                    default:
                        element.classList.add(animation);
                        break;
                }
            },
            colorKbKeys: function(letter, color) {
                const kbKeys = [...document.getElementsByClassName('kb-key')];
                kbKeys.forEach(kbKey => {
                    if (letter === kbKey.getAttribute('data-key')) {
                        const kbKeyClasses = [...kbKey.classList];
                        kbKeyClasses.forEach(keyClass => {
                            if (keyClass === 'orange' || keyClass === 'green' || keyClass === 'darkgrey') kbKey.classList.remove(keyClass);
                        });
                        this.handleAnimations(kbKey, color);
                    }
                });
            },
            positionDialogs: function(dialog) {
                const grid = document.getElementById('grid-container');
                const gridPosition = grid.getClientRects()[0];
                const gridTop = gridPosition.top;

                dialog.style.marginTop = `${gridTop + Math.round((dialog.clientHeight / 2))}px`;
            },
            //Handles legal characters entered
            handleAllowedChar: function(char, finishedDivsInRow) {
                if (finishedDivsInRow) {
                    if (finishedDivsInRow.length === answerName.length) return;
                }
                const nextGridDiv = gridDivs.filter((div) => {
                    if (div.getAttribute('finished') === 'false' && div.getAttribute('row-finished') === 'false') return div;
                })[0];
                nextGridDiv.innerText = char.toUpperCase();
                this.handleAnimations(nextGridDiv, 'text-scale');
                nextGridDiv.setAttribute('finished', true);
            },
            //Handles backspace key
            handleBackSpace: function() {
                const finishedDivs = gridDivs.filter((div) => {
                    if (div.getAttribute('finished') === 'true' && div.getAttribute('row-finished') === 'false') return div;
                });
                const lastFinishedDiv = finishedDivs[finishedDivs.length - 1];
                if (!lastFinishedDiv) return;
                lastFinishedDiv.innerText = '';
                lastFinishedDiv.setAttribute('finished', false);
                this.handleAnimations(lastFinishedDiv, 'text-scale');
            },
            //Recieves divs that should be sent to animation function for shaking. This is for trying to enter when not all divs in row have been entered
            handleBadLengthAnswer: function(divsInRow) {
                divsInRow.forEach((div) => {
                    if (div.getAttribute('finished') === 'false') this.handleAnimations(div, 'shake');
                });
            },
            //Handles the enter key
            handleEnter: function (finishedDivsInRow, divsInRow, currentRow) {
                //Checking if answer entered matches row length
                if(finishedDivsInRow.length !== answerName.length) {
                    this.handleBadLengthAnswer(divsInRow);
                } else if (finishedDivsInRow.length === answerName.length) {
                    //useranswer here is used to check if submitted name is a valid name
                    let useranswer = '';
                    divsInRow.forEach((div) => {
                        useranswer += div.innerText;
                    });
                    //If submitted name is not valid, create error dialog and don't continue
                    let validName = gameFunctions.checkInput(useranswer);
                    if (!validName) {
                        finishedDivsInRow.forEach((div) => this.handleAnimations(div, 'invalid-name-shake'));
                        const dialog = document.createElement('dialog');
                        dialog.id = 'invalid-name-dialog';
                        const p = document.createElement('p');
                        p.innerText = 'Invalid Name!';
                        dialog.appendChild(p);
                        document.getElementById('root').appendChild(dialog);
                        dialog.showModal();
                        this.positionDialogs(dialog);
                        setTimeout(() => {
                            dialog.close();
                            document.getElementById('root').removeChild(dialog);
                        }, 900);
                        return;
                    }
                    divsInRow.forEach((div) => {
                        div.setAttribute('row-finished', true);
                    });
                    this.checkAnswer(finishedDivsInRow, answerName, currentRow);
                    //End of Game
                    if (currentRow === '6') return;
                }
            },
            //Checks answer
            checkAnswer: function(finishedDivsInRow, answerName, currentRow) {
                let guesses = JSON.parse(sessionStorage.getItem('guesses')) || 0;
                guesses += 1;
                sessionStorage.setItem('guesses', JSON.stringify(guesses));
                let userAnswer = '';
                let greenArr = []; //Arr holding corrently guessed letters
                let charPositions = {}; //Object holds the ansert letters as keys, and values are arrays of indicies where the letter occurs in answer
                //Builds userAnswer
                    for (let i = 0; i < finishedDivsInRow.length; i++) {
                    userAnswer += finishedDivsInRow[i].innerText;
                }
                let copyUserAnswer = userAnswer; //Copy of user's answers
                //Building charPositions
                for (let i = 0; i < answerName.length; i++) {
                    let char = answerName[i];
                    if (!charPositions[char]) charPositions[char] = [];
                    charPositions[char].push(i);
                }
                //Loops thrugh userAnswer
                for (let i = 0; i < userAnswer.length; i++) {
                    let guessedLetterPositions; //Array of correct indicies of letter
                    //If user user answer letter is a key in charPositions
                    if (charPositions[userAnswer[i]]) { 
                        let char = userAnswer.charAt(i); //Current character
                        guessedLetterPositions = charPositions[userAnswer[i]];
                        if (charPositions[userAnswer[i]].includes(userAnswer.indexOf(char))) {
                            this.handleAnimations(finishedDivsInRow[i], 'green');
                            this.colorKbKeys(finishedDivsInRow[i].innerText, 'green');
                            greenArr.push(char);
                        } else {
                            let charCount = 0; //Occurances of letter guessed
                            for (let x = 0; x < userAnswer.length; x++) {
                                if (userAnswer.charAt(x) === char) charCount ++;
                            }
                            for (let x = 0; x < greenArr.length; x++) {
                                if (greenArr[x] === char) charCount ++;
                            }
                            if (guessedLetterPositions.length >= charCount) {
                                this.handleAnimations(finishedDivsInRow[i], 'orange');
                                this.colorKbKeys(finishedDivsInRow[i].innerText, 'orange');
                            } else {
                                this.handleAnimations(finishedDivsInRow[i], 'grey');
                            }
                        }
                        userAnswer = userAnswer.replace(char, '%'); //Replaces character checked with an illegal character, so it won't match and the next character can be checked
                    } else if (!charPositions[userAnswer[i]]) {
                        this.handleAnimations(finishedDivsInRow[i], 'grey');
                        this.colorKbKeys(finishedDivsInRow[i].innerText, 'dark-grey');
                    }
                }
                //Checks if game should be finished
                let won;
                if (greenArr.length === answerName.length) {
                    won = true;
                    this.finishGame(guesses, won)
                } else if (parseInt(currentRow) === 6) {
                    won = false;
                    this.finishGame(guesses, won);
                } 
            },
            //Function to be ran at end of game
            finishGame: function(guesses, won) {
                const kbKeys = [...document.getElementsByClassName('kb-key')];
                kbKeys.forEach(kbKey => kbKey.classList.remove('kb-key-hover'));
                document.getElementById('grid-el').setAttribute('game_over', true);
                game_over = 'true';
                sessionStorage.removeItem('guesses');
                this.createFinishDialog(guesses, won);
                setTimeout(() => this.getScores(won, guesses), 2500);
            },
            getScores: function(won, guesses) {
                let scores = JSON.parse(localStorage.getItem('scores'));
                if (!scores) {
                    scores = {
                        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 'Played': 0, 'Won': 0, 'Lost': 0, 'Win %': 0
                    };
                } 
                switch (won) {
                    case true:
                        for (const key in scores) {
                            if (guesses === parseInt(key)) scores[key] += 1;
                        }
                        scores['Won'] += 1;
                        scores['Played'] += 1;
                        break;
                    case false:
                        scores['Lost'] += 1;
                        scores['Played'] += 1;
                        break;
                    case undefined: //If scores is shown wihtout game being finished
                        break;
                    default:
                        break;  
                }
                if (scores['Played'] === 0) { //Avoids division by 0
                    scores['Win %'] = 0;
                } else if (scores['Played'] !== 0) {
                    scores['Win %'] = Math.round(((scores['Won'] / scores['Played']) * 100));
                }
                try {
                    localStorage.setItem('scores', JSON.stringify(scores)); //Sets scores object into browser's local storage
                } catch(error) {
                    alert(`There was an error saving your scores :c\nError: ${error}`);
                } finally {
                    (async () => {
                        return document.getElementById('scores').click();
                    })()
                    .then(() => document.getElementById('close-scores').blur());
                }
            },
            createFinishDialog: function(guesses, won) {
                const dialog = document.createElement('dialog');
                dialog.id = 'finish-dialog';
                const dialogP = document.createElement('p');
                let text;
                if (won) {
                    switch(guesses) {
                        case 1:
                            text = 'Flawless!';
                            break;
                        case 2:
                            text = 'Amazing!';
                            break;                    
                        case 3:
                            text = 'Fantastic!';
                            break;
                        case 4:
                            text = 'Got it!';
                            break;
                        case 5:
                            text = 'phew!';
                            break;
                        case 6:
                            text = 'That was close!';
                            break;
                        default:
                            break;
                    }
                } else {
                    const lossText = ['Almost!', 'Close!', 'Almost had it!', 'You got it next time!', 'oof!', 'Good try!'];
                    const randomIndex = Math.floor(Math.random() * lossText.length);
                    text = `${lossText[randomIndex]}<br>The answer was<br><u>${answerName}</u>`;

                }
                dialogP.innerHTML =  text;
                dialog.appendChild(dialogP);
                document.getElementById('root').appendChild(dialog);
                dialog.showModal();
                this.positionDialogs(dialog);
                setTimeout(() => {
                    dialog.close();
                    document.getElementById('root').removeChild(dialog);
                }, 2600);
            }
        }
    
        function start() {
            if (game_over === 'true') return; //Guard clause for if game is over
            let currentRow;
            //Array of divs whose attribute finished is set to true
            const finishedDivs = gridDivs.filter((div) => {
                if (div.getAttribute('finished') === 'true') return div;
            });
            // This if/else block is responsible for setting the current row
            if (!finishedDivs[finishedDivs.length - 1]) { //If no chars entered at all
                currentRow = '1';
            } else if (finishedDivs[finishedDivs.length - 1].getAttribute('row-finished') === 'false') { //If chars entered, but not the amount in answer
                currentRow = finishedDivs[finishedDivs.length - 1].getAttribute('row');
            } else { //If no chars entered for current row, where current row is not first row
                    currentRow = JSON.stringify(parseInt(finishedDivs[finishedDivs.length - 1].getAttribute('row')) + 1)
            }
            //All the divs in the current row
            const divsInRow = gridDivs.filter((div) => {
                if (currentRow === div.getAttribute('row')) return div; 
            });
            //All the divs in current row which have been filled
            const finishedDivsInRow = finishedDivs.filter((div) => {
                if (div.getAttribute('row') === currentRow) return div;
            })
            //This if/else block decided what to do after a key has been entered
            if (allowedChars.test(key)) {
                helpers.handleAllowedChar(key, finishedDivsInRow);
            } else if (!allowedChars.test(key)) {
                if (key === 'BACKSPACE') helpers.handleBackSpace();
                if (key === 'ENTER') helpers.handleEnter(finishedDivsInRow, divsInRow, currentRow);
                return;
            }
        }
        start();
    
    }
}


export { gameFunctions }