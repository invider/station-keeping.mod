function onChipSwap() {
    if (this.numberOf('chip') < this.capacity) {
        // play wrong sfx
        sfx.play('beep', .5)
        return
    }
    this.lock()
    this.noblink()
    this.onClose = false

    trap('tutor4')
}

function onChipPickup() {
    if (this.qty() === 7) {
        // play wrong sfx
        sfx.play('beep', .5)
        return
    }
    this.lock()
    this.noblink()
    this.onClose = false

    const lc = lab.locateTag('LC')
    lc.unlock()
    lc.blink(999)
    lc.onClose = onChipSwap
    lab.bar.show('replace a broken chip in LC life support control')
}

function unlockB2() {
    const b2 = lab.locateTag('B2')
    b2.unlock()
    b2.blink(999)
    b2.onClose = onChipPickup

    lab.bar.show('pick up a spare chip from B2 locker')
}

function tutor3() {
    lab.lockAll()

    const lifeControl = lab.locateTag('LC')
    lifeControl.shortCircuit(5)

    lab.bar.show('a chip burned in life support control locker', 0, env.style.statusBlink)

    setTimeout(unlockB2, 5000)
}
