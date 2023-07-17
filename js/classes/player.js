//creates a player with individual properties
class Player {
    //sets properties associated with player we create
    constructor({
        collisionBlocks = []
                }) {
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

        this.collisionBlocks = collisionBlocks
    }
    //defines what a player looks like
    draw() {
        //adds a rectangle player
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        // implements how player should move in reaction to x velocity
        this.position.x += this.velocity.x
        // check for horizontal collisions
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            // if a collision exists
            if (
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >=  collisionBlock.position.x &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                // collision on x axis goig to the left
                if (this.velocity.x < -1) {
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
                    break
                }
                if (this.velocity.x < 1) {
                    this.position.x = collisionBlock.position.x - this.width - 0.01
                    break
                }
            }
        }
        //adds to current y position to each frame
        this.position.y += this.velocity.y
        this.sides.bottom = this.position.y + this.height

        // above bottom of canvas
        // sets the player to bottom of canvas
        if (this.sides.bottom + this.velocity.y < canvas.height) {
            this.velocity.y += this.gravity
        } else this.velocity.y = 0
    }
}
