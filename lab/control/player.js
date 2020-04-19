const ON = 1
const OFF = 0

const ctrl = []

const targetMap = []

function bind(playerId, target) {
    target.player = playerId + 1

    targetMap[playerId] = target
    if (!ctrl[playerId]) ctrl[playerId] = []
}

function release(playerId) {
    const target = targetMap[playerId]
    if (target) {
        target.playerId = 0
        targetMap[playerId] = false
    }
}

function target(playerId) {
    if (!playerId) playerId = 0
    return targetMap[playerId]
}

function act(action, playerId) {
    if (!playerId) playerId = 0

    const target = targetMap[playerId]
    if (!target) {
        // spawn playerId
        const nextPlayer = lib.gen.player(playerId)
        this.bind(playerId, nextPlayer)
    }

    if (ctrl[playerId] && !ctrl[playerId][action]) {
        ctrl[playerId][action] = ON
        if (target && target.activate) {
            target.activate(action + 1)
        }
    }
}

function stop(action, playerId) {
    if (!playerId) playerId = 0

    if (ctrl[playerId]) {
        if (ctrl[playerId][action]) {
            const target = targetMap[playerId]
            if (target && target.deactivate) {
                target.deactivate(action + 1)
            }
        }
        ctrl[playerId][action] = OFF
    }
}

function evo(dt) {
    for (let p = 0; p < ctrl.length; p++) {
        const playerCtrl = ctrl[p]
        if (!playerCtrl) continue

        for (let a = 0; a < playerCtrl.length; a++) {
            if (ctrl[p][a]) {
                const target = targetMap[p]
                if (target && target.act) target.act(a + 1, dt)
            }
        }
    }
}
