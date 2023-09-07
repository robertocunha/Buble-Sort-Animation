const stepBackwardButton = document.getElementById("stepBackwardButton");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const stepForwardButton = document.getElementById("stepForwardButton");
const codeElement = document.querySelector(".code-container code");

let animationInterval;
let currentIndex = 0;
const totalSteps = 10; // número de linhas menos 1

highlightCodeLine(currentIndex);

function highlightCodeLine(index) {
    const codeLines = document.querySelectorAll(".code-line");

    codeLines.forEach(line => {
        line.classList.remove("highlighted");
    });

    codeLines[index].classList.add("highlighted");
}

function pauseAnimation() {
    clearInterval(animationInterval);
}

function playAnimation() {
    animationInterval = setInterval(() => {
        if (currentIndex === totalSteps) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        highlightCodeLine(currentIndex);
    }, 1000);
}

function stepForward() {
    pauseAnimation();
    
    if (currentIndex === totalSteps) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    highlightCodeLine(currentIndex);
}

function stepBackward() {
    pauseAnimation();
    
    if (currentIndex === 0) {
        currentIndex = totalSteps;
    } else {
        currentIndex--;
    }
    highlightCodeLine(currentIndex);
}

stepBackwardButton.addEventListener("click", stepBackward);
pauseButton.addEventListener("click", pauseAnimation);
playButton.addEventListener("click", playAnimation);
stepForwardButton.addEventListener("click", stepForward);
