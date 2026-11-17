
document.addEventListener("DOMContentLoaded", function () {

    console.log("Ariana Website gestartet! 💜");

    // =====================================
    // 1. MINI-KONZERT
    // =====================================

    const mainTitle = document.getElementById("mainTitle");
    const concert = document.getElementById("concert");
    const backButton = document.getElementById("backButton");

    if (mainTitle && concert) {
        mainTitle.addEventListener("click", function () {
            concert.classList.add("active");
        });
    }

    if (backButton && concert) {
        backButton.addEventListener("click", function () {
            concert.classList.remove("active");
        });
    }

    // =====================================
    // 2. ALBUM-BESCHREIBUNGEN
    // =====================================

    const albumInfos = {
        "Yours Truly":
            "Yours Truly ist Arianas Debütalbum aus dem Jahr 2013. Es verbindet Pop und R&B. Bekannte Songs sind The Way und Baby I. 💗",

        "My Everything":
            "My Everything erschien 2014. Das Album enthält bekannte Songs wie Problem, Break Free und One Last Time. ✨",

        "Dangerous Woman":
            "Dangerous Woman erschien 2016. Das Album zeigt eine selbstbewusste musikalische Seite von Ariana. Bekannte Songs sind Into You und Side to Side. 🖤",

        "Sweetener":
            "Sweetener erschien 2018. Das Album verbindet Pop und R&B. Bekannte Songs sind No Tears Left to Cry und God Is a Woman. ☁️",

        "Thank U, Next":
            "Thank U, Next erschien 2019. Die Songs handeln von persönlichen Erfahrungen, Veränderungen und neuen Perspektiven. 💜",

        "Positions":
            "Positions erschien 2020. Das Album verbindet Pop mit R&B und zeigt eine entspannte, persönliche Seite ihrer Musik. 🤍",

        "Eternal Sunshine":
            "Eternal Sunshine erschien 2024. Das Album beschäftigt sich mit Erinnerungen, Beziehungen und persönlichen Veränderungen. 🌅"
    };

    document.querySelectorAll(".album").forEach(function (album) {

        album.addEventListener("dblclick", function () {

            const titel = album.querySelector("h3");

            if (!titel) return;

            const albumName = titel.textContent.trim();
            const vorhandeneBeschreibung =
                album.querySelector(".album-description");

            if (vorhandeneBeschreibung) {
                vorhandeneBeschreibung.remove();
                return;
            }

            document.querySelectorAll(".album-description").forEach(function (beschreibung) {
                beschreibung.remove();
            });

            const beschreibung = document.createElement("p");
            beschreibung.className = "album-description";
            beschreibung.textContent =
                albumInfos[albumName] || "Weitere Informationen folgen bald! 💜";

            album.appendChild(beschreibung);

        });

    });

    // =====================================
    // 3. KONZERT-ÜBERRASCHUNG
    // =====================================

    const surpriseButton = document.getElementById("surpriseButton");
    const concertSecret = document.getElementById("concertSecret");

    if (surpriseButton) {
        surpriseButton.addEventListener("click", function () {

            if (concertSecret) {
                concertSecret.textContent =
                    "Your wish is floating through the stars! 💜✨";
            }

            createConfetti(55);

        });
    }

    // =====================================
    // 4. GEHEIMES POPUP
    // =====================================

    const footerSecret = document.getElementById("footerSecret");
    const secretPopup = document.getElementById("secretPopup");
    const closePopup = document.getElementById("closePopup");

    if (footerSecret && secretPopup) {
        footerSecret.addEventListener("click", function () {
            secretPopup.classList.add("active");
        });
    }

    if (closePopup && secretPopup) {
        closePopup.addEventListener("click", function () {
            secretPopup.classList.remove("active");
        });
    }

    if (secretPopup) {
        secretPopup.addEventListener("click", function (event) {
            if (event.target === secretPopup) {
                secretPopup.classList.remove("active");
            }
        });
    }

    // =====================================
    // 5. NACHTMODUS
    // =====================================

    const nightMode = document.getElementById("nightMode");

    if (nightMode) {
        nightMode.addEventListener("click", function () {

            document.body.classList.toggle("night-mode");

            nightMode.textContent =
                document.body.classList.contains("night-mode") ? "☀️" : "🌙";

        });
    }

    // =====================================
    // 6. STERNE ERZEUGEN
    // =====================================

    const stars = document.getElementById("stars");

    if (stars) {
        for (let i = 0; i < 45; i++) {

            const star = document.createElement("span");

            star.className = "tiny-star";
            star.textContent = "✦";

            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";
            star.style.fontSize = (8 + Math.random() * 15) + "px";
            star.style.animationDelay = Math.random() * 4 + "s";

            stars.appendChild(star);
        }
    }

    // =====================================
    // 7. HERZEN BEIM KLICK
    // =====================================

    document.addEventListener("click", function (event) {

        if (event.target.closest("button, a, .album, #footerSecret")) {
            return;
        }

        const emojis = ["💜", "♡", "✨", "💗"];
        const emoji = document.createElement("span");

        emoji.textContent =
            emojis[Math.floor(Math.random() * emojis.length)];

        emoji.style.position = "fixed";
        emoji.style.left = event.clientX + "px";
        emoji.style.top = event.clientY + "px";
        emoji.style.zIndex = "9999";
        emoji.style.pointerEvents = "none";
        emoji.style.fontSize = "25px";
        emoji.style.transition = "all 1s ease";

        document.body.appendChild(emoji);

        requestAnimationFrame(function () {
            emoji.style.transform = "translateY(-70px) scale(1.5)";
            emoji.style.opacity = "0";
        });

        setTimeout(function () {
            emoji.remove();
        }, 1100);

    });

    // =====================================
    // 8. QUIZ
    // =====================================

    const questions = [
        {
            question: "Wann wurde Ariana Grande geboren?",
            answers: ["1993", "1995", "1990"],
            correct: 0
        },
        {
            question: "Wie heißt ihr Debütalbum?",
            answers: ["Positions", "Yours Truly", "Sweetener"],
            correct: 1
        },
        {
            question: "In welchem Jahr erschien Sweetener?",
            answers: ["2016", "2018", "2020"],
            correct: 1
        },
        {
            question: "Wie heißt ihr Album aus dem Jahr 2024?",
            answers: ["Eternal Sunshine", "My Everything", "Thank U, Next"],
            correct: 0
        },
        {
            question: "Welches Album erschien 2020?",
            answers: ["Dangerous Woman", "Positions", "Sweetener"],
            correct: 1
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    const startQuiz = document.getElementById("startQuiz");
    const questionElement = document.getElementById("quizQuestion");
    const answersElement = document.getElementById("quizAnswers");
    const resultElement = document.getElementById("quizResult");
    const nextButton = document.getElementById("nextQuestion");

    function showQuestion() {

        const question = questions[currentQuestion];

        questionElement.textContent = question.question;
        answersElement.innerHTML = "";
        resultElement.textContent = "";
        nextButton.hidden = true;

        question.answers.forEach(function (answer, index) {

            const button = document.createElement("button");

            button.textContent = answer;
            button.type = "button";

            button.addEventListener("click", function () {

                answersElement.querySelectorAll("button").forEach(function (otherButton) {
                    otherButton.disabled = true;
                });

                if (index === question.correct) {
                    score++;
                    resultElement.textContent = "Richtig! Super! 💜";
                } else {
                    resultElement.textContent =
                        "Leider falsch! Die richtige Antwort ist: " +
                        question.answers[question.correct];
                }

                nextButton.hidden = false;

            });

            answersElement.appendChild(button);

        });
    }

    if (startQuiz && questionElement && answersElement && resultElement && nextButton) {

        startQuiz.addEventListener("click", function () {

            currentQuestion = 0;
            score = 0;

            startQuiz.hidden = true;

            showQuestion();

        });

        nextButton.addEventListener("click", function () {

            currentQuestion++;

            if (currentQuestion < questions.length) {
                showQuestion();
            } else {

                questionElement.textContent = "Quiz beendet! 🎉";
                answersElement.innerHTML = "";

                resultElement.textContent =
                    "Du hast " + score + " von " +
                    questions.length + " Punkten erreicht! 💜";

                nextButton.hidden = true;

                startQuiz.hidden = false;
                startQuiz.textContent = "Nochmal spielen ↻";

                createConfetti(35);

            }
        });
    }

    // =====================================
    // 9. KONFETTI-EFFEKT
    // =====================================

    function createConfetti(amount) {

        const emojis = ["💜", "💗", "✨", "♡", "⭐"];

        for (let i = 0; i < amount; i++) {

            const piece = document.createElement("span");

            piece.textContent =
                emojis[Math.floor(Math.random() * emojis.length)];

            piece.style.position = "fixed";
            piece.style.left = Math.random() * 100 + "vw";
            piece.style.top = "-30px";
            piece.style.fontSize = "22px";
            piece.style.pointerEvents = "none";
            piece.style.zIndex = "7000";
            piece.style.transition = "transform 3s linear, opacity 3s";

            document.body.appendChild(piece);

            requestAnimationFrame(function () {

                piece.style.transform =
                    "translateY(" + (window.innerHeight + 100) +
                    "px) rotate(500deg)";

                piece.style.opacity = "0";

            });

            setTimeout(function () {
                piece.remove();
            }, 3200);
        }
    }

    // =====================================
    // 10. LILA STERN FOLGT DER MAUS
    // =====================================

    const cursorStar = document.createElement("span");

    cursorStar.className = "cursor-star";
    cursorStar.textContent = "✦";

    document.body.appendChild(cursorStar);

    document.addEventListener("mousemove", function (event) {
        cursorStar.style.left = event.clientX + "px";
        cursorStar.style.top = event.clientY + "px";
    });

    // =====================================
    // 11. MAGICAL GALAXY PORTAL
    // =====================================

    const openButton = document.getElementById("portalOpen");
    const closeButton = document.getElementById("portalClose");
    const portal = document.getElementById("galaxyPortal");
    const sparkleContainer = document.getElementById("portalSparkles");

    if (openButton && closeButton && portal && sparkleContainer) {

        let sparkleInterval = null;

        function createPortalSparkle() {

            const sparkle = document.createElement("span");

            sparkle.className = "portal-sparkle";

            const symbols = ["✦", "✧", "✨", "⋆", "💜", "♡"];

            sparkle.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            sparkle.style.left = Math.random() * 100 + "%";
            sparkle.style.top = (50 + Math.random() * 50) + "%";
            sparkle.style.fontSize = (15 + Math.random() * 30) + "px";

            sparkleContainer.appendChild(sparkle);

            setTimeout(function () {
                sparkle.remove();
            }, 3000);
        }

        function closePortal() {

            portal.classList.remove("active");

            clearInterval(sparkleInterval);
            sparkleInterval = null;

            sparkleContainer.innerHTML = "";
        }

        openButton.addEventListener("click", function () {

            portal.classList.add("active");

            for (let i = 0; i < 40; i++) {
                setTimeout(createPortalSparkle, i * 50);
            }

            clearInterval(sparkleInterval);

            sparkleInterval = setInterval(function () {
                createPortalSparkle();
            }, 180);

        });

        closeButton.addEventListener("click", closePortal);

        portal.addEventListener("click", function (event) {
            if (event.target === portal) {
                closePortal();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && portal.classList.contains("active")) {
                closePortal();
            }
        });

    } else {
        console.log("Galaxy-Portal: HTML-Elemente fehlen.");
    }

    console.log("Alle Funktionen wurden geladen! ✨");

});