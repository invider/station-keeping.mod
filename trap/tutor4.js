function onCargoClose() {
    if (this.numberOf('life') < 1) {
        // play wrong sfx
        sfx.play('cancel', .5)
        return
    }

    this.lock()
    this.noblink()
    this.onClose = false

    const dock2 = lab.locateTag('D2')
    dock2.unlock()
    dock2.blink(999)

    dock2.onUse = function() {
        this.lock()
        this.noblink()
        lab.bar.show('wait for a cargo ship docking',
            0, env.style.statusBlink, true)
    }

    dock2.onTrade = function() {
        this.onTrade = false
        this.onUse = false
        trap('tutor5')
    }

    lab.titlebar.show('')
    lab.bar.show(
        'Send docking request',
        0, env.style.statusBlink, true)
}

function onTradeControlUse() {
    if (this.qty !== 3) {
        return
    }
    this.lock()
    this.noblink()
    this.onUse = false

    const vp = lab.locateTag('VP')
    vp.unlock()
    vp.blink(999)
    vp.onClose = onCargoClose

    lab.titlebar.show(
        'Place goods for exchange in VP locker',
        0, env.style.statusBlink)
    lab.bar.show('One life support pod will suffice',
        0, env.style.statusBlink, true)
}

function onSampleSwap() {
    if (this.items[0].type !== 'fuel') {
        sfx.play('cancel', .5)
        return
    }
    this.lock()
    this.noblink()
    this.onClose = false

    const dn2 = lab.locateTag('DN2')
    dn2.unlock()
    dn2.blink(999)
    dn2.onUse = onTradeControlUse

    lab.titlebar.show(
        'Pick the number of items you need',
        0, env.style.statusBlink)
    lab.bar.show(
        'Select 3 bars on trade control panel',
        0, env.style.statusBlink, true)
}

function onFuelPickup() {
    if (this.numberOf('fuel') >= 2) {
        // play wrong sfx
        sfx.play('cancel', .5)
        return
    }
    this.lock()
    this.noblink()
    this.onClose = false

    const vs = lab.locateTag('VS')
    vs.unlock()
    vs.blink(999)
    vs.onClose = onSampleSwap

    lab.titlebar.show('A sample shows your need',
        0, env.style.statusBlink)
    lab.bar.show('Place the fuel in VS sample locker',
        0, env.style.statusBlink, true)
}

function tutor4() {
    lab.lockAll()

    const a2 = lab.locateTag('A2')
    a2.unlock()
    a2.blink(999)
    a2.onClose = onFuelPickup

    lab.titlebar.show('station needs more fuel.',
        0, env.style.statusBlink)
    lab.bar.show('Pick up a fuel cell at A2',
        0, env.style.statusBlink, true)
}
