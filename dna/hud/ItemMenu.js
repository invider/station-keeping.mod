const df = {
    hidden: false,
    cells: 7,
    tw: 16,
    th: 16,
    gap: 2,
}

class ItemMenu {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    fixOnTarget() {
        this.x = this.target.x
        this.y = this.target.y - 20
    }

    draw() {
        this.fixOnTarget()

        save()
        translate(this.x, this.y)

        const w = (this.cells*this.tw) + (this.cells - 1)*this.gap
        const h = this.th

        let y = -h/2
        let x = -w/2
        if (lab.cam.screenX(this.x + x) < 0) {
            x = lab.cam.worldX(0) - this.x
        } else if (lab.cam.screenX(this.x + x + w) > rx(1)) {
            x = lab.cam.worldX(rx(1)) - this.x - w
        }

        lineWidth(1)
        stroke(.19, .5, .5)
        for (let i = 0; i < this.cells; i++) {
            rect(x, y, this.tw, this.th)
            image(res.pod.chipX, x+1, y+1, this.tw-2, this.th-2)
            x += this.tw + this.gap
        }

        restore()
    }

    hide() {
        this.hidden = true
    }

    show() {
        this.hidden = false
    }
}
