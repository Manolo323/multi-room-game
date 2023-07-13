//Selects canvas to add our javascript
const canvas = document.querySelector('canvas')
//Takes canvas and sets realm to a 2d space
const context = canvas.getContext('2d')

//Sets aspect ratio
canvas.width = 64 * 16 //1024
canvas.height = 64 * 9 //576

// adds background for our game
class Sprite {
    constructor({position}) {
        this.position = position
        this.image = new Image()
        this.image.src = '../img/backgroundLevel1.png'
    }
}
const player = new Player()

// properties for event listener key that is pressed
const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
}

//animation loop
function animate() {
    window.requestAnimationFrame(animate)
    //draws a rectangle
    context.fillStyle = 'white'
    //clears the canvas from previous frames of animation
    context.fillRect(0, 0, canvas.width, canvas.height)

    //sets player velocity to 0 to have player stay
    player.velocity.x = 0
    // moves to the right
    if (keys.d.pressed) player.velocity.x = 5
        // moves to the left
    else if (keys.a.pressed) player.velocity.x = -5
    player.draw()
    player.update()
}

animate()
