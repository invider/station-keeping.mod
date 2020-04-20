const df = {
    name: 'stc',
    nextTime: 0,
    resupplyTimer: 0,
}

class SpaceTrafficControl {

    constructor() {
        augment(this, df)
        this.cargo = {
            'chip': RND(env.tune.maxStorage),
            'life': RND(env.tune.maxStorage),
            'fuel': RND(env.tune.maxStorage),
            'energy': RND(env.tune.maxStorage),
        }
    }

    resupply() {
        this.resupplyTimer = env.tune.minResupply + RND(env.tune.deltaResupply)
        log('next resupply @' + this.resupplyTimer)
    }

    control() {
        this.resupplyTimer --
        if (this.resupplyTimer < 0) this.resupply()
    }

    evo(dt) {
        if (env.timer > this.nextTime) {
            this.nextTime = env.timer + 1
            this.control()
        }
    }

}