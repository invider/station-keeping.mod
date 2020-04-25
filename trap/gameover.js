function gameover() {
    env.state = 'gameover'
    lab.control.player.releaseAll()

    sfx.play('powerDown', 1)

    setTimeout(() => lib.tfx.roll(env.credits), 5000)
}
