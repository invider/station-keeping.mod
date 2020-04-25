function tutorEnd() {
    lab.unlockAll()
    lab.blinkAll()
    lab.stc.resupply = lab.stc.resupplyBak
    lab.bar.show('station controls unlocked. Keep the station alive!', 10, env.style.statusBlink)
}
