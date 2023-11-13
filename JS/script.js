document.addEventListener("DOMContentLoaded", function () {
    const words = ["BATMAN", "CRUZEIRO", "PICCOLO", "BEISEBOL", "MANDIBULA", "PORSCHE", "JABUTICABA", "ROCK", "DESEMBARGADOR", "LOKI",
"CORINGA", "ISLANDIA", "TAEKWONDO", "LANTERNA", "MICKEY"];
    let selectedWord = words[Math.floor(Math.random() * words.length)];
    let guessedLetters = [];
    let wrongLetters = [];
    let attempts = 0;
    const maxAttempts = 6;
    let gameEnded = false;

    const hints = {
        BATMAN: "HÉROI NOTURNO.",
        CRUZEIRO: "MAIOR TIME DE FUTEBOL MINEIRO.",
        PICCOLO: "PERSONAGEM DE DRAGON BALL.",
        BEISEBOL: "ESPORTE COMUM DOS E.U.A.",
        MANDIBULA: "OSSO HUMANO.",
        PORSCHE: "MARCA AUTOMOTIVA.",
        JABUTICABA: "FRUTA NATIVA DA MATA ATLÂNTICA.",
        ROCK: "GÊNERO MUSICAL.",
        DESEMBARGADOR: "PROFISSÃO.",
        LOKI: "VILÃO DA MARVEL.",
        CORINGA: "VILÃO DA DC.",
        ISLANDIA: "PAÍS NÓRDICO.",
        TAEKWONDO: "ARTE MARCIAL.",
        LANTERNA: "OBJETO.",
        MICKEY: "PERSONAGEM DA DYSNEY.",
      };
    
      let currentHint = hints[selectedWord.toUpperCase()] || "Dica não disponível para esta palavra";
    
      function displayHint() {
        const hintText = document.getElementById("hint-text");
    
        if (hintText) {
          hintText.textContent = currentHint;
        }
      }

    function displayWord() {
      const wordDisplay = document.getElementById("word-display");
      const displayedWord = selectedWord
        .split("")
        .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
        .join(" ");
  
      if (wordDisplay) {
        wordDisplay.innerHTML = displayedWord;
      }
  
      return displayedWord;
    }
  
    function displayHangman() {
      const hangmanImg = document.getElementById("hangman-img");
      if (hangmanImg) {
        hangmanImg.src = `IMG/hangman-${attempts}.png`;
      }
    }
  
    function displayLetters() {
      const lettersDiv1 = document.querySelector(".letter-row-1");
      const lettersDiv2 = document.querySelector(".letter-row-2");
      const lettersDiv3 = document.querySelector(".letter-row-3");
  
      if (lettersDiv1 && lettersDiv2 && lettersDiv3) {
        lettersDiv1.innerHTML = "";
        lettersDiv2.innerHTML = "";
        lettersDiv3.innerHTML = "";
  
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        alphabet.split("").forEach((letter, index) => {
          const button = document.createElement("button");
          button.textContent = letter;
  
          button.addEventListener("click", () => guessLetter(letter));
  
          if (guessedLetters.includes(letter)) {
            button.classList.add("correct-letter");
            button.disabled = true;
          }
  
          if (wrongLetters.includes(letter)) {
            button.classList.add("wrong-letter");
            button.disabled = true;
          }
  
          if (index < 10) {
            lettersDiv1.appendChild(button);
          } else if (index < 19) {
            lettersDiv2.appendChild(button);
          } else {
            lettersDiv3.appendChild(button);
          }
        });
      }
    }
  
    function guessLetter(letter) {
      if (!gameEnded) {
        if (!guessedLetters.includes(letter)) {
          guessedLetters.push(letter);
          if (!selectedWord.includes(letter)) {
            wrongLetters.push(letter);
            attempts++;
          }
        }
  
        displayWord();
        displayHangman();
        displayLetters();
  
        if (attempts === maxAttempts) {
          alert("Você perdeu! A palavra era: " + selectedWord);
          endGame();
        }
  
        if (!displayWord().includes("_")) {
          alert("Parabéns! Você venceu!");
          endGame();
        }
      }
    }
  
    function endGame() {
      gameEnded = true;
      document.getElementById("end-game-btn").disabled = true;
  
      setTimeout(function () {
        if (attempts === maxAttempts) {
          alert("Você perdeu! A palavra era: " + selectedWord);
        } else if (!displayWord().includes("_")) {
          alert("Parabéns! Você venceu!");
        }
      }, 500);
    }
  
    function resetGame() {
      selectedWord = words[Math.floor(Math.random() * words.length)];
      guessedLetters = [];
      wrongLetters = [];
      attempts = 0;
      gameEnded = false;
      document.getElementById("end-game-btn").disabled = false;
      displayWord();
      displayHangman();
      displayLetters();
    }
  
    displayWord();
    displayHangman();
    displayLetters();
    displayHint();
  });
  