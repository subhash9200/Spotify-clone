const music = document.querySelector(".audio")
let currentMusic = 0

const input = document.querySelector("#input-bar")
const songName = document.querySelector(".song-name")
const artistName = document.querySelector(".artist-name")
const currentTime = document.querySelector(".current-time")
const durationTime = document.querySelector(".duration-time")
const playBtn = document.querySelector(".play-btn")
const previous = document.querySelector(".previous")
const forward = document.querySelector(".forward")
const muteBtn = document.querySelector(".mute-btn")
const reset = document.querySelector(".reset")

playBtn.addEventListener('click', () => {

    if (playBtn.className.includes("pause")) {
        music.play();
        playBtn.classList.remove("pause")
        playBtn.src = 'images/pause.svg'
    }

    else {
        music.pause();
        playBtn.classList.add("pause")
        playBtn.src = 'images/play.svg'
    }
})

const setMusic = (i) => {
    input.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    currentTime.innerHTML = "00:00";
    setTimeout(() => {
        input.max = music.duration;
        durationTime.innerHTML = formatTime(music.duration);
    }, 300);
}
setMusic(1)

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = `0${min}`;
    }

    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`
}

setInterval(() => {
    input.value = music.currentTime
    currentTime.innerHTML = formatTime(music.currentTime)

}, 300)

input.addEventListener('change', () => {
    music.currentTime = input.value;
})


forward.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    }
    else {
        currentMusic++
    }
    setMusic(currentMusic);
    playBtn.classList.add("pause")
    playBtn.click();
})

previous.addEventListener('click', () => {
    if (currentMusic == 0) {
        currentMusic = songs.length - 1;
    }
    else {
        currentMusic--
    }
    setMusic(currentMusic)
    playBtn.classList.add("pause")
    playBtn.click();
})

reset.addEventListener('click', () => {
    setMusic(0)
    playBtn.classList.add("pause")
    playBtn.click()
})

muteBtn.addEventListener('click', () => {
    // Toggle the muted state of the audio
    music.muted = !music.muted;

    if (muteBtn.className.includes("mute-btn")) {

        muteBtn.classList.remove("mute-btn")
        muteBtn.src = "images/mute.svg"
    }
    else {
        muteBtn.classList.add("mute-btn")
        muteBtn.src = "images/unmute.svg"
    }
})

setInterval(() => {
    if (music.currentTime >= music.duration) {
        if (currentMusic == songs.length - 1) {
            // currentMusic = 0;
            playBtn.classList.add("pause")
            playBtn.src = 'images/play.svg'
        }

        else {
            currentMusic++
            setMusic(currentMusic);
            playBtn.classList.add("pause")
            playBtn.click();
        }
    }
}, 300)