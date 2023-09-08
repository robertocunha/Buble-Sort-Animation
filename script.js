const stepBackwardButton = document.getElementById("stepBackwardButton");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const stepForwardButton = document.getElementById("stepForwardButton");
const codeElement = document.querySelector(".code-container code");

let animationInterval;

const unOrderedElments = [100, 80, 120];
const steps = generateSteps(unOrderedElments);
let stepsIndex = 0;
let currentStep = steps[stepsIndex];
const totalSteps = steps.length;


function generateSteps(arr) {
    const roteiro = [];
    const len = arr.length;

    roteiro.push(0);
    for (let i = 0; i < len -1; i++) {
        roteiro.push(1);
        for (let j = i + 1; j < len; j++) {
            roteiro.push(2, 3)
            if (arr[i] > arr[j]) {
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                roteiro.push(4, 5, 6);
            }
            roteiro.push(7, 8)
            if (j === len) roteiro.push(2, 8);
        }
        roteiro.push(9);
        if (i === len - 1) roteiro.push(1, 9);
    }
    roteiro.push(10);
    return roteiro;
}

function highlightCodeLine(index) {
    const codeLines = document.querySelectorAll(".code-line");
    
    codeLines.forEach(line => {
        line.classList.remove("highlighted");
    });
    
    codeLines[index].classList.add("highlighted");
}

function pauseAnimation() {
    playButton.disabled = false;
    
    clearInterval(animationInterval);
}

function playAnimation() {
    playButton.disabled = true;
    
    animationInterval = setInterval(() => {
        stepsIndex = (stepsIndex + 1) % totalSteps;
        
        currentStep = steps[stepsIndex];
        highlightCodeLine(currentStep);
    }, 1000);
}

function stepForward() {
    pauseAnimation();
    
    stepsIndex = (stepsIndex + 1) % totalSteps;
    
    currentStep = steps[stepsIndex];
    highlightCodeLine(currentStep);
}

function stepBackward() {
    pauseAnimation();
    
    stepsIndex = (stepsIndex - 1 + totalSteps) % totalSteps;
    
    currentStep = steps[stepsIndex];
    highlightCodeLine(currentStep);
}

stepBackwardButton.addEventListener("click", stepBackward);
pauseButton.addEventListener("click", pauseAnimation);
playButton.addEventListener("click", playAnimation);
stepForwardButton.addEventListener("click", stepForward);

highlightCodeLine(currentStep);