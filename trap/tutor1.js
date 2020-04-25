function tutor1() {
    lab.lockAll()

    const dock1 = lab.locateTag('D1')
    dock1.unlock()
    dock1.onUse = function() {
        this.lock()
        this.noblink()
        lab.bar.show('wait for a cargo ship docking and goods exchange', 0, 5)
    }
    dock1.onTrade = function() {
        this.onTrade = false
        this.onUse = false
        trap('tutor2')
    }
    dock1.blink(999)
    lab.bar.show('activate left docking port', 0, env.style.statusBlink)
}
