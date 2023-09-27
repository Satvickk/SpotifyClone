console.log('Welcome to Spotify');

//  Initialize the variable

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let Myprogressbar = document.getElementById('Myprogressbar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songname: "Fashion pop", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
    { songname: "Rock-King Around Here", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
    { songname: "Beats from Future", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
    { songname: "Embrace", filepath: "songs/4.mp3", coverpath: "covers/4.png" },
    { songname: "Summer Party", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
    { songname: "Sunnday", filepath: "songs/6.mp3", coverpath: "covers/6.jpg" },
]


songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songname;
})


// Handle play/pause click


masterplay.addEventListener('click', ()=> {
    if (audioElement.paused || audioElement.currentTime<= 0 ) {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 1;

    }
})


// Listen to event
audioElement.addEventListener('timeupdate', () => {
    // Update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    Myprogressbar.value = progress;
})

// seekbar match to the song duration - since we have used percentage thus for convert it into time we use the formula  Percentage = 100 x (Current Time / Duration)
Myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = Myprogressbar.value * audioElement.duration / 100;
})

const makeAllplays = () => {
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllplays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-circle-pause');
        mastersongname.innerText = songs[songIndex].songname;
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 5) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }

    audioElement.src = `songs/${songIndex + 1}.mp3`;
    mastersongname.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }

    audioElement.src = `songs/${songIndex + 1}.mp3`;
    mastersongname.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-circle-pause');
})