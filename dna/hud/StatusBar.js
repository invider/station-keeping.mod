class StatusBar {
    constructor(st) {
        this.name = 'bar'
        this.timer = 0
        this.blinker = 0
        this.dy = -env.style.edge
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
        if (!this.msg) return
        if (this.blinker > 0 && this.blinker % 1 < .5) return

        baseBottom()
        alignLeft()
        font(env.style.font)
        fill(env.style.color.day)

        let x = env.style.edge
        let y = ry(1) + this.dy

        text(this.msg, x, y)
    }
}
