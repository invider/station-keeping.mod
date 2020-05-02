function onRefuel() {
    if (this.qty < 3) {
        sfx.play('cancel', .5)
        return
    }
    this.lock()
    this.noblink()
    this.onClose = false

    lib.report.tutorialStep('V')
    trap('tutorEnd')
}

function onFuelPickup() {
    if (this.qty() > 0) {
        // play wrong sfx
        sfx.play('cancel', .5)
        return
    }
    this.lock()
    this.noblink()
    this.onClose = false

    const fs = lab.locateTag('FS')
    fs.unlock()
    fs.blink(999)
    fs.onClose = onRefuel
}

function tutor5() {
    lib.report.tutorialStep(5)
    lab.lockAll()

    const vp = lab.locateTag('VP')
    vp.unlock()
    vp.blink(999)
    vp.onClose = onFuelPickup

    lab.titlebar.show('Resupply fuel storage', 0, env.style.statusBlink)
    lab.bar.show('Move fuel from VP to FS locker', 0, env.style.statusBlink)
}
