const tune = {
    dayLength: 30,
    alarmPeriod: 1,
    buzzThreshold: .2,

    // platform dynamics
    gravity: 120,
    jump: 5,
    jetpackFq: .3,
    slide: 150,
    maxSlide: 150,
    friction: 25,
    airFriction: 5,

    // systems
    maxStorage: 7,
    maxSupply: 15,
    consume: {
        life:   .004,
        fuel:   .007,
        energy: .003,
    },
    consumptionIncrease: 1.01, // increase factor for one orbit
    chipsToRecharge: 4,
    chipBurnRate: .005,

    stayDocked: 5,
    dockingSpeed: 50, // initial demo docking speed
    realDockingSpeed: 10,
    dockingBuzzPeriod: 1,

    // economy
    resupplyNextOrbit: 2,
    minTradeDelay: 5,
    deltaTradeDelay: 5,
    wasteDisposalCost: .25,

    types: [
        'chip',
        'life',
        'fuel',
        'energy',
    ],
    ultimatePrice: 7, // price for missing resources

    zoomSpeed: .1,
}
