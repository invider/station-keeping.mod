function tutorCancel() {
    lib.report.tutorialStep('X')
    if (env.tutorial) trap('tutorEnd')
}
