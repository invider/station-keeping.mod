function tutorEnd() {
    lib.report.tutorialStep('E')
    lab.cam._ls.forEach(e => {
        if (e.onUse) e.onUse = false
        if (e.onClose) e.onClose = false
        if (e.onTrade) e.onTrade = false
    })
    lab.unlockAll()
    lab.blinkAll()
    env.tutorial = false

    // restore supply and burn rate
    lab.stc.resupply = lab.stc.resupplyBak
    env.tune.chipBurnRate = env.tune.chipBurnRateBak

    lab.titlebar.show('Station controls unlocked',
        10, env.style.statusBlink)
    lab.bar.show('Keep the station alive!',
        10, env.style.statusBlink, true)
}
