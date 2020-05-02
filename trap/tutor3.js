function onChipSwap() {
    if (this.numberOf('chip') < this.capacity) {
        // play wrong sfx
        sfx.play('cancel', .5)
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
        sfx.play('cancel', .5)
        return
    }
    this.lock()
    this.noblink()
    this.onClose = false

    const lc = lab.locateTag('LC')
    lc.unlock()
    lc.blink(999)
    lc.onClose = onChipSwap
    lab.bar.show('replace a broken chip in life support',
        0, env.style.statusBlink, true)
}

function unlockB2() {
    const b2 = lab.locateTag('B2')
    b2.unlock()
    b2.blink(999)
    b2.onClose = onChipPickup

    lab.bar.show('pick up a spare chip from B2 locker',
        0, env.style.statusBlink, true)
}

function burnChipNotification() {
    lab.titlebar.show('a chip burned in life support control',
        0, env.style.statusBlink, true)
    lab.bar.show('   ')
    setTimeout(unlockB2, 3000)
}

function burnChip() {
    const lifeControl = lab.locateTag('LC')
    lifeControl.shortCircuit(5)
    setTimeout(burnChipNotification, 1000)
}

function tutor3() {
    lib.report.tutorialStep(3)
    lab.lockAll()
    lab.titlebar.show('')
    lab.bar.show('   ')
    setTimeout(burnChip, 2000)
}
