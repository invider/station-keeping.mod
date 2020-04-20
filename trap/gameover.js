function gameover() {
    env.state = 'gameover'
    lab.control.player.releaseAll()

    function turnOff() {
        sfx.play('deviceOff', 1)
    }

    turnOff()
    setTimeout(turnOff, 600)
    setTimeout(turnOff, 800)
    setTimeout(turnOff, 1000)
}
