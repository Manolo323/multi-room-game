//Selects canvas to add our javascript
const canvas = document.querySelector('canvas')
//Takes canvas and sets realm to a 2d space
const context = canvas.getContext('2d')

//Sets aspect ratio
canvas.width = 64 * 16 //1024
canvas.height = 64 * 9 //576

const parsedCollisions = collisionsLevel1.parse2d()
const collisionBlocks = parsedCollisions.createObjectsFrom2D()

//renders background image to screen
const backgroundLevel1 = new Sprite ({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc:  'img/backgroundLevel1.png',
})

const player = new Player({
    collisionBlocks
})

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

    //sets background image to the canvas
    backgroundLevel1.draw()
    // sets collision blocks to the level 1 map
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw()
    })

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
