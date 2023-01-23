const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelectorAll('button')[0],
    restart: document.querySelectorAll('button')[1],
    win: document.querySelector('.win')
}



const state = {
    player: '',
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

let player= document.querySelectorAll('input')[0]



const shuffle = array => {
    const clonedArray = [...array]

    for (let index = clonedArray.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        const original = clonedArray[index]

        clonedArray[index] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }

    return clonedArray
}

const pickRandom = (array, items) => {
    const clonedArray = [...array]
    const randomPicks = []

    for (let index = 0; index < items; index++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length)
        
        randomPicks.push(clonedArray[randomIndex])
        clonedArray.splice(randomIndex, 1)
    }

    return randomPicks
}

let difficulty = document.querySelectorAll('select')[0]
console.log(difficulty.value);



function addNewScore() {
    let li = document.createElement('li')
    let span1 = document.createElement('span')
    let span3 = document.createElement('span')
    let span2 = document.createElement('span')

    span1.innerText = 'name: ' +state.player + ' '
    span2.innerText = 'moves: ' +state.totalFlips + ' '
    span3.innerText = 'time: ' +state.totalTime + ' '

    li.appendChild(span1)
    li.appendChild(span2)
    li.appendChild(span3)

    let ul = document.querySelector('ul')

    ul.appendChild(li)
}

const generateGame = () => {
    
    let cards;

    let profil = [];
    let rachel = new Image
    rachel.src = './public/img/profil/rachel.jpeg'
    rachel.alt = 'rachel'
    profil.push(rachel)

    let allie = new Image
    allie.src = './public/img/profil/allie.jpeg'
    allie.alt = 'allie'
    profil.push(allie)

    let natalie = new Image
    natalie.src = './public/img/profil/natalie.jpeg'
    natalie.alt = 'natalie'
    profil.push(natalie)

    let chelsey = new Image
    chelsey.src = 'https://i.insider.com/6299094de319620018a83ff6?width=1000&format=jpeg&auto=webp'
    chelsey.alt = 'chelsey'
    profil.push(chelsey)

    let ann = new Image
    ann.src = './public/img/profil/ann.webp'
    ann.alt = 'ann'
    profil.push(ann)

    let claire = new Image
    claire.src = './public/img/profil/claire.png'
    claire.alt = 'claire'
    profil.push(claire)

    let elise = new Image
    elise.src = './public/img/profil/elise.jpeg'
    elise.alt = 'elise'
    profil.push(elise)

    let lauren = new Image
    lauren.src = './public/img/profil/lauren.jpeg'
    lauren.alt = 'lauren'
    profil.push(lauren)


    // const profil = ['rachel', 'allie', 'natalie', 'chelsey']
    let dimensions;
    let picks;
    let items;
    switch (difficulty.value) {
        case "facile":
            selectors.board.setAttribute('number-of-cards', 6)
            dimensions = selectors.board.getAttribute('number-of-cards')
            picks = pickRandom(profil, (dimensions) / 2)
            items = shuffle([...picks, ...picks])
            cards = `
            <div class="board" style="grid-template-columns: repeat(3, auto); grid-template-rows: repeat(2, auto)">
                ${items.map(item => `
                    <div class="card">
                        <div class="card-front"></div>
                        <div class="card-back">
                        <img class="tinderPicture" src=${item.src} alt="" height = 150px; width= 100px; />
                        </div>
                    </div>
                `).join('')}
            </div>
        `
        // console.log(difficulty.value);
            break;
        
        case "difficile":
            selectors.board.setAttribute('number-of-cards', 8)
            dimensions = selectors.board.getAttribute('number-of-cards')
            picks = pickRandom(profil, (dimensions) / 2)
            items = shuffle([...picks, ...picks])
            cards = `
            <div class="board" style="grid-template-columns: repeat(4, auto); grid-template-rows: repeat(2, auto)">
                ${items.map(item => `
                    <div class="card">
                        <div class="card-front"></div>
                        <div class="card-back">
                        <img class="tinderPicture" src=${item.src} alt="" height = 150px; width= 100px; />
                        </div>
                    </div>
                `).join('')}
            </div>
        `
        // console.log(difficulty.value);
            break;
        
        case "Beau Goss":
            selectors.board.setAttribute('number-of-cards', 16)
            dimensions = selectors.board.getAttribute('number-of-cards')
            picks = pickRandom(profil, (dimensions) / 2)
            items = shuffle([...picks, ...picks])
            cards = `
            <div class="board" style="grid-template-columns: repeat(4, auto); grid-template-rows: repeat(4, auto)">
                ${items.map(item => `
                    <div class="card">
                        <div class="card-front"></div>
                        <div class="card-back">
                        <img class="tinderPicture" src=${item.src} alt="" height = 150px; width= 100px; />
                        </div>
                    </div>
                `).join('')}
            </div>
        `
        
        // console.log(difficulty.value);
            break;
    
        default:
            break;
    }

    const parser = new DOMParser().parseFromString(cards, 'text/html')

    selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')
    // difficulty.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `time: ${state.totalTime} sec`
    }, 1000)
}


// const reStartGame = () => {
//     state.gameStarted = true
//     selectors.start.classList.add('disabled')
//     // difficulty.classList.add('disabled')

//     state.loop = setInterval(() => {
//         state.totalTime++

//         selectors.moves.innerText = `${state.totalFlips} moves`
//         selectors.timer.innerText = `time: ${state.totalTime} sec`
//     }, 1000)
// }

    

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped')
    })

    state.flippedCards = 0
}

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    // if (!state.gameStarted) {
    //     startGame()
    // }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped')
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)')
        // console.log(flippedCards[0].lastElementChild);

        // console.log(flippedCards[0].querySelectorAll('.tinderPicture'));

        let imgCardOne = flippedCards[0].querySelectorAll('.tinderPicture');
        // console.log(imgCardOne[0].getAttribute('src'));
        let imgCardOneSrc = imgCardOne[0].getAttribute('src')
        
        let imgCardTwo = flippedCards[1].querySelectorAll('.tinderPicture')
        let imgCardTwoSrc = imgCardTwo[0].getAttribute('src')


        if (imgCardOneSrc === imgCardTwoSrc) {
            flippedCards[0].classList.add('matched')
            flippedCards[1].classList.add('matched')
            let tinderSound = new Audio ("./public/sound/tinder_match.wav")
            tinderSound.play()
        }

        setTimeout(() => {
            flipBackCards()
        }, 1000)
    }

    // If there are no more cards that we can flip, we won the game
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped')
            selectors.win.innerHTML = `
                <span class="win-text">
                    You ${state.player}Win! You sexy beast!!!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `
            addNewScore()
            clearInterval(state.loop)
        }, 1000)
    }
}

const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } 
        // else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
        //     generateGame()
        //     startGame()
        // }
        else if (eventTarget.className.includes('start') && !eventParent.className.includes('disabled')) {
            state.player= player.value
            generateGame()
            startGame()
        }
        else if (eventTarget.className.includes('startAgain')){
            selectors.boardContainer.classList.remove('flipped')
            generateGame()
            startGame()
        }
    })
}



attachEventListeners()



// let  tableauScores = [
//     {nom: '01', score:'' , moves:'' },
//     {nom: '02', score: '', moves:''},
//     {nom: '03', score: '', moves:''},
//     {nom: '04', score: '', moves:''},
//     {nom: '05', score: '', moves:''}
// ];

