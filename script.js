const body = document.querySelector('body');
const container = document.querySelector('.container');   // container for main ttt box
const themesDropdown = document.querySelector('.themes-dropdown');
const themesButton = document.getElementById('themes-div');
const home = document.querySelector('#home');
const navAudio = new Audio('navbuttonsound.wav')
const selectSound = new Audio('selectionsound.mp3')
const navButtons = document.querySelectorAll('.navItem')
const rules = document.getElementById('rules');
const rulesContainer = document.querySelector('.rules-container')
const rulesCloseBtn = document.querySelector('.rules-close-btn');
const box = document.querySelectorAll('.box')
const xTurn = document.querySelector('.xTurn')
const yTurn = document.querySelector('.yTurn')
const resetBtn = document.querySelector('.reset-btn');

const resultDraw = document.querySelector('.result-draw')
const resultX = document.querySelector('.result-X')
const resultO = document.querySelector('.result-O')
const winningLine = document.querySelector('.winning-line');
const removeContainer = () => { container.style.opacity = '0' }
// game variables
const symbols = ['X', 'O']
let turn = 0;
let currentSymbol = 'X';
let winner = '';
let draw = false;
// --------------------------- //

// For Themes
function toggleDropdown() {
  themesDropdown.classList.toggle('active');
}

function closeDropdown(event) {
  if (!event.target.matches('#themes-div')) {
    themesDropdown.classList.remove('active');
  }
}
themesButton.addEventListener('click', toggleDropdown);
document.addEventListener('click', closeDropdown);

// For Quit
document.getElementById('quit').addEventListener('click', () => {
    let userResponse = prompt('Are you sure you want to quit?');
    
    if(userResponse === 'yes' || userResponse === 'Yes'){
        console.log('wont work lel');
    } else {
        // nothing
    }
});

// For rules
rules.addEventListener('click', () => {
    if (!rulesContainer.classList.contains('active')) {
        rulesContainer.classList.add('active');
        container.style.opacity = '0';
        resetBtn.style.opacity = '0'
    } else {
        rulesContainer.classList.remove('active');
        container.style.opacity = '1';
        resetBtn.style.opacity = '1'
    }
});


function removeRulesDiv(element){
    element.addEventListener('click', ()=>{
        rulesContainer.classList.remove('active')
        container.style.opacity = '1';
        resetBtn.style.opacity = '1';
    })
}

removeRulesDiv(rulesCloseBtn); 

// adding sound on nav buttons: 
navButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        navAudio.play();
    })
})

// turn decider
const turnDecider = () => {
    if(turn%2 === 0){
        currentSymbol = 'X'
        xTurn.style.opacity = '1'
        yTurn.style.opacity = '0'
    } else {
        xTurn.style.opacity = '0'
        yTurn.style.opacity = '1'
        currentSymbol = 'O'
    }
    turn++;
}

turnDecider();

/* home.addEventListener('click', ()=>{
    turn++;
    turnDecider();
    console.log(currentSymbol);
})
 */         // It was just to test the turn and turndecider
//const x = document.querySelectorAll('.X')
//const o = document.querySelectorAll('.O')

function checkWinner(symbol) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (box[a].textContent === symbol && box[b].textContent === symbol && box[c].textContent === symbol) {
            // darkening the color of background
            box[a].classList.toggle('winner-box');
            box[b].classList.toggle('winner-box');
            box[c].classList.toggle('winner-box');
            return true;
        }
    }

    return false;
}

// main game kind of

box.forEach(box => {
    box.addEventListener('click', () => {
        if (!box.textContent && winner === '') { // Check if the box is empty and the game is not over
            box.textContent = currentSymbol;
            selectSound.play();
            currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
            turnDecider();

            // Checking for winner
            if(checkWinner('X')){
                winner = 'X';
                resultX.style.opacity = '1'
                //reseting();
            } else if(checkWinner('O')){
                winner = 'O';
                resultO.style.opacity = '1'
                //reseting();
            }

            // Check for a draw when all boxes are filled
            if (winner === '' && turn > 9) {
                draw = true;
                xTurn.style.opacity = '0';
                yTurn.style.opacity = '0';

                console.log('It\'s a draw!');
                removeContainer();
                resultDraw.style.opacity = '1';
            }
        }
    });
});

function reseting(){
   // Clearing the content of all boxes
    box.forEach(box => {
        box.textContent = '';
        box.classList.remove('winner-box')
    });

    // Reseting game variables
    turn = 0;
    currentSymbol = 'X';
    winner = '';
    draw = false;
    container.style.opacity = 1;

    // Reset the turn indicators
    xTurn.style.opacity = '1';
    yTurn.style.opacity = '0';
    resultDraw.style.opacity = '0'
    resultX.style.opacity = '0'
    resultO.style.opacity = '0'

    // Add this line to ensure 'X' starts after reset
    turnDecider(); 
}

resetBtn.addEventListener('click', reseting);

