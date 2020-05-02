const SESSION = 1
const TUTORIAL_STEP = 5
const GAMEOVER = 3


function send(type, payload) {
    trap('report', {
        y: type,
        z: payload,
    })
}

function at(type, payload) {
    payload.push( floor(env.timer) )
    send(type, payload)
}

function tutorialStep(step) {
    at(TUTORIAL_STEP, [ step ])
}

function gameover(score) {
    at(GAMEOVER, [ score ])
}
