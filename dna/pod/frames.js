const START = 0
const END = 1
const PERIOD = 2

const cycles = {
    idle: [0, 3, .15],
    jump: [0, 0, 0],
    run: [4, 5, .2],
}

function setFrames(f) {
    this.frame = 0
    this.frames = f

    this.timer = 0
    this.cycle = cycles.idle
}

function setCycle(name) {
    const next = cycles[name]
    if (!next) return

    if (this.cycle !== next) {
        this.cycle = next
        this.frame = next[START]
    }
}

function evo(dt) {
    const period = this.cycle[PERIOD]

    this.timer += dt
    if (period > 0 && this.timer >= period) {
        this.timer -= period
        this.frame ++
        if (this.frame > this.cycle[END]) {
            this.frame = this.cycle[START]
        }
    }
}

function getSprite() {
    return this.frames[this.frame]
}
