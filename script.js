const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
    // Music
const songs = [{
        name: 'jacinto-1',
        songName: 'Electric Chill Machine',
        songArtist: 'Jacinto'
    },
    {
        name: 'jacinto-2',
        songName: 'Seven Nation Army (Remix)',
        songArtist: 'Jacinto'
    },
    {
        name: 'jacinto-3',
        songName: 'Good Night Disco Queen',
        songArtist: 'Jacinto'
    },
    {
        name: 'metric-1',
        songName: 'Front Row (Remix)',
        songArtist: 'Jacinto'
    }
]

// Pause Play Boolean
let isPlaying = false;

// Play
function playSong() {
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'pause')
    isPlaying = true;
}

function pauseSong() {
    music.pause();
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'play')
    isPlaying = false;
}

// Event Listener (play - pause)
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


// Update The Dom
function loadSong(song) {
    title.textContent = song.songName;
    artist.textContent = song.songArtist;
    music.src = `music/${song.name}.mp3`;
    img.src = `img/${song.name}.jpg`;
}


// current Song
let songIndex = 0;

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex])
    playSong();

}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex === songs.length) {
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex])
    playSong()
}

// On Load - Select first song
loadSong(songs[songIndex])

//Update Progress Bar and Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { currentTime, duration } = e.srcElement;
        // Update progress Bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate Display for Duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        // Delay Switch duration to avoid Nan
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate Display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }

}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const currentWidth = e.offsetX;
    let progressPer = currentWidth / width;
    progress.style.width = `${progressPer*100}%`
    const { duration } = music;
    let time = progressPer * duration;
    music.currentTime = time;
}

// On next song + previous song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);