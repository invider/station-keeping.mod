
function handleControl(e) {
    switch(e.code) {
        case 'Minus':
            lab.cam.zoomStop()
            break
        case 'Equal':
            lab.cam.zoomStop()
            break
    }
}

function keyUp(e) {
    const action = env.bind.keyMap[e.code]
    if (!e.metaKey && !e.altKey && !e.ctrlKey) {

        if (action) lab.control.player.stop(action.id, action.player)
        else handleControl(e)
    }
}
