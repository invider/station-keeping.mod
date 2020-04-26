const df = {
    hidden: true,
    selected: 0,
    tw: 16,
    th: 16,
    gap: 2,
}

class ItemMenu {

    constructor(st) {
        this.cells = env.tune.maxStorage + 1
        augment(this, df)
        augment(this, st)
    }

    setKeeper(keeper) {
        this.keeper = keeper
        this.cells = this.keeper.capacity + 1
    }

    isFocused() {
        return this.target.focus === this
    }

    select(i) {
        if (i >= 0 && i <= this.cells) {
            this.selected = i
        }
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
        sfx.play('preselect', .6)
    }

    right() {
        this.selected ++
        if (this.selected >= this.cells) this.selected = 0
        sfx.play('preselect', .6)
    }

    up() {
        if (!this.locker) {
            this.target.swipeFocus(this.selected)
            sfx.play('preselect', .6)
        }
    }

    down() {
        if (this.locker) {
            this.target.swipeFocus(this.selected)
            sfx.play('preselect', .6)
        }
    }

    move() {
        const pod = this.getSelected()
        if (!pod) {
            this.target.hideItems()
            return
        }

        if (pod === 'close') {
            this.target.hideItems()

        } else {
            // got something to move
            const res = this.receiver.push(pod)

            if (res === 'moved') {
                this.keeper.items[this.selected] = false
                sfx.play('use', .8)

            } else if (isObj(res)) {
                this.keeper.items[this.selected] = res
                sfx.play('use', .8)

            } else {
                sfx.play('beep', .6)
            }
        }
    }

    push(pod) {
        if (this.keeper.guard && !this.keeper.guard(pod.type)) {
            return 'skiped'
        }
        // find an empty slot
        for (let i = 0; i < this.cells-1; i++) {
            const exist = this.keeper.items[i]
            if (!exist) {
                this.keeper.items[i] = pod
                return 'moved'
            }
        }
        // swap selected
        let i = this.selected
        if (i < 0 || i >= this.cells - 1) {
            i = 0
        }
        const extracted = this.keeper.items[i]
        this.keeper.items[i] = pod
        return extracted
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

    poke(x, y) {
        const lx = x - this.x + this.w/2
        const ly = y - this.y + this.h/2
        const i = floor(lx/(this.w/this.cells))

        if (!this.isFocused()) this.target.swipeFocus()
        this.selected = i
        if (this.getSelected()) {
            this.move()
        } else {
            sfx.play('use', .8)
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
        this.w = w
        this.h = h

        let y = -h/2
        let x = -w/2
        if (lab.cam.screenX(this.x + x) < 0) {
            x = lab.cam.worldX(0) - this.x
        } else if (lab.cam.screenX(this.x + x + w) > rx(1)) {
            x = lab.cam.worldX(rx(1)) - this.x - w
        }

        for (let i = 0; i < this.cells; i++) {

            fill(env.style.color.panel)
            rect(x, y, this.tw, this.th)

            if (focused && i === this.selected) {
                //stroke(.25, .5, .5)
                lineWidth(1)
                stroke(env.style.color.selection)
                rect(x, y, this.tw, this.th)
            } else {
                lineWidth(1)
                stroke(env.style.color.boundary)
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
        this.keeper.inUse = false
        this.hidden = true
        if (this.keeper.onClose) this.keeper.onClose()
    }

    show() {
        this.hidden = false
        this.keeper.inUse = true
        this.selected = 0
        sfx.play('open', .4)
    }
}
