const quiz = [
    { q: "Capital of Pakistan?", o: ["Karachi", "Lahore", "Islamabad", "Quetta"], a: 2 },
    { q: "Largest ocean?", o: ["Indian", "Atlantic", "Pacific", "Arctic"], a: 2 },
    { q: "Father of Computer?", o: ["Newton", "Einstein", "Babbage", "Tesla"], a: 2 },
    { q: "Total continents?", o: ["5", "6", "7", "8"], a: 2 },
    { q: "Red planet?", o: ["Earth", "Mars", "Venus", "Jupiter"], a: 1 },
    { q: "National flower of Pakistan?", o: ["Rose", "Jasmine", "Tulip", "Sunflower"], a: 1 },
    { q: "Gas used by plants?", o: ["Oxygen", "Hydrogen", "CO2", "Nitrogen"], a: 2 },
    { q: "Longest river?", o: ["Amazon", "Nile", "Indus", "Yangtze"], a: 1 },
    { q: "Telephone inventor?", o: ["Bell", "Edison", "Tesla", "Newton"], a: 0 },
    { q: "Highest population?", o: ["USA", "China", "India", "Russia"], a: 2 }
];

let index = 0;
let score = 0;
let timer = 20;
let interval;
let selectedAnswer = null;

const question = document.getElementById("question");
const options = document.querySelectorAll(".option");
const progress = document.getElementById("progress");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
    selectedAnswer = null;
    timer = 20;
    timerEl.innerText = "⏱ 20";
    nextBtn.style.display = "none";

    options.forEach(btn => {
        btn.classList.remove("correct", "wrong", "selected");
        btn.disabled = false;
    });

    question.innerText = quiz[index].q;
    options.forEach((btn, i) => btn.innerText = quiz[index].o[i]);
    progress.innerText = `Q ${index + 1}/10`;

    startTimer();
}

function startTimer() {
    clearInterval(interval);
    interval = setInterval(() => {
        timer--;
        timerEl.innerText = `⏱ ${timer}`;
        if (timer === 0) {
            clearInterval(interval);
            revealAnswer();
        }
    }, 1000);
}

function selectAnswer(i) {
    selectedAnswer = i;

    // pehle sab ka selected hatao
    options.forEach(btn => btn.classList.remove("selected"));

    // jispe click hua wahi yellow rahe
    options[i].classList.add("selected");

    nextBtn.style.display = "block";
}

function revealAnswer() {
    // selected color hatao
    options.forEach(btn => btn.classList.remove("selected"));

    // correct ko green
    options[quiz[index].a].classList.add("correct");

    if (selectedAnswer !== null) {
        if (selectedAnswer === quiz[index].a) {
            score++;
        } else {
            options[selectedAnswer].classList.add("wrong");
        }
    }

    options.forEach(btn => btn.disabled = true);
    nextBtn.style.display = "block";
}

function nextQuestion() {
    clearInterval(interval);
    revealAnswer();

    setTimeout(() => {
        index++;
        if (index < quiz.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 800);
}

function showResult() {
    let status = score >= 5 ? "👏 PASS" : "❌ FAIL";

    document.querySelector(".quiz-container").innerHTML = `
        <h2>Result</h2>
        <h1>${score} / 10</h1>
        <h2>${status}</h2>
        <button onclick="location.reload()">Restart</button>
    `;
}

loadQuestion();
