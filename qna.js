const questionsContainer = document.getElementById("questionsContainer");
const questionInput = document.getElementById("questionInput");
const usernameInput = document.getElementById("usernameInput");

let questions = [];

function postQuestion() {
    const username = usernameInput.value.trim();
    const questionText = questionInput.value.trim();
    if (!username || !questionText) return alert("Enter both name and question!");

    const questionObj = {
        id: Date.now(),
        username: username,
        text: questionText,
        answers: []
    };

    questions.push(questionObj);
    questionInput.value = "";
    renderQuestions();
}

function postAnswer(questionId, replyToAnswerId = null) {
    const answerInput = document.getElementById(`answerInput-${questionId}-${replyToAnswerId || 'main'}`);
    const usernameInput = document.getElementById(`usernameInput-${questionId}-${replyToAnswerId || 'main'}`);
    const answerText = answerInput.value.trim();
    const username = usernameInput.value.trim();
    
    if (!username || !answerText) return alert("Enter both name and answer!");

    const question = questions.find(q => q.id === questionId);

    const answerObj = {
        id: Date.now(),
        username: username,
        text: answerText,
        replies: []
    };

    if (replyToAnswerId) {
        const parentAnswer = question.answers.find(a => a.id === replyToAnswerId);
        parentAnswer.replies.push(answerObj);
    } else {
        question.answers.push(answerObj);
    }

    answerInput.value = "";
    renderQuestions();
}

function renderQuestions() {
    questionsContainer.innerHTML = "";
    questions.forEach(q => {
        const questionElement = document.createElement("div");
        questionElement.classList.add("bg-gray-800", "p-4", "rounded", "mt-4");

        questionElement.innerHTML = `
            <p class="font-bold">${q.username} <span class="text-gray-400">asks:</span></p>
            <p>${q.text}</p>
            <div class="mt-2">
                <input type="text" id="usernameInput-${q.id}-main" class="w-1/4 px-2 py-1 border rounded bg-gray-700 text-white" placeholder="Your name">
                <input type="text" id="answerInput-${q.id}-main" class="w-2/4 px-2 py-1 border rounded bg-gray-700 text-white" placeholder="Write an answer...">
                <button onclick="postAnswer(${q.id})" class="bg-green-600 px-3 py-1 rounded">Reply</button>
            </div>
            <div class="mt-3">${renderAnswers(q.answers, q.id)}</div>
        `;

        questionsContainer.appendChild(questionElement);
    });
}

function renderAnswers(answers, questionId, depth = 1) {
    let html = "";
    answers.forEach(a => {
        html += `
            <div class="ml-${depth * 6} mt-2 bg-gray-700 p-3 rounded">
                <p class="font-bold">${a.username} <span class="text-gray-400">replied:</span></p>
                <p>${a.text}</p>
                <div class="mt-2">
                    <input type="text" id="usernameInput-${questionId}-${a.id}" class="w-1/4 px-2 py-1 border rounded bg-gray-600 text-white" placeholder="Your name">
                    <input type="text" id="answerInput-${questionId}-${a.id}" class="w-2/4 px-2 py-1 border rounded bg-gray-600 text-white" placeholder="Reply to this answer...">
                    <button onclick="postAnswer(${questionId}, ${a.id})" class="bg-yellow-500 px-3 py-1 rounded">Reply</button>
                </div>
                ${renderAnswers(a.replies, questionId, depth + 1)}
            </div>
        `;
    });
    return html;
}
