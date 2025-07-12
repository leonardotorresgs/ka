let count = 1;

document.getElementById('radio1').checked = true;

setInterval(function(){
    nextImage();
}, 3000)

function nextImage(){
    count++;
    if(count > 10){
        count = 1;
    }

    document.getElementById('radio'+count).checked = true;
}

const player = document.querySelector('#player');
const playPauseButton = document.querySelector('#playPauseButton');
const currentTime = document.querySelector('#currentTime');
const duration = document.querySelector('#duration');
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');
const textButtonPlay = "<i class='fa-solid fa-circle-pause'></i>";
const textButtonPause = "<i class='fa-solid fa-circle-play'></i>";

playPauseButton.onclick = () => playPause();

const playPause = () => {
    if (player.paused) {
        player.play();
        playPauseButton.innerHTML = textButtonPlay;
    } else {
        player.pause();
        playPauseButton.innerHTML = textButtonPause;
    }
};

prevButton.onclick = () => {
    player.currentTime -= 10;
}

nextButton.onclick = () => {
    player.currentTime += 30;
}

player.ontimeupdate = () => updateTime();

const updateTime = () => {
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);

    currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

    const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);

    duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

    const progressWidth = durationFormatted 
        ? (player.currentTime / durationFormatted) * 100
        : 0;

    progress.style.width = progressWidth + "%";
};

const formatZero = (n) => (n < 10 ? "0" + n : n);

progressBar.onclick = (e) => {
    const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
    player.currentTime = newTime;
};