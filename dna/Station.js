const UNIT = 1

const df = {
    name: 'station',
    fuel: UNIT,
    life: UNIT,
    energy: UNIT,
    personal: 0,
}

class Station {

    constructor(st) {
        this.charger = {}
        this.storage = {}
        this.control = {}
        this.port = []
        augment(this, df)
        augment(this, st)
    }

    registerHero(hero) {
        this.personal ++
    }

    recharge(type) {
        // find the resource pad if present in the locker
        const locker = this.storage[type]
        if (!locker) return

        if (locker.extractResource()) {
            log('recharging ' + type)
            this.charger[type] = UNIT
        }
    }

    consume(type, volume) {
        let chips = this.control[type].numberOf('chip')
        if (this.charger[type] && chips >= env.tune.chipsToRecharge) {
            const capacity = UNIT - this[type]
            const charge = min(volume, capacity)
            this[type] = min(this[type] + charge, UNIT)
            this.charger[type] -= volume + charge // consumption + charge

            if (this.charger[type] < 0) {
                this.charger[type] = 0
            }

        } else {
            this[type] = max(this[type] - volume, 0)
            
            if (!this.charger[type]) {
                if (this[type] < .7) this.recharge(type)
            }
        }
    }

    evo(dt) {
        env.timer += dt
        env.day += dt/env.tune.dayLength

        this.consume('fuel', env.tune.consume.fuel*dt)
        //this.fuel = max(this.fuel - fuel, 0)

        this.consume('life', env.tune.consume.life*dt*this.personal)
        //this.life = max(this.life - life, 0)

        this.consume('energy', env.tune.consume.energy*dt)
        //this.energy = max(this.energy - energy, 0)
    }

}
