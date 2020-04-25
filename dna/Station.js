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
        this.delta = {}
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

        // consume resource
        if (locker.extractResource()) {
            this.charger[type] = UNIT
            locker.blink()
            locker.showHint(`-1 ${type}`)
            sfx.play('noisy', 1)
        }
    }

    burn(type, dt) {
        this.control[type].burn(dt)
    }

    consume(type, volume, dt) {
        const prevVal = this[type]

        this.burn(type, dt)

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
            
            if (!this.charger[type] && chips >= env.tune.chipsToRecharge) {
                if (this[type] < .7) this.recharge(type)
            }
        }
        this.delta[type] = (this[type] - prevVal)/dt
    }
    
    isDepleting(type) {
        return (this[type] < .4 &&  this.delta[type] < 0)
    }

    isCritical(type) {
        const bt = env.tune.buzzThreshold
        return (this[type] < bt &&  this.delta[type] < 0)
    }

    evo(dt) {
        if (env.state !== 'play') return
        env.timer += dt
        env.day += dt/env.tune.dayLength

        this.consume('fuel', env.tune.consume.fuel*dt, dt)
        this.consume('life', env.tune.consume.life*dt*this.personal, dt)
        this.consume('energy', env.tune.consume.energy*dt, dt)
    }

}
