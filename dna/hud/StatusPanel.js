const BARS = 5

const df = {
    showText: true,
}

class StatusPanel {

    constructor() {
        augment(this, df)
    }

    drawBars(level, color, x, y) {
        const bars = (min(floor(level * BARS) + 1, BARS)
                        * (level? 1 : 0))

        const sec = env.timer%1
        if (bars <= 1 && ((sec > .25 && sec < .5) || (sec > .75))) return
        else if (bars === 2 && env.timer%1 > .5) return


        for (let i = 0; i < BARS-bars; i++) {
            lineWidth(1)
            stroke(color)
            rect(x, y, env.style.bar.width, env.style.bar.height)
            y += env.style.bar.height + env.style.bar.gap
        }

        for (let i = 0; i < bars; i++) {
            fill(color)
            rect(x, y, env.style.bar.width, env.style.bar.height)
            y += env.style.bar.height + env.style.bar.gap
        }
    }

    drawStatus() {
        const st = lab.station

        let x = rx(1) - env.style.edge - env.style.bar.width
        let y = env.style.edge
        this.drawBars(st.energy, env.style.color.energy, x, y)

        x -= env.style.bar.width + env.style.bar.margin
        this.drawBars(st.fuel, env.style.color.fuel, x, y)

        x -= env.style.bar.width + env.style.bar.margin
        this.drawBars(st.life, env.style.color.life, x, y)

        if (this.showText) {
            baseBottom()
            alignRight()
            font(env.style.font)

            y = ry(1) - env.style.edge
            let dy = -32
            x = rx(1)

            fill(env.style.color.energy)
            text('energy: ' + round(st.energy * 100) + '%', x, y)

            y += dy
            fill(env.style.color.fuel)
            text('fuel: ' + round(st.fuel * 100) + '%', x, y)

            y += dy
            fill(env.style.color.life)
            text('life: ' + round(st.life * 100) + '%', x, y)
        }
    }

    drawDay() {
        baseTop()
        alignLeft()
        font(env.style.font)
        fill(env.style.color.day)

        text('Day ' + floor(env.day), env.style.edge, env.style.edge)
    }

    drawDay() {
        baseTop()
        alignLeft()
        font(env.style.font)
        fill(env.style.color.day)

        text('Day ' + floor(env.day), env.style.edge, env.style.edge)
    }

    draw() {
        this.drawDay()
        this.drawStatus()
    }
}
