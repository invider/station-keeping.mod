const df = {
    hidden: true,
    selected: 0,
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

    getSelected() {
        if (this.selected === this.cells - 1) return 'close'
        return this.keeper.items[this.selected]
    }

    getItemType(i) {
        if (i === this.cells - 1) return 'close'
        const pod = this.keeper.items[i]
        if (pod) return pod.type
    }

    left() {
        this.selected --
        if (this.selected < 0) this.selected = this.cells - 1
    }

    right() {
        this.selected ++
        if (this.selected >= this.cells) this.selected = 0
    }

    up() {
        if (!this.locker) this.target.swipeFocus()
    }

    down() {
        if (this.locker) this.target.swipeFocus()
    }

    move() {
        const pod = this.getSelected()
        if (!pod) return

        if (pod === 'close') {

            this.target.hideItems()
        } else {
            const pod = this.getSelected()

            if (pod) {
                // got something to move
                if (this.receiver.push(pod)) {
                    this.keeper.items[this.selected] = false
                }
            } else {
                // TODO cancel sfx
            }
        }
    }

    push(pod) {
        // find an empty slot
        for (let i = 0; i < this.cells-1; i++) {
            const exist = this.keeper.items[i]
            if (!exist) {
                this.keeper.items[i] = pod
                return true
            }
        }
        return false
    }

    activate(action) {
        switch(action) {
            case 1: this.up(); break;
            case 2: this.left(); break;
            case 3: this.down(); break;
            case 4: this.right(); break;

            case 5:
            case 7:
                this.move()
                break

            case 6:
            case 8:
                this.target.hideItems()
                break
        }
    }

    fixOnTarget() {
        this.x = this.target.x + this.dx
        this.y = this.target.y + this.dy
    }

    draw() {
        if (!this.target || !this.keeper) return
        this.fixOnTarget()
        const focused = this === this.target.focus

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

        for (let i = 0; i < this.cells; i++) {

            fill(.1, .05, .2)
            rect(x, y, this.tw, this.th)
            if (focused && i === this.selected) {
                lineWidth(1)
                stroke(.25, .5, .5)
                rect(x, y, this.tw, this.th)
            }

            const type = this.getItemType(i)
            if (type) {
                image(res.pod[type], x+1, y+1, this.tw-2, this.th-2)
            }

            x += this.tw + this.gap
        }

        restore()
    }

    hide() {
        this.hidden = true
    }

    show() {
        this.hidden = false
        this.selected = 0
    }
}
