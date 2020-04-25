class StatusBar {
    constructor() {
        this.name = 'bar'
        this.timer = 0
        this.blinker = 0
    }

    keep(time) {
        this.timer = time
    }

    blink(time) {
        this.blinker = time
    }

    show(msg, time, blink) {
        msg = msg || ''
        time = time || 0
        blink = blink || 0

        env.status = msg
        this.timer = time
        this.blinker = blink
    }

    evo(dt) {
        this.blinker -= dt
        if (this.timer > 0) {
            this.timer -= dt
            if (this.timer < 0) {
                env.status = ''
            }
        }
    }

    draw() {
        if (!env.status) return
        if (this.blinker > 0 && this.blinker % 1 < .5) return

        baseBottom()
        alignLeft()
        font(env.style.font)
        fill(env.style.color.day)

        let x = env.style.edge
        let y = ry(1) - env.style.edge

        text(env.status, x, y)
    }
}
