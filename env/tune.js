const tune = {
    dayLength: 30,

    // platform dynamics
    gravity: 400,
    jump: 5,
    slide: 100,
    maxSlide: 150,
    friction: 15,

    // systems
    maxStorage: 7,
    consume: {
        life:   .005,
        fuel:   .005,
        energy: .002,
    },
    chipsToRecharge: 4,
    chipBurnRate: .001,

    stayDocked: 5,

    // economy
    minResupply: 5,
    deltaResupply: 5,
    minTradeDelay: 5,
    deltaTradeDelay: 5,

    types: [
        'chip',
        'life',
        'fuel',
        'energy',
    ],
    ultimatePrice: 5, // price for missing resources

    zoomSpeed: .1,
}
