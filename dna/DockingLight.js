const df = {
    w: 8,
    h: 8,
}

class DockingLight {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    draw() {
        if (this.dock.state === 'open'
                || (this.dock.state === 'docking' && env.timer%1 > .5)) {
            const img = res.stars.green
            image(img, this.x - this.w/2, this.y - this.h/2, this.w, this.h)
        }
    }
}
