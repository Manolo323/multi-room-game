//creates a player with individual properties
class Player extends Sprite {
    //sets properties associated with player we create
    constructor({ collisionBlocks = [], imageSrc, frameRate }) {
        super({ imageSrc, frameRate })
        this.position  =  {
            x: 200,
            y: 200,
        }

        //sets gravity
        this.velocity = {
            x: 0,
            y: 0,
        }

        this.sides = {
            bottom: this.position.y + this.height
        }
        this.gravity = 1

        this.collisionBlocks = collisionBlocks
    }

    update() {
        // this is the blue box
        // context.fillStyle = 'rgba(0, 0, 255, 0.5)'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)

        // implements how player should move in reaction to x velocity
        this.position.x += this.velocity.x

        this.checkForHorizontalCollisions()
        this.applyGravity()
        this.checkForVerticalCollision()
    }
    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            // if a collision exists
            if (
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >=  collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                // collision on x-axis going to the left
                if (this.velocity.x < 0) {
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
                    break
                }
                // collision on x-axis going to the right
                if (this.velocity.x > 0) {
                    this.position.x = collisionBlock.position.x - this.width - 0.01
                    break
                }
            }
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }
    checkForVerticalCollision() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            // if a collision exists
            if (
                this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >=  collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                // collision on y-axis going to the left
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
                    break
                }
                // collision on x-axis going to the right
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y - this.height - 0.01
                    break
                }
            }
        }
    }
}
