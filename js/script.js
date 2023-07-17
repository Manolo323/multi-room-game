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
    imageSrc:  './img/backgroundLevel1.png',
})

const player = new Player({
    collisionBlocks,
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    // sprite swapping
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idle.png',
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: './img/king/enterDoor.png',
        },
    },
})

// creates door array
const doors = [
    new Sprite({
        position: {
            x: 767,
            // subtracted y coordinate from doors height in Tiled
            y: 270
        },
        imageSrc: './img/doorOpen.png',
        frameRate: 5,
        frameBuffer: 5,
        loop: false,
        autoplay: false
    })
]

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

    // renders doors to canvas
    doors.forEach((door) => {
        door.draw()
    })

    player.handleInput(keys)
    player.draw()
    player.update()
}

animate()
