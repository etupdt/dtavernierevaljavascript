
let game = true

let round = 1

$(document).ready(() => {

    // roll dice button event
    $('#rolldice').click(function(e) {

        e.preventDefault()

        if (game) {

            const diceValue = Math.floor(Math.random() * 6) + 1

            const current1 = document.getElementById('current1')
            const current2 = document.getElementById('current2')
            
            if (diceValue === 1) {

                if (round === 1) {
                    current1.innerText = '0'
                } else {
                    current2.innerText = '0'
                }

                switchPlayer()

            } else {
        
                if (round === 1) {
                    current1.innerText = (parseInt(current1.innerText) + diceValue)
                } else {
                    current2.innerText = (parseInt(current2.innerText) + diceValue)
                }
            
            }

            displayDice(diceValue)

        }

    })

    $('#hold').click(function(e) {

        e.preventDefault()
        
        if (game) {

            const current1 = document.getElementById('current1')
            const current2 = document.getElementById('current2')
            
            const global1 = document.getElementById('global1')
            const global2 = document.getElementById('global2')

            if (round === 1) {

                global1.innerHTML = (parseInt(global1.innerText) + parseInt(current1.innerText))
                current1.innerText = '0'

                if (parseInt(global1.innerText) >= 10) {
                    game = false
                    document.getElementById('dice').className = 'shadow hidden'
                    document.getElementById('message').innerText = 'Partie terminée et remportée par player 1'
                } else {
                    switchPlayer()
                }

            } else {

                global2.innerText = (parseInt(global2.innerText) + parseInt(current2.innerText))
                current2.innerText = '0'

                if (parseInt(global2.innerText) >= 10) {
                    game = false
                    document.getElementById('dice').className = 'shadow hidden'
                    document.getElementById('message').innerText = 'Partie terminée et remportée par player 2'
                } else {
                    switchPlayer()
                }

            }

        }

    })

    // new game button event
    $('#newgame').click(function(e) {

        e.preventDefault()

        switchPlayer()

        newGame()

    })

    selectPlayer(round)

    newGame()

});

function newGame () {

    document.getElementById('message').innerText = ''

    document.getElementById('global1').innerText = '0'
    document.getElementById('global2').innerText = '0'
    document.getElementById('current1').innerText = '0'
    document.getElementById('current2').innerText = '0'

//    displayDice(0)

    game = true

}

function switchPlayer() {

    effacePoints(document.getElementById('canvasplayer' + round))
    document.getElementById('player' + round).className = 'nextplayer'

    round++
    if (round === 3) 
        round = 1

    selectPlayer(round)

}

function selectPlayer(round) {

    const radius = 8

    points(document.getElementById('canvasplayer' + round), [[5, 5]], radius)
    document.getElementById('player' + round).className = 'player'

}

function displayDice(numero) {

    const radius = 8

    const faces = [
        [[]],
        [[5, 5]],
        [[2, 8], [8, 2]],
        [[2, 8], [5, 5], [8, 2]],
        [[2, 2], [2, 8], [8, 2], [8, 8]],
        [[2, 2], [2, 8], [5, 5], [8, 2], [8, 8]],
        [[2, 2], [2, 5], [2, 8], [8, 2], [8, 5], [8, 8]]
    ]

    const canvas = document.getElementById('dice');

    canvas.className = 'shadow'

    effacePoints(canvas)
    points(canvas, faces[numero], radius)

}

function points(canvas, arrayPoints, radius) {
    console.log(radius)
    const ratio = canvas.offsetWidth / 10
    
    let ctx;

    if (canvas.getContext) {

        ctx = canvas.getContext('2d') ;

        for (let point of arrayPoints) {

            ctx.beginPath();
            ctx.arc(point[0] * ratio, point[1] * ratio, radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgb(200, 0, 0)';
            ctx.fill();

        }

    } else {

        alert('Navigateur obsolète')
    
    }

}

// clear canvas
function effacePoints(canvas) {

    let ctx;

    if (canvas.getContext) {

        ctx = canvas.getContext('2d') ;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

    } else {

        alert('Navigateur obsolète')
    
    }

}
