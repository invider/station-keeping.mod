class StatusBar {
    constructor(st) {
        this.name = 'bar'
        this.timer = 0
        this.blinker = 0
        this.dy = -env.style.edge
        this.msg = false
        this.hint = false
        augment(this, st)
    }

    keep(time) {
        this.timer = time
    }

    blink(time) {
        this.blinker = time
    }

    show(msg, time, blink, notify) {
        msg = msg || ''
        time = time || 0
        blink = blink || 0

        this.msg = msg
        this.timer = time
        this.blinker = blink
        if (notify) sfx.play('message', .5)
    }

    showHint(msg) {
        this.hint = msg
    }

    evo(dt) {
        this.blinker -= dt
        if (this.timer > 0) {
            this.timer -= dt
            if (this.timer < 0) {
                this.msg = ''
            }
        }
    }

    draw() {
        const msg = this.msg || this.hint
        if (!msg) return
        if (this.blinker > 0 && this.blinker % 1 < .5) return

        baseBottom()
        alignLeft()
        font(env.style.font)
        fill(env.style.color.day)

        let x = env.style.edge
        let y = ry(1) + this.dy

        text(msg, x, y)
    }
}
