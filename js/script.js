//Selects canvas to add our javascript
const canvas = document.querySelector('canvas')
//Takes canvas and sets realm to a 2d space
const context = canvas.getContext('2d')

//Sets aspect ratio
canvas.width = 64 * 16 //1024
canvas.height = 64 * 9 //576

const player = new Player()
//gives us the bottom of the player
// let bottom = y + 100
//animation loop
function animate() {
    window.requestAnimationFrame(animate)
    //draws a rectangle
    context.fillStyle = 'white'
    //clears the canvas from previous frames of animation
    context.fillRect(0, 0, canvas.width, canvas.height)

    player.draw()
    player.update()
}

animate()

