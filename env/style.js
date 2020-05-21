const style = {
    background: "#080512",

    font: '32px coolville',
    //titleFont: '48px pixel-operator-mono8-bold',
    titleFont: '64px coolville',
    hintsFont: '12px coolville',
    tagFont: '8px coolville',

    blinkTime: 5,
    blinkScale: 5,
    statusBlink: 3,

    edge: 15,
    titlebarDY: 30,

    bar: {
        gap: 2,
        width: 40,
        height: 8,
        margin: 10,
    },

    color: {
        day: hsl(.12, .45, .45),
        chip: hsl(.9, .5, .55),
        life: hsl(.55, .45, .55),
        fuel: hsl(.01, .55, .45),
        energy: hsl(.18, .55, .55),
        any: hsl(.7, .05, .9),
        broken: hsl(.65, 0, .1),

        status: hsl(.12, .45, .45),
        panel: hsl(.6, .15, .55),
        boundary: hsl(.1, .2, .1),
        selection: hsl(.1, .6, .6),

        dude: [
            '#d9403b',
            '#3f89d9',
            '#e846e8',
            '#62d61e',

            '#e88b27',
            '#26ded5',
            '#8c3ade',
            '#90c9d6',

            '#ffffff',
        ]
    },

    locker: {
        indicator: {
            width: 2,
            height: 4,
            gap: 1,
        }
    },

    dockHintDY: -15,
    lockerHintDY: -25,
}
