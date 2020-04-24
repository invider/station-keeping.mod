const BARS = 5

const df = {
    showText: true,
    alarmTimer: 0,
}

class StatusPanel {

    constructor() {
        augment(this, df)
    }

    alarm(dt) {
        this.alarmTimer -= dt
        if (this.alarmTimer < 0) {
            sfx.play('buzz', .5)
            this.alarmTimer = env.tune.alarmPeriod
        }
    }

    evo(dt) {
        if (env.state !== 'play') return

        const st = lab.station

        if (st.life === 0 || st.fuel === 0 || st.energy === 0) {
            trap('gameover')
        }

        const bt = env.tune.buzzThreshold
        if (st.life < bt || st.fuel < bt || st.energy < bt) {
            this.alarm(dt)
        }
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

        return bars
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

            fill(env.style.color.life)
            text('life support: ' + round(st.life * 100) + '%', x, y)

            y += dy
            fill(env.style.color.energy)
            text('energy: ' + round(st.energy * 100) + '%', x, y)

            y += dy
            fill(env.style.color.fuel)
            text('fuel: ' + round(st.fuel * 100) + '%', x, y)
        }
    }

    drawGameOver() {
        fill('#252525D0')
        rect(0, ry(.5)-150, rx(1), 300)

        const x = rx(.5)
        let y = ry(.5) - 80

        baseMiddle()
        alignCenter()
        font(env.style.titleFont)
        fill(env.style.color.fuel)

        text('Game Over', x, y)

        font(env.style.font)
        fill(env.style.color.life)

        y += 75
        text('Orbits: ' + floor(env.day), x, y)
        y += 28
        text('Docking Ops: ' + env.score.dockingOps, x, y)
        y += 28
        text('Cargo Loaded: ' + env.score.loaded, x, y)
        y += 28
        text('Cargo Shipped: ' + env.score.shipped, x, y)
    }

    draw() {
        this.drawStatus()
        if (env.state === 'gameover') this.drawGameOver()
    }
}
