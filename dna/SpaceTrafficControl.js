const df = {
    name: 'stc',
    nextTime: 0,
    tradeTimer: 0,
    resupplyTimer: 0,
    tradeTimer: 0,
}

class SpaceTrafficControl {

    constructor() {
        augment(this, df)
        this.supply = {
            'chip': RND(env.tune.maxStorage),
            'life': RND(env.tune.maxStorage),
            'fuel': RND(env.tune.maxStorage),
            'energy': RND(env.tune.maxStorage),
        }
        this.price = {}
        this.recalc()
    }

    totalSupply() {
        let total = 0
        for (let i = 0; i < env.tune.types.length; i++) {
            const t = env.tune.types[i]
            total += this.supply[t]
        }
        return total
    }

    recalc() {
        const total = this.totalSupply()
        const avg = total/env.tune.types.length

        // TODO include player offerings in the market calc
        for (let i = 0; i < env.tune.types.length; i++) {
            const t = env.tune.types[i]
            const qty = this.supply[t]
            if (qty === 0) this.price[t] = env.tune.ultimatePrice
            else this.price[t] = avg/qty
        }
    }

    resupply() {
        switch(RND(4)) {
            case 0: this.supply.chip = RND(env.tune.maxStorage); break;
            case 1: this.supply.life = RND(env.tune.maxStorage); break;
            case 2: this.supply.fuel = RND(env.tune.maxStorage); break;
            case 3: this.supply.energy = RND(env.tune.maxStorage); break;
        }
        this.recalc()

        this.resupplyTimer = env.tune.minResupply + RND(env.tune.deltaResupply)
    }

    tradeWithPort(port) {
        if (!port || port.state !== 'open') return

        // port offers
        const portValue = port.value()
        if (!portValue) return

        // port wants
        const qty = port.qty()
        if (!qty) return
        const type = port.type()
        if (!type) return
        const shipValue = this.price[type] * qty
        // ship offers
        const supply = this.supply[type]

        log('dock #' + port.port + ': ' + port.state)
        log('port offers: $' + portValue + ' of goods')
        log('port wants: $' + shipValue + ' of ' + type + '(' + qty + ')')

        if (supply < qty) {
            log('not enough goods, canceled')
            return
        }
        if (shipValue > portValue) {
            log('offered value is too low, canceled')
            return
        }

        log('seems to be good! Initiating docking')
        //port.trade(type, qty)
        port.tradeSequence(type, qty)
    }

    trade() {
        const stc = this
        lab.station.port.forEach(port => stc.tradeWithPort(port))

        this.tradeTimer = env.tune.minTradeDelay + RND(env.tune.deltaTradeDelay)
    }

    control() {
        this.resupplyTimer --
        if (this.resupplyTimer < 0) this.resupply()

        this.tradeTimer --
        if (this.tradeTimer < 0) this.trade()
    }

    evo(dt) {
        if (env.timer > this.nextTime) {
            this.nextTime = env.timer + 1
            this.control()
        }
    }

}
