//creates a player with individual properties
class Player {
    //sets properties associated with player we create
    constructor() {
        this.position  =  {
            x: 100,
            y: 100
        }

        //sets gravity
        this.velocity = {
            x: 0,
            y: 0,
        }

        this.width = 100
        this.height = 100
        this.sides = {
            bottom: this.position.y + this.height
        }
        this.gravity = 1
    }
    //defines what a player looks like
    draw() {
        //adds a rectangle player
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        //adds to current y position to each frame
        this.position.y += this.velocity.y

        // above bottom of canvas
        // sets the player to bottom of canvas
        if (this.sides.bottom + this.velocity.y < canvas.height) {
            this.velocity.y += this.gravity
            this.sides.bottom = this.position.y + this.height
        } else this.velocity.y = 0
    }
}
