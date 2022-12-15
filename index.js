let numberClicks = -1;
let userPattern = [];
let correctPattern = [];
let colors = ["green", "red", "yellow", "blue"];

let level = 0;
let highScore = 0;

const nextSequence = () => {
    let randomColor = Math.floor(Math.random() * colors.length);
    let color = colors[randomColor];
    correctPattern.push(color);
    playAudio(color);
}

const playAudio = (color) => {
    let src = `sounds/${color}.mp3`;
    let audio = new Audio(src);
    audio.play();
}

document.addEventListener("keydown", (event) => {
    if (level <= 0) {
        nextSequence();
    }
})


const buttonEl = document.querySelectorAll(".btn");

buttonEl.forEach((el) => {
    el.addEventListener("click", function (buttonClicked) {
        numberClicks++;
        let color = buttonClicked.target.id;
        playAudio(color);
        checkAnswer(color);
    });
})

const checkAnswer = (color) => {
    userPattern.push(color);
    if (color == correctPattern[numberClicks]) {
        if (userPattern.length == correctPattern.length) {
            setTimeout(function () {
                numberClicks = -1;
                userPattern = [];
                nextSequence();
            }, 1000);

        }
    } else {
        let title = document.getElementById("level-title");
        title.textContent = "Game Over! Click to restart";
        playAudio("wrong");
        userPattern = [];
        correctPattern = [];
    }
}