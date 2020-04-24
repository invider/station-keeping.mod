function tutor1() {
    lab.lockAll()

    // suppress supply change for now
    lab.stc.resupplyBak = lab.stc.resupply
    lab.stc.resupply = () => {}

    const dock1 = lab.locateTag('D1')
    dock1.unlock()
    dock1.onUse = function() {
        this.lock()
    }
    dock1.onTrade = function() {
        this.onTrade = false
        this.onUse = false
        trap('tutor2')
    }
}
