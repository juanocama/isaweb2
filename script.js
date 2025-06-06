
document.addEventListener('DOMContentLoaded', function() {
    // Initialize background music
    const backgroundMusic = document.getElementById('background-music');
    
    // Auto-play music (user interaction might be required)
    setTimeout(() => {
        backgroundMusic.play().catch(e => {
            console.log('Music auto-play blocked. Click anywhere to start music.');
        });
    }, 1000);
    
    // Click anywhere to start music if blocked
    document.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(e => console.log('Could not play music'));
        }
    }, { once: true });
    
    // Add click effect to the birthday message
    const birthdayMessage = document.querySelector('.birthday-message');
    
    birthdayMessage.addEventListener('click', function() {
        createHeart();
        playBirthdaySound();
    });
    
    // Create floating hearts on click
    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = '2rem';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '100';
        heart.style.animation = 'heart-float 3s ease-out forwards';
        
        document.body.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
    
    // Add heart floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heart-float {
            0% {
                transform: translateY(0) scale(0);
                opacity: 1;
            }
            50% {
                transform: translateY(-50vh) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Simple birthday sound effect (using Web Audio API)
    function playBirthdaySound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(587.33, audioContext.currentTime + 0.2); // D5
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime + 0.3); // C5
        oscillator.frequency.setValueAtTime(698.46, audioContext.currentTime + 0.4); // F5
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.5); // E5
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.6);
    }
    
    // Add more confetti every second for lots of confetti
    setInterval(createMoreConfetti, 1500);
    
    function createMoreConfetti() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.background = getRandomColor();
                confetti.style.animationDelay = Math.random() * 2 + 's';
                
                // Random shapes and sizes for confetti
                if (Math.random() > 0.5) {
                    confetti.style.borderRadius = '50%';
                } else {
                    confetti.style.transform = 'rotate(45deg)';
                }
                
                // Random sizes
                const size = Math.random() * 8 + 8;
                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';
                
                document.querySelector('.confetti').appendChild(confetti);
                
                // Remove after animation
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 100);
        }
    }
    
    function getRandomColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff9ff3', '#54a0ff', '#5f27cd', '#ff9ff3', '#feca57', '#48dbfb', '#ff6348', '#2ed573', '#5f27cd'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});
