function tutorEnd() {
    lab.unlockAll()
    lab.blinkAll()

    // restore supply and burn rate
    lab.stc.resupply = lab.stc.resupplyBak
    env.tune.chipBurnRate = env.tune.chipBurnRateBak

    lab.bar.show('station controls unlocked. Keep the station alive!', 10, env.style.statusBlink)
}
