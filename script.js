let audio_paused, track_number, btnPlay, audio, time, btnPrev, btnNext, logo, name, author, playPauseImage

let audioContext, audioAnalyser, audioContextSrc
const logos = [
    '17-zhelaniy.jpg',
    'scorpion.jpg',
    'loser.jpg',
    'drifting.jpg'
]
const names = [
    'Семнадцать желаний',
    'scorpion',
    'Loser',
    'DRIFTING'
]
const authors = [
    'saypink!',
    'f0lk',
    'Mushmellow',
    'NF'
]
const playlist = [
    'saypink!-Семнадцать желаний.mp3',
    'f0lk-scorpion.mp3',
    'mushmellow-loser.mp3',
    'NF-DRIFTING.mp3'
]

let waves = []
const NUM_OF_TRACKS = playlist.length

window.onload = function () {
    track_number = 0
    audio_paused = true
    audio = document.getElementById("audio")
    audio.src = 'resources/music/' + playlist[0]
    // Назначаем время песни ноль
    audio.currentTime = 0;
    time = document.querySelector(".time")
    btnPlay = document.querySelector(".play")
    btnPrev = document.querySelector(".prev")
    btnNext = document.querySelector(".next")
    logo = document.getElementById("logo")
    name = document.getElementById("name")
    author = document.getElementById("author")
    playPauseImage = document.getElementById("play-pause")
    for (let i = 0; i < 10; i++) {
        waves[i] = document.getElementById('wave' + i)
    }
    startConfig()
    setAudioContext()
}
function startConfig() {
    btnPlay.addEventListener('click', function() {
        console.log("play")
        if (audio_paused) {
            playPauseImage.src = 'resources/buttons/pause.png'
            audio_paused = false
            audio.play()
            audioPlay = setInterval(function () {

                let audioTime = Math.round(audio.currentTime)
                let audioLength = Math.round(audio.duration)

                time.style["width"] = audioTime * 100 / audioLength + "%"

                if (audioTime === audioLength) {
                    track_number++
                    switchTrack(track_number % NUM_OF_TRACKS)
                }
            }, 10)
        } else {
            playPauseImage.src = 'resources/buttons/play.png'
            audio_paused = true
            audio.pause()
            clearInterval(audioPlay)
        }
    })

    btnNext.addEventListener("click", function() {
        console.log("next")
        playPauseImage.src = 'resources/buttons/pause.png'
        audio_paused = false
        track_number++
        switchTrack(track_number % NUM_OF_TRACKS)
    })

    btnPrev.addEventListener("click", function() {
        playPauseImage.src = 'resources/buttons/pause.png'
        audio_paused = false
        track_number--
        if (track_number < 0) track_number = NUM_OF_TRACKS - 1
        switchTrack(track_number % NUM_OF_TRACKS)
    })
}
function switchTrack (track_num) {
    // Меняем значение атрибута src
    audio.src = 'resources/music/' + playlist[track_num]
    // Назначаем время песни ноль
    audio.currentTime = 0
    audio.play()

    logo.src = 'resources/music_logos/' + logos[track_num]
    name.textContent = names[track_num]
    author.textContent = authors[track_num]
}


let audioPlay = setInterval(function () {
    // Получаем значение на какой секунде песня
    let audioTime = Math.round(audio.currentTime);
    // Получаем всё время песни
    let audioLength = Math.round(audio.duration)

    time.style["width"] = audioTime * 100 / audioLength + "%"

    if (audioTime === audioLength) {
        track_number++
        switchTrack(track_number % NUM_OF_TRACKS)
    }
}, 10)

function setAudioContext() {

    audioContext = new AudioContext()

    audioContextSrc = audioContext.createMediaElementSource(audio)
    audioAnalyser = audioContext.createAnalyser()

    audioContextSrc.connect(audioAnalyser)
    audioAnalyser.connect(audioContext.destination)
    loop()
}

function loop() {
    window.requestAnimationFrame(loop)
    let array = new Uint8Array(audioAnalyser.frequencyBinCount)
    audioAnalyser.getByteFrequencyData(array)
    for (let i = 0; i < 10; i++) {
        waves[i].style.height = (array[i * 4] / 3) + "px"
    }
}





