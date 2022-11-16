
const video = document.getElementById('video');
const videoControls = document.getElementById('video-controls');
const playButton = document.getElementById('play');
const playbackIcons = document.querySelectorAll('.playback-icons use');
const videoWorks = !!document.createElement('video').canPlayType;
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');
const seek = document.getElementById('seek');
const seekTooltip = document.getElementById('seek-tooltip');
const volumeButton = document.getElementById('volume-button');
const volumeIcons = document.querySelectorAll('.volume-button use');
const volumeMute = document.querySelector('use[href="#volume-mute"]');
const volumeLow = document.querySelector('use[href="#volume-low"]');
const volumeHigh = document.querySelector('use[href="#volume-high"]');
const volume = document.getElementById('volume');
const playbackAnimation = document.getElementById('playback-animation');
const audio = document.getElementById('audio-button');
const english = document.querySelector("[href='#english']");
const kannada = document.querySelector("[href='#kannada']");
const telugu = document.querySelector("[href='#telugu']");

var engv = "shapes.mp4"
var kanv = "newdub.mp4"
var telv = "new.mp4"


if (videoWorks) {
  video.controls = false;
  videoControls.classList.remove('hidden');
}

function togglePlay() {
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  }

  function updatePlayButton() {
    playbackIcons.forEach(icon => icon.classList.toggle('hidden'));
  }

  function updatePlayButton() {
    playbackIcons.forEach(icon => icon.classList.toggle('hidden'));
  
    if (video.paused) {
      playButton.setAttribute('data-title', 'Play (k)')
    } else {
      playButton.setAttribute('data-title', 'Pause (k)')
    }
  }

  function formatTime(timeInSeconds) {
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  
    return {
      minutes: result.substr(3, 2),
      seconds: result.substr(6, 2),
    };
  };

  function initializeVideo() {
    const videoDuration = Math.round(video.duration);
    const time = formatTime(videoDuration);
    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
  }

  function updateTimeElapsed() {
    const time = formatTime(Math.round(video.currentTime));
    timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
    timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
  }

  function initializeVideo() {
    const videoDuration = Math.round(video.duration);
    seek.setAttribute('max', videoDuration);
    progressBar.setAttribute('max', videoDuration);
    const time = formatTime(videoDuration);
    duration.innerText = `${time.minutes}:${time.seconds}`;
    duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
  }

  function updateProgress() {
    seek.value = Math.floor(video.currentTime);
    progressBar.value = Math.floor(video.currentTime);
  }

  function updateSeekTooltip(event) {
    const skipTo = Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10));
    seek.setAttribute('data-seek', skipTo)
    const t = formatTime(skipTo);
    seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
    const rect = video.getBoundingClientRect();
    seekTooltip.style.left = `${event.pageX - rect.left}px`;
  }

  function skipAhead(event) {
    const skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
    video.currentTime = skipTo;
    progressBar.value = skipTo;
    seek.value = skipTo;
  }

  function updateVolume() {
    if (video.muted) {
      video.muted = false;
    }
  
    video.volume = volume.value;
  }

  function updateVolumeIcon() {
    volumeIcons.forEach(icon => {
      icon.classList.add('hidden');
    });
  
    volumeButton.setAttribute('data-title', 'Mute (m)')
  
    if (video.muted || video.volume === 0) {
      volumeMute.classList.remove('hidden');
      volumeButton.setAttribute('data-title', 'Unmute (m)')
    } else if (video.volume > 0 && video.volume <= 0.5) {
      volumeLow.classList.remove('hidden');
    } else {
      volumeHigh.classList.remove('hidden');
    }
  }

  function toggleMute() {
    video.muted = !video.muted;
  
    if (video.muted) {
      volume.setAttribute('data-volume', volume.value);
      volume.value = 0;
    } else {
      volume.value = volume.dataset.volume;
    }
  }

  function animatePlayback() {
    playbackAnimation.animate([
      {
        opacity: 1,
        transform: "scale(1)",
      },
      {
        opacity: 0,
        transform: "scale(1.3)",
      }], {
      duration: 500,
    });
  }

  function audioChange() {
    var x = document.getElementById("audio-menu");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  function audioEnglish() {
    
  }

// Add eventlisteners here
playButton.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('timeupdate', updateTimeElapsed);
video.addEventListener('timeupdate', updateProgress);
seek.addEventListener('mousemove', updateSeekTooltip);
seek.addEventListener('input', skipAhead);
volume.addEventListener('input', updateVolume);
video.addEventListener('volumechange', updateVolumeIcon);
volumeButton.addEventListener('click', toggleMute);
video.addEventListener('click', togglePlay);
video.addEventListener('click', animatePlayback);
audio.addEventListener('click', audioChange);

english.addEventListener("click", function(event) {
  video.pause();
  video.setAttribute('src', engv);
  video.load();
  video.play();
}, false);

kannada.addEventListener("click", function(event) {
  video.pause();
  video.setAttribute('src', kanv);
  video.load();
  video.play();
}, false);

telugu.addEventListener("click", function(event) {
  video.pause();
  video.setAttribute('src', telv);
  video.load();
  video.play();
}, false);