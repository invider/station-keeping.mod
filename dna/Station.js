const df = {
    name: 'station',
    fuel: 1,
    life: 1,
    energy: 1,
    personal: 0,
}

class Station {

    constructor(st) {
        this.charger = {}
        augment(this, df)
        augment(this, st)

        this.charger.life = 1
    }

    registerHero(hero) {
        this.personal ++
    }

    recharge(name) {
        // find the resource pad if present in the locker
    }

    consume(name, volume) {
        if (this.charger[name]) {
            const capacity = 1 - this[name]
            const charge = min(volume, capacity)
            this[name] = min(this[name] + charge, 1)
            this.charger[name] -= volume + charge // consumption + charge
            if (this.charger[name] < 0) this.charger[name] = 0
        } else {
            this[name] = max(this[name] - volume, 0)
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
