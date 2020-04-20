function gameover() {
    env.state = 'gameover'

    function turnOff() {
        sfx.play('deviceOff', 1)
    }

    turnOff()
    setTimeout(turnOff, 600)
    setTimeout(turnOff, 800)
    setTimeout(turnOff, 1000)
    /*
    for (let i = 0; i < 10; i++) {
        setTimeout(turnOff, 500 + RND(5000))
    }
    */
}
