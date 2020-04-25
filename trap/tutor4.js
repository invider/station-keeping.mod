function onSampleSwap() {
    // figure out that we actually swaped

    const dn2 = lab.locateTag('DN2')
    dn2.unlock()

    const vp = lab.locateTag('VP')
    vp.unlock()
    vp.blink()

    const dock2 = lab.locateTag('D2')
    dock2.unlock()
    dock2.onUse = function() {
        this.lock()
        this.noblink()
        lab.bar.show('wait for a cargo ship docking and goods exchange', 0, 5)
    }
    dock2.onTrade = function() {
        this.onTrade = false
        this.onUse = false
        trap('tutorEnd')
    }
}

function onFuelPickup() {
    if (this.qty() === 7) {
        // play wrong sfx
        sfx.play('beep', .5)
        return
    }
    this.lock()
    this.noblink()

    const vs = lab.locateTag('VS')
    vs.unlock()
    vs.blink(999)
    vs.onClose = onSampleSwap
}

function tutor4() {
    lab.lockAll()

    const a2 = lab.locateTag('A2')
    a2.unlock()
    a2.blink(999)
    a2.onClose = onFuelPickup

    lab.bar.show('station needs more fuel. Pick up a fuel cell at A2')
}
