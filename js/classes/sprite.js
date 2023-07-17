// adds background for our game
class Sprite {
    constructor({ position, imageSrc, frameRate = 1 }) {
        this.position = position
        this.image = new Image()
        this.image.onload = () => {
            this.loaded = true
            // sets width and height to take up fill frame of the idle.png image
            this.width = this.image.width / this.frameRate
            this.height = this.image.height
        }
        this.image.src = imageSrc
        //determines if image has been loaded fully
        this.loaded = false
        this.frameRate = frameRate
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.frameBuffer = 2
    }
    draw() {
        if (!this.loaded) return
        const cropBox = {
            position: {
                x: this.width * this.currentFrame,
                y: 0,
            },
            width: this.width,
            height: this.height
        }

        context.drawImage(
            this.image,
            cropBox.position.x,
            cropBox.position.y,
            cropBox.width,
            cropBox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        this.updateFrames()
    }
    // increases this.currentFrame
    updateFrames() {
        this.elapsedFrames++

        if (this.elapsedFrames % this.frameBuffer === 0) {
            // adds 1 to the current frame and then starts frame from the beginning
            if (this.currentFrame < this.frameRate - 1) this.currentFrame++
            else this.currentFrame = 0
        }
    }
}