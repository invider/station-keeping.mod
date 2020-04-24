function openEnergyLocker() {
    const energyLocker = lab.locateTag('ES')
    energyLocker.unlock()
    energyLocker.blink(999)
    energyLocker.onClose = function() {
        if (this.qty() > 2) {
            this.onClose = false
            trap('tutorEnd')
        }
    }
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

}
