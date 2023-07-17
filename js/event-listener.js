//listens to keyboard events
window.addEventListener('keydown', (event) => {
    if (player.preventInput) return
    switch (event.key) {
        case 'w':
            // detects for collision
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]
                if (
                    player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height
                ) {
                    player.velocity.x = 0
                    player.velocity.y = 0
                    // player will not move around once player collides with door
                    player.preventInput = true
                    player.switchSprite('enterDoor')
                    return
                }
            }
            // only allows player to jump once
            if (player.velocity.y === 0) player.velocity.y = -25
            break
        case 'a':
            // moves player to the left
            keys.a.pressed = true
            break
        case 'd':
            //moves player to the right
            keys.d.pressed = true
            break
    }
})

// stops player once key is released
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})