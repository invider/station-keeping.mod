class StatusBar {
    constructor() {
        this.name = 'statusBar'
    }

    draw() {
        if (!env.status) return

        baseBottom()
        alignLeft()
        font(env.style.font)
        fill(env.style.color.day)

        let x = env.style.edge
        let y = ry(1) - env.style.edge

        text(env.status, x, y)
    }
}
