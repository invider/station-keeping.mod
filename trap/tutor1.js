function tutor1() {
    lab.lockAll()
    env.tutorial = true

    const dock1 = lab.locateTag('D1')
    dock1.unlock()
    dock1.onUse = function() {
        this.lock()
        this.noblink()

        lab.titlebar.show('wait for a cargo ship docking', 0, env.style.statusBlink)
        lab.bar.show('and goods exchange',
            0, env.style.statusBlink, true)
    }
    dock1.onTrade = function() {
        this.onTrade = false
        this.onUse = false
        trap('tutor2')
    }
    dock1.blink(999)
    lab.bar.show('activate left docking port',
        0, env.style.statusBlink, true)
}
