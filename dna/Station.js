const df = {
    name: 'station',
    fuel: 1,
    life: 1,
    energy: 1,
    personal: 0,
}

class Station {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    registerHero(hero) {
        this.personal ++
    }

    evo(dt) {
        env.day += dt/env.tune.dayLength

        this.fuel = max(this.fuel - env.tune.consume.fuel*dt, 0)
        this.life = max(this.life - env.tune.consume.life*dt*this.personal, 0)
        this.energy = max(this.energy - env.tune.consume.energy*dt, 0)
    }

}
