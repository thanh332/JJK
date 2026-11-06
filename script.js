
/* =================================
   1. GOJOS SECHS-AUGEN-EASTEREGG
================================= */

const gojo = document.getElementById("gojo-symbol");
const flash = document.getElementById("flash");
const layer = document.getElementById("easteregg-layer");

gojo.addEventListener("click", function() {
    flash.classList.remove("active");
    void flash.offsetWidth;
    flash.classList.add("active");

    gojo.textContent = "∞";

    setTimeout(() => {
        gojo.textContent = "六眼";
    }, 1200);

    createSymbols(["💜", "♾️", "✨", "👁️"], 18);
});


/* =================================
   2. FLUCH-REGEN
================================= */

function createSymbols(symbols, amount) {
    for (let i = 0; i < amount; i++) {
        const item = document.createElement("span");

        item.className = "flying-symbol";
        item.textContent = symbols[
            Math.floor(Math.random() * symbols.length)
        ];

        item.style.top = Math.random() * 90 + "%";
        item.style.animationDelay = Math.random() * 1.5 + "s";

        layer.appendChild(item);

        item.addEventListener("animationend", () => {
            item.remove();
        });
    }
}


/* =================================
   3. GEHEIMNISVOLLER LOGO-KLICK
================================= */

let logoClicks = 0;

document.querySelector(".logo").addEventListener("click", function(event) {
    event.preventDefault();
    logoClicks++;

    if (logoClicks === 5) {
        createSymbols(["👹", "🔮", "💀", "🌀"], 25);
        alert("⚠️ WARNUNG: Eine besondere Fluchenergie wurde entdeckt!");
        logoClicks = 0;
    }
});


/* =================================
   4. SUKUNA-GEHEIMNIS
================================= */

let secretClicks = 0;

document.getElementById("secretButton").addEventListener("click", function() {
    secretClicks++;

    const secretText = document.getElementById("secretText");

    if (secretClicks < 7) {
        secretText.textContent =
            "Die versiegelte Energie wird stärker ... " +
            secretClicks + " / 7";
    } else {
        secretText.textContent =
            "👹 RYOMEN SUKUNA: Du hast das geheime Siegel geöffnet!";
        createSymbols(["👹", "🔥", "🩸", "⚡"], 35);
        secretClicks = 0;
    }
});


/* =================================
   5. CHARAKTER-KARTEN
================================= */

document.querySelectorAll(".character-card").forEach(card => {
    card.addEventListener("click", function() {
        const name = card.querySelector("h3").textContent;

        card.style.borderColor = "#d8a4ff";
        card.style.boxShadow = "0 0 25px #a855f755";

        setTimeout(() => {
            card.style.borderColor = "";
            card.style.boxShadow = "";
        }, 1200);

        console.log("Jujutsu-Akte geöffnet: " + name);
    });
});


/* =================================
   6. DAS JJK-QUIZ
================================= */

const questions = [
    {
        question: "Wer ist der Lehrer von Yuji, Megumi und Nobara?",
        answers: ["Satoru Gojo", "Kento Nanami", "Suguru Geto"],
        correct: 0
    },
    {
        question: "Wie heisst der König der Flüche?",
        answers: ["Mahito", "Ryomen Sukuna", "Jogo"],
        correct: 1
    },
    {
        question: "Welche Technik verwendet Megumi?",
        answers: ["Resonanz", "Limitless", "Zehn-Schatten-Technik"],
        correct: 2
    },
    {
        question: "Wie heisst Gojos besondere Augenfähigkeit?",
        answers: ["Sechs Augen", "Drachenauge", "Schattenblick"],
        correct: 0
    },
    {
        question: "Wer verwendet verfluchte Sprache?",
        answers: ["Toge Inumaki", "Yuji Itadori", "Maki Zenin"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("question").textContent = q.question;

    const buttons = document.querySelectorAll(".answers button");

    buttons.forEach((button, index) => {
        button.textContent = q.answers[index];
        button.disabled = false;
    });

    document.getElementById("result").textContent = "";
    answered = false;
}

function answer(index) {
    if (answered) return;

    answered = true;

    if (index === questions[currentQuestion].correct) {
        score++;
        document.getElementById("result").textContent =
            "Richtig! ⚡ Du bist ein echter Jujuzist!";
    } else {
        document.getElementById("result").textContent =
            "Falsch! 📜 Lies die Akten noch einmal.";
    }

    document.getElementById("score").textContent =
        "Punkte: " + score + " / " + (currentQuestion + 1);

    document.querySelectorAll(".answers button").forEach(button => {
        button.disabled = true;
    });
}

function nextQuestion() {
    if (currentQuestion === questions.length - 1) {
        document.getElementById("question").textContent =
            "Prüfung abgeschlossen! Du hast " + score + " von 5 Punkten!";

        document.querySelector(".answers").style.display = "none";

        const next = document.querySelector(".next-button");
        next.textContent = "Prüfung wiederholen ↻";
        next.onclick = restartQuiz;
        return;
    }

    currentQuestion++;
    showQuestion();
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    document.querySelector(".answers").style.display = "grid";

    const next = document.querySelector(".next-button");
    next.textContent = "Nächste Frage →";
    next.onclick = nextQuestion;

    document.getElementById("score").textContent = "Punkte: 0";

    showQuestion();
}

showQuestion();
