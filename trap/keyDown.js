function handleControl(e) {
    switch(e.code) {
        case 'Minus':
            //lab.world.zoomOut()
            break
        case 'Equal':
            //lab.world.zoomIn()
            break

        case 'KeyP':
            if (lab.paused) lab.resume()
            else lab.pause()
            break

        case 'F8':
            lib.img.screenshot('platformix')
            break
    }
}

function keyDown(e) {
    if (e.repeat) return

    const action = env.bind.keyMap[e.code]

    if (e.metaKey || e.altKey || e.ctrlKey) {
        // handleOpt(e)
        return
    }

    if (action) {
        if (lab.world && lab.world.paused) lab.world.paused = false
        lab.control.player.act(action.id, action.player)

    } else {
        handleControl(e)
    }
}
