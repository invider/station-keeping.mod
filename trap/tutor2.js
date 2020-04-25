function openEnergyLocker() {
    const energyLocker = lab.locateTag('ES')
    energyLocker.unlock()
    energyLocker.blink(999)
    energyLocker.onClose = function() {
        if (this.qty() > 2) {
            this.onClose = false
            this.noblink()
            trap('tutor3')
        }
    }
    lab.bar.show('move energy cells to ES energy storage locker', 0, env.style.statusBlink)
}

function tutor2() {
    lab.lockAll()

    const xp = lab.locateTag('XP')
    xp.unlock()
    xp.blink(999)
    xp.onClose = function() {
        if (this.qty() === 0) {
            this.lock()
            this.noblink()
            this.onClose = false
            openEnergyLocker()
        }
    }
    lab.bar.show('pick up all energy cells from XP locker', 0, env.style.statusBlink)
}
