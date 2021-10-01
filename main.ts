input.onButtonPressed(Button.A, function () {
    Fahren = true
})
input.onButtonPressed(Button.B, function () {
    Fahren = false
    led.unplot(LedX, LedY)
})
let Richtung = 0
let Geschwindigkeit = 0
let NeigungY = 0
let NeigungX = 0
let LedY = 0
let LedX = 0
let Fahren = false
let Empfindlichkeit = 45
radio.setGroup(1)
basic.forever(function () {
    if (Fahren) {
        NeigungX = input.rotation(Rotation.Roll)
        NeigungY = input.rotation(Rotation.Pitch)
        NeigungX = Math.constrain(NeigungX, Empfindlichkeit * -1, Empfindlichkeit)
        NeigungY = Math.constrain(NeigungY, Empfindlichkeit * -1, Empfindlichkeit)
        led.unplot(LedX, LedY)
        LedX = Math.map(NeigungX, Empfindlichkeit * -1, Empfindlichkeit, 0, 4)
        LedY = Math.map(NeigungY, Empfindlichkeit * -1, Empfindlichkeit, 0, 4)
        led.plot(LedX, LedY)
        Geschwindigkeit = 100 - Math.map(NeigungY, Empfindlichkeit * -1, Empfindlichkeit, 0, 100)
        Richtung = Math.map(NeigungX, Empfindlichkeit * -1, Empfindlichkeit, 0, 100)
        radio.sendValue("G", Geschwindigkeit)
        radio.sendValue("R", Richtung)
        basic.pause(50)
    }
})
