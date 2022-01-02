grovevoicerecognizer.startListenVoiceRecognizer(VoiceType.Right, function () {
    Fahren = true
    basic.setLedColor(0x007fff)
})
grovevoicerecognizer.startListenVoiceRecognizer(VoiceType.Go, function () {
    Fahren = true
    basic.setLedColor(0x00ff00)
})
grovevoicerecognizer.startListenVoiceRecognizer(VoiceType.Stop, function () {
    Fahren = false
    basic.setLedColor(0xff0000)
})
input.onButtonPressed(Button.B, function () {
    Fahren = false
    led.unplot(LedX, LedY)
    basic.turnRgbLedOff()
})
grovevoicerecognizer.startListenVoiceRecognizer(VoiceType.Left, function () {
    Fahren = true
    basic.setLedColor(0xffff00)
})
let Richtung = 0
let Geschwindigkeit = 0
let NeigungY = 0
let NeigungX = 0
let LedY = 0
let LedX = 0
let Fahren = false
let temp = 0
let Empfangen = 0
let Empfindlichkeit = 45
radio.setGroup(1)
grovevoicerecognizer.createVoiceRecognizer(SerialPin.C17, SerialPin.C16)
Fahren = false
basic.forever(function () {
    if (Fahren) {
        let Empfindlichkeit2 = 0
        NeigungX = input.rotation(Rotation.Roll)
        NeigungY = input.rotation(Rotation.Pitch)
        NeigungX = Math.constrain(NeigungX, Empfindlichkeit2 * -1, Empfindlichkeit2)
        NeigungY = Math.constrain(NeigungY, Empfindlichkeit2 * -1, Empfindlichkeit2)
        led.unplot(LedX, LedY)
        LedX = Math.map(NeigungX, Empfindlichkeit2 * -1, Empfindlichkeit2, 0, 4)
        LedY = Math.map(NeigungY, Empfindlichkeit2 * -1, Empfindlichkeit2, 0, 4)
        led.plot(LedX, LedY)
        Geschwindigkeit = 100 - Math.map(NeigungY, Empfindlichkeit2 * -1, Empfindlichkeit2, 0, 100)
        Richtung = Math.map(NeigungX, Empfindlichkeit2 * -1, Empfindlichkeit2, 0, 100)
        radio.sendValue("G", Geschwindigkeit)
        radio.sendValue("R", Richtung)
        basic.pause(50)
    }
})
