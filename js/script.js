//Selects canvas to add our javascript
const canvas = document.querySelector('canvas')
//Takes canvas and sets realm to a 2d space
const context = canvas.getContext('2d')

//Sets aspect ratio
canvas.width = 64 * 16 //1024
canvas.height = 64 * 9 //576

let parsedCollisions
let collisionBlocks
//renders background image to screen
let background
// creates door array
let doors
const player = new Player({
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
            onComplete: () => {
                console.log('completed animation')
                gsap.to(overlay, {
                    opacity: 1,
                    duration: 0.5,
                    onComplete: () => {
                        level++
                        levels[level].init()
                        gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.5,
                        })
                    }
                })
            }
        },
    },
})

let level = 1
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2d()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks

            //renders background image to screen
            background = new Sprite ({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc:  './img/backgroundLevel1.png',
            })
            // creates door array
            doors = [
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
        },
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2d()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks

            //renders background image to screen
            background = new Sprite ({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc:  './img/backgroundLevel2.png',
            })
            // creates door array
            doors = [
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
        },
    },
}

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

const overlay = {
    opacity: 0.1
}

//animation loop
function animate() {
    window.requestAnimationFrame(animate)

    //sets background image to the canvas
    background.draw()
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

    // will set the screen black when the player walks through door
    context.save()
    context.globalAlpha = overlay.opacity
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
}

levels[level].init()
animate()
