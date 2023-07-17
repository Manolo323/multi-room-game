//creates a player with individual properties
class Player extends Sprite {
    //sets properties associated with player we create
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations }) {
        super({ imageSrc, frameRate, animations })
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

        // monitors for collision detection
        this.updateHitbox()

        this.checkForHorizontalCollisions()
        this.applyGravity()

        // monitors for collision detection
        this.updateHitbox()
        // renders hitbox
        // context.fillRect(
        //     this.hitbox.position.x,
        //     this.hitbox.position.y,
        //     this.hitbox.width,
        //     this.hitbox.height
        // )
        this.checkForVerticalCollision()
    }
    // assigns animation image to the image the sprite is currently using
    switchSprite(name) {
        // only switches to sprite if the current sprite has not already been set
        if (this.image === this.animations[name].image) return
        // will set current frame to start of animation
        this.currentFrame = 0
        this.image = this.animations[name].image
        // will get other properties
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
    }

    updateHitbox() {
        // monitors for collision detection
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width: 50,
            height: 53,
        }
    }
    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]
            // if a collision exists
            if (
                this.hitbox.position.x <=
                    collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >=
                    collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >=
                    collisionBlock.position.y &&
                this.hitbox.position.y <=
                    collisionBlock.position.y + collisionBlock.height
            ) {
                // collision on x-axis going to the left
                if (this.velocity.x < -0) {
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x =
                        collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }
                // collision on x-axis going to the right
                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01
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
                this.hitbox.position.x <=
                    collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >=
                    collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >=
                    collisionBlock.position.y &&
                this.hitbox.position.y <=
                    collisionBlock.position.y + collisionBlock.height
            ) {
                // collision on y-axis going to the left
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y =
                        collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }
                // collision on x-axis going to the right
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset =
                        this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
                }
            }
        }
    }
}
