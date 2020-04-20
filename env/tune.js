const tune = {
    dayLength: 30,
    gravity: 400,
    jump: 5,
    slide: 100,
    maxSlide: 150,
    friction: 11,

    maxStorage: 7,
    consume: {
        life:   .01,
        fuel:   .01,
        energy: .001,
    },

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
    ultimatePrice: 7, // price for missing resources

    zoomSpeed: .1,
}
