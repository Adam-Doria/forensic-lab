class Question {
  constructor(text, choice, answer) {
    this.text = text;
    this.choice = choice;
    this.answer = answer;
  }

  isCorrectAnswer(userChoice) {
    return userChoice === this.answer;
  }
}
const quizzContent = document.getElementById("quiz").innerHTML;

console.log(quizzContent);
const questions = [
  new Question(
    "Quel élément n'est pas un centre de figure?",
    ["Boucle à droite", "Tente", "Delta", "Composite"],
    "Delta"
  ),
  new Question(
    "En France, à partir de combien de point considère-t-on une trace papillaire comme exploitable?",
    ["8", "10", "12", "13"],
    "12"
  ),
  new Question(
    "Le dessin papillaire est réalisé par un ensemble de,",
    [
      "crêtes et de sillons",
      "bosses et de creux",
      "de traces et d'empreintes",
      "vallées et creux",
    ],
    "crêtes et de sillons"
  ),
  new Question(
    "Sur quelle zone du corps trouve-t-on aussi des crêtes papillaires ?",
    ["Front", "Pieds", "Oreilles", "Avant-bras"],
    "Pieds"
  ),
];

class Quizz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
  reboot() {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
}

//affichage

const display = {
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  question: function () {
    this.elementShown("question", quizz.getCurrentQuestion().text);
  },
  choices: function () {
    let choices = quizz.getCurrentQuestion().choice;

    userchoice = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quizz.guess(guess);
        quizzApp();
      };
    };

    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      userchoice("guess" + i, choices[i]);
    }
  },
  progress: function () {
    this.elementShown(
      "progress",
      `Question ${quizz.currentQuestionIndex + 1} sur ${
        quizz.questions.length
      } `
    );
  },
  endQuizz: function () {
    let endQuizzHTML = `
    <h1>Quizz terminé!</h1>
<h3>Votre score est de : ${quizz.score} / ${quizz.questions.length}</h3>
<button id="restart"> Recommencer </button>
`;

    this.elementShown("quiz", endQuizzHTML);
  },
  restart: function () {
    document.getElementById("restart").onclick = ()=> {
      quizz.reboot();
      this.elementShown("quiz", quizzContent);
      quizzApp();
      // location.reload() =>cf stackoverflow
    }
  },
};
// logique du jeu

quizzApp = () => {
  if (quizz.hasEnded()) {
    display.endQuizz();
    display.restart();
  } else {
    display.question();
    display.choices();
    display.progress();
  }
};

//creer quizz
let quizz = new Quizz(questions);
quizzApp();
