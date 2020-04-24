function tutor2() {
    lab.lockAll()

    lab.locateTag('XP').unlock()

    const energyLocker = lab.locateTag('ES')
    energyLocker.unlock()
    energyLocker.onClose = function() {
        if (this.qty() > 2) {
            this.onClose = false
            trap('tutorEnd')
        }
    }
}
