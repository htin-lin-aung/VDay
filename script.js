const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionScreen = document.getElementById('question-screen');
const successScreen = document.getElementById('success-screen');
const bgHearts = document.getElementById('bg-hearts');

// Funny texts for the "No" button
const noTexts = [
    "Are you sure?", 
    "Really sure??", 
    "Think again!", 
    "Last chance!", 
    "Surely not?", 
    "You might regret this!", 
    "Give it another thought!", 
    "Are you absolutely certain?", 
    "This could be a mistake!", 
    "Have a heart!", 
    "Don't be so cold!", 
    "Change of heart?", 
    "Wouldn't you reconsider?", 
    "Is that your final answer?", 
    "You're breaking my heart ;("
];

let clickCount = 0;

// 1. Function to handle the "No" button click/hover
const handleNoInteraction = () => {
    clickCount++;
    
    // Change text on No button
    // We use % to loop through the array if clicks exceed the array length
    noBtn.innerText = noTexts[clickCount % noTexts.length];
    
    // Move the "No" button randomly (just a little bit to annoy)
    // We keep it relative so it doesn't fly off screen completely
    const randomX = (Math.random() - 0.5) * 100;
    const randomY = (Math.random() - 0.5) * 100;
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    // Make "Yes" button BIGGER
    // We increase font size and padding
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    const newSize = currentSize * 1.2; // Increase by 20%
    yesBtn.style.fontSize = `${newSize}px`;
    
    // Also increase the button size visually
    const currentPadding = parseFloat(window.getComputedStyle(yesBtn).padding);
    yesBtn.style.padding = `${currentPadding * 1.1}px ${currentPadding * 1.2}px`;

    // Limit max size so it doesn't crash browser visually (optional)
    if (newSize > 300) {
        noBtn.style.display = "none"; // Eventually hide 'No' entirely
    }
};

noBtn.addEventListener('click', handleNoInteraction);
noBtn.addEventListener('mouseover', handleNoInteraction); // Desktop hover
noBtn.addEventListener('touchstart', handleNoInteraction); // Mobile touch

// 2. Function for the "Yes" button
yesBtn.addEventListener('click', () => {
    questionScreen.style.display = 'none';
    successScreen.classList.remove('hidden');

    // Confetti explosion
    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 }
    });
    
    // Fire confetti repeatedly for a few seconds
    let duration = 3 * 1000;
    let end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
    
    // Try to play music if user enabled it
    // const music = document.getElementById('music');
    // if(music) music.play();
});

// 3. Create Floating Hearts in Background
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's'; // 4-7s duration
    
    bgHearts.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 7000); // Remove from DOM after animation
}

setInterval(createHeart, 500); // Add a new heart every 0.5s