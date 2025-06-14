// 放松工具功能
document.addEventListener('DOMContentLoaded', function() {
    // 呼吸练习
    const breathingCircle = document.querySelector('.breathing-circle');
    const startExerciseBtn = document.querySelector('.start-exercise');
    let isBreathing = false;
    let breathingAnimation;

    function startBreathing() {
        if (isBreathing) return;
        isBreathing = true;
        startExerciseBtn.textContent = 'Stop Exercise';

        breathingAnimation = anime({
            targets: breathingCircle,
            scale: [1, 1.5, 1],
            opacity: [0.5, 0.8, 0.5],
            duration: 4000,
            loop: true,
            easing: 'easeInOutQuad'
        });
    }

    function stopBreathing() {
        if (!isBreathing) return;
        isBreathing = false;
        startExerciseBtn.textContent = 'Start Exercise';
        breathingAnimation.pause();
        breathingCircle.style.transform = 'scale(1)';
        breathingCircle.style.opacity = '0.5';
    }

    startExerciseBtn.addEventListener('click', function() {
        if (isBreathing) {
            stopBreathing();
        } else {
            startBreathing();
        }
    });

    // 冥想计时器
    const meditationAudio = document.getElementById('meditation-audio');
    const meditationTimer = document.querySelector('.meditation-timer');
    const startMeditationBtn = document.querySelector('.start-meditation');
    let meditationInterval;
    let meditationTime = 0;

    function updateMeditationTimer() {
        const minutes = Math.floor(meditationTime / 60);
        const seconds = meditationTime % 60;
        meditationTimer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function startMeditation() {
        meditationAudio.play().catch(error => {
            console.error('Error playing meditation audio:', error);
            alert('Unable to play meditation audio. Please check your internet connection.');
        });
        startMeditationBtn.textContent = 'Stop Meditation';
        meditationInterval = setInterval(() => {
            meditationTime++;
            updateMeditationTimer();
        }, 1000);
    }

    function stopMeditation() {
        meditationAudio.pause();
        meditationAudio.currentTime = 0;
        startMeditationBtn.textContent = 'Start Meditation';
        clearInterval(meditationInterval);
        meditationTime = 0;
        updateMeditationTimer();
    }

    startMeditationBtn.addEventListener('click', function() {
        if (meditationAudio.paused) {
            startMeditation();
        } else {
            stopMeditation();
        }
    });

    // 音乐播放器
    const musicPlayer = document.getElementById('relaxation-music');
    const playlistItems = document.querySelectorAll('.playlist-item');
    let currentTrack = 0;

    // Function to load and play a track
    function loadAndPlayTrack(index) {
        const track = playlistItems[index];
        const audioSrc = track.dataset.src;
        
        // Update audio source
        musicPlayer.src = audioSrc;
        
        // Play the track
        musicPlayer.play().catch(error => {
            console.error('Error playing music:', error);
            alert('Unable to play music. Please check your internet connection.');
        });
        
        // Update active track in playlist
        playlistItems.forEach(item => item.classList.remove('active'));
        track.classList.add('active');
    }

    // Add click event listeners to playlist items
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentTrack = index;
            loadAndPlayTrack(index);
        });
    });

    // Handle track ending
    musicPlayer.addEventListener('ended', function() {
        currentTrack = (currentTrack + 1) % playlistItems.length;
        loadAndPlayTrack(currentTrack);
    });

    // Add error handling for audio loading
    musicPlayer.addEventListener('error', function(e) {
        console.error('Error loading audio:', e);
        alert('Error loading audio. Please check your internet connection and try again.');
    });

    // Add loading indicators
    musicPlayer.addEventListener('loadstart', function() {
        playlistItems[currentTrack].classList.add('loading');
    });

    musicPlayer.addEventListener('canplay', function() {
        playlistItems[currentTrack].classList.remove('loading');
    });

    // Initialize first track
    loadAndPlayTrack(0);
}); 