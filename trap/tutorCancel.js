function tutorCancel() {
    if (env.tutorial) {
        trap('tutorEnd')
        lib.report.tutorialStep('X')
    }
}
