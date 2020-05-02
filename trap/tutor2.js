function openEnergyLocker() {
    lib.report.tutorialStep(2)
    const energyLocker = lab.locateTag('ES')
    energyLocker.unlock()
    energyLocker.blink(999)
    energyLocker.onClose = function() {
        if (this.qty() < 3) {
            sfx.play('cancel', .5)
            return 
        }
        this.onClose = false
        this.noblink()
        trap('tutor3')
    }
    lab.bar.show('move energy cells to ES energy storage locker',
        0, env.style.statusBlink, true)
}

function tutor2() {
    lab.lockAll()

    const xp = lab.locateTag('XP')
    xp.unlock()
    xp.blink(999)
    xp.onClose = function() {
        if (this.qty() > 0) {
            sfx.play('cancel', .5)
            return
        }
        this.lock()
        this.noblink()
        this.onClose = false
        openEnergyLocker()
    }

    lab.titlebar.show('')
    lab.bar.show('pick up all energy cells from XP locker',
        0, env.style.statusBlink, true)
}
