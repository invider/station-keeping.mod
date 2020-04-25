function handleControl(e) {
    switch(e.code) {
        case 'Minus':
            lab.cam.zoomIn()
            break
        case 'Equal':
            lab.cam.zoomOut()
            break

        case 'KeyP':
            if (lab.paused) lab.resume()
            else lab.pause()
            break

        case 'Escape':
            trap('tutorCancel')
            break

        case 'F8':
            lib.img.screenshot('station-keeping')
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
