const keyboard = [
    [ 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyE', 'KeyQ', 'Space', 'Escape', 'KeyZ' ],
    [ 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
        'PageDown', 'PageUp', 'ShiftRight', 'End', 'Insert' ],
    [ 'KeyK', 'KeyH', 'KeyJ', 'KeyL',
        'BracketRight', 'BracketLeft', 'Enter', 'Backspace', 'Backslash' ],
]

const keyMap = {}

const padMap = [
    [12, 14, 13, 15, 1, 3, 0, 2, 8],
    [12, 14, 13, 15, 1, 3, 0, 2, 8],
    [12, 14, 13, 15, 1, 3, 0, 2, 8],
    [12, 14, 13, 15, 1, 3, 0, 2, 8],
]

function indexKeys() {
    for (let p = 0; p < keyboard.length; p++) {
        const actions = keyboard[p]
        for (let a = 0; a < actions.length; a++) {
            const key = actions[a]
            keyMap[key] = {
                id: a,
                player: p,
            }
        }
    }
}

function init() {
    indexKeys()
}
