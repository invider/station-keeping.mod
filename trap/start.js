function start() {
    env.timer = 0
    env.day = 1
    env.state = 'play'

    lib.gen.station()

    // set port 2 trade control to 1
    lab.locateTag('DN2').qty = 1

    // suppress supply change until tutorial is done
    lab.stc.resupplyBak = lab.stc.resupply
    lab.stc.resupply = () => {}
    // suppress chip burns
    env.tune.chipBurnRateBak = env.tune.chipBurnRate
    env.tune.chipBurnRate = 0
}
