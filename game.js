

$(document).ready(() => {

    // roll dice button event
    $('#rolldice').click(function(e) {

        e.preventDefault()

        const diceValue = Math.floor(Math.random() * 6) + 1

        displayDice(diceValue)

    })

});

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
