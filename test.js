// test.js

// const verbs = {
//     // Add your 500 verbs here, e.g.:
//     "Acquire": { base: "acquire", past: "acquired", pastParticiple: "acquired", meaning: "प्राप्त करना" },
//     "Assess": { base: "assess", past: "assessed", pastParticiple: "assessed", meaning: "मूल्यांकन करना" },
//     // ... (more verbs up to 500)
// };
import  verbs  from './verbs.js';
console.log(verbs)
let currentVerb;
let score = 0;
let questionType; // 'meaning' or 'form'
const totalQuestions = 10;
let questionCount = 0;
let currentQuestionIndex = 0;
let questions = [];
let selectedLevel=1;
let levelVerbs = {};

document.getElementById('start-test').addEventListener('click', startTest);
document.getElementById('submit-answer').addEventListener('click', submitAnswer);
document.getElementById('restart-test').addEventListener('click', restartTest);
document.getElementById('previous-question').addEventListener('click', showPreviousQuestion);
document.getElementById('next-question').addEventListener('click', showNextQuestion);
document.getElementById('level-select').addEventListener('change', updateLevel);

function updateLevel() {
    selectedLevel = parseInt(document.getElementById('level-select').value, 10);
    console.log(selectedLevel)
}

function startTest() {
    score = 0;
    questionCount = 0;
    currentQuestionIndex = 0;
    questions.length = 0; // Clear previous questions
    generateLevelVerbs();
    generateQuestions();
    document.getElementById('level-selection').classList.remove('d-flex');
    document.getElementById('level-selection').classList.add('d-none');
    document.getElementById('question-container').classList.remove('d-none');
    document.getElementById('results-container').classList.add('d-none');
    showQuestion();
}

function generateLevelVerbs() {
    let start = (selectedLevel - 1) * 50;
    let end = selectedLevel * 50;
    console.log(Object.keys(verbs).length);
    if(Object.keys(verbs).length<end){
        start=0;
        end=Object.keys(verbs).length;
    }
    levelVerbs = Object.keys(verbs)
        .slice(start, end)
        .reduce((acc, key) => {
            acc[key] = verbs[key];
            return acc;
        }, {});
     
}

function generateQuestions() {
    const verbsArray = Object.keys(levelVerbs);
    for (let i = 0; i < totalQuestions; i++) {
        const randomVerb = verbsArray[Math.floor(Math.random() * verbsArray.length)];
        const randomForm=Math.random() > 0.5 >0.5?'past':'pastParticiple';
        const questionType = Math.random() > 0.15 ? 'meaning' : randomForm;
        questions.push({ verb: randomVerb, type: questionType });
    }
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    console.log("------",currentQuestion)
    currentVerb = levelVerbs[currentQuestion.verb];
    questionType = currentQuestion.type;
    const questionText = questionType === 'meaning'
        ? `What is the meaning of "${currentQuestion.verb}"?`
        : `What is the ${questionType=='past'?'2nd':questionType=='pastParticiple'?'3rd':questionType} form of "${currentQuestion.verb}"?`;

    document.getElementById('question-text').innerText = questionText;

    // Prepare options
    const options = generateOptions(questionType);
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    options.forEach(option => {
        const optionElem = document.createElement('div');
        optionElem.classList.add('form-check');
        optionElem.innerHTML = `
            <input class="form-check-input" type="radio" name="options" value="${option}" id="${option}">
            <label class="form-check-label" for="${option}">
                ${option}
            </label>
        `;
        optionsContainer.appendChild(optionElem);
    });

    updateNavigationButtons();
    document.getElementById('feedback').innerText = '';
    document.getElementById('submit-answer').disabled = false;
}

function generateOptions(questionType) {
    const verbsArray = Object.keys(levelVerbs);
    // const verbForm=CurrentForm===2?'past':'pastParticiple';
    const correctOption = questionType === 'meaning'
        ? currentVerb.meaning
        : currentVerb[questionType];

    // Include the correct option
    const options = [correctOption];

    // Add random incorrect options
    while (options.length < 4) {
        const randomVerb = verbsArray[Math.floor(Math.random() * verbsArray.length)];
        const randomOption = questionType === 'meaning'
            ? levelVerbs[randomVerb].meaning
            : levelVerbs[randomVerb][questionType];
        console.log(questionType)
        if (!options.includes(randomOption)) {
            options.push(randomOption);
        }
    }

    // Shuffle options
    return options.sort(() => Math.random() - 0.5);
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="options"]:checked');
    if (!selectedOption) {
        alert('Please select an option.');
        return;
    }

    const selectedValue = selectedOption.value;
    const isCorrect = (questionType === 'meaning' && selectedValue === currentVerb.meaning)
        || (selectedValue === currentVerb[questionType]);

    const feedback = isCorrect
        ? 'Correct!'
        : `Incorrect. The ${questionType === 'meaning' ? 'meaning' : `${questionType=='past'?'2nd':questionType=='pastParticiple'?'3rd':questionType} form`} is "${currentVerb[questionType]}".`;
    document.getElementById('feedback').innerText = feedback;
    if(isCorrect){
        document.getElementById('feedback').classList.remove('text-danger');
        document.getElementById('feedback').classList.add('text-success');
    }else{
        document.getElementById('feedback').classList.remove('text-success');
        document.getElementById('feedback').classList.add('text-danger');
    }

    if (isCorrect) {
        score++;
    }

    // Disable options and show navigation buttons
    document.querySelectorAll('input[name="options"]').forEach(input => input.disabled = true);
    document.getElementById('submit-answer').disabled = true;
    document.getElementById('next-question').classList.remove('d-none');
    if (currentQuestionIndex > 0) {
        document.getElementById('previous-question').classList.remove('d-none');
    } else {
        document.getElementById('previous-question').classList.add('d-none');
    }
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function showNextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResults();
    }
}

function updateNavigationButtons() {
    document.getElementById('next-question').classList.add('d-none');
    document.getElementById('previous-question').classList.add('d-none');
}

function showResults() {
    document.getElementById('question-container').classList.add('d-none');
    document.getElementById('results-container').classList.remove('d-none');

    const percentage = (score / totalQuestions * 100).toFixed(2);
    const resultText = `You answered ${score} out of ${totalQuestions} questions correctly (${percentage}%).`;
    document.getElementById('final-result').innerText = resultText;
    document.getElementById('restart-test').classList.remove('d-none');
}

function restartTest() {
    document.getElementById('results-container').classList.add('d-none');
    document.getElementById('level-selection').classList.remove('d-none');
    document.getElementById('level-selection').classList.add('d-flex');
}
