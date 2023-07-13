//listens to keyboard events
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            // only allows player to jump once
            if (player.velocity.y === 0)
                player.velocity.y = -20
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