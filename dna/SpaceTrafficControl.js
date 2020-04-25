const df = {
    name: 'stc',
    nextTime: 0,
    tradeTimer: 0,
    lastOrbitResupply: 0,
    tradeTimer: 0,
}

class SpaceTrafficControl {

    constructor() {
        augment(this, df)

        this.gen = lib.math.createRandomGenerator()
        this.gen.setSeed(24)

        this.supply = {
            'chip': this.gen.rndi(env.tune.maxSuppy),
            'life': this.gen.rndi(env.tune.maxSupply),
            'fuel': this.gen.rndi(env.tune.maxSupply),
            'energy': this.gen.rndi(env.tune.maxSupply),
        }
        this.price = {}
        this.recalc()
    }

    getPrice(type) {
        return this.price[type] || 0
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

    resupplyRandomResource() {
        const rndi = this.gen.rndi

        switch(rndi(4)) {
            case 0: this.supply.chip = rndi(env.tune.maxSupply-2); break;
            case 1: this.supply.life = rndi(env.tune.maxSupply); break;
            case 2: this.supply.fuel = rndi(env.tune.maxSupply); break;
            case 3: this.supply.energy = rndi(env.tune.maxSupply-4); break;
        }

        const s = this.supply
    }

    resupply() {
        for (let i = 0; i < 2; i++) this.resupplyRandomResource()
        this.recalc()
    }

    tradeWithPort(port) {
        if (!port || port.state !== 'open') return

        // port offers
        const portValue = ceil(port.value())
        if (!portValue) return

        // port wants
        const qty = port.qty()
        if (!qty) return
        const type = port.type()
        if (!type) return
        const incomeValue = floor(this.getPrice(type) * qty)
        // ship offers
        const supply = this.supply[type]

        log('dock #' + port.port + ': ' + port.state)
        log('port offers: $' + portValue + ' of goods')
        log('port wants: $' + incomeValue + ' of ' + type + '(' + qty + ')')

        if (!env.endlessSupply) {
            if (supply < qty) {
                log('not enough goods in orbit...')
                return
            }
            if (incomeValue > portValue) {
                log('offered value is too low...')
                return
            }
        }

        log(`port #${port.port}: shipment of ${type}(${qty})`)
        port.tradeSequence(type, qty)
        return true
    }

    trade() {
        this.tradeTimer = env.tune.minTradeDelay + RND(env.tune.deltaTradeDelay)

        for (let i = 0; i < lab.station.port.length; i++) {
            const port = lab.station.port[i]
            if (this.tradeWithPort(port)) return
        }
    }

    control() {
        this.tradeTimer --
        if (this.tradeTimer < 0) this.trade()
    }

    evo(dt) {
        const orbit = floor(env.day)
        if (orbit > this.lastOrbitResupply) {
            this.resupply()
            this.lastOrbitResupply = orbit
        }

        if (env.timer > this.nextTime) {
            this.nextTime = env.timer + 1
            this.control()
        }
    }
}
