/* ============================================
   QuizBox - JavaScript Functionality
   ============================================ */

// Application State
const appState = {
    currentPage: 'home',
    currentCategory: 'primary',
    currentQuizIndex: null,
    currentQuestionIndex: 0,
    currentPlayerName: '',
    userAnswers: [],
    score: 0,
    totalQuestions: 0,
    leaderboard: [],
    quizzes: [
        {
            id: 1,
            name: 'Math Quiz',
            category: 'primary',
            questions: [
                {
                    question: 'What is 2 + 2?',
                    options: ['3', '4', '5', '6'],
                    correct: 'B'
                },
                {
                    question: 'What is 5 × 3?',
                    options: ['12', '15', '18', '20'],
                    correct: 'B'
                },
                {
                    question: 'What is 10 - 3?',
                    options: ['5', '6', '7', '8'],
                    correct: 'C'
                },
                {
                    question: 'What is 8 ÷ 2?',
                    options: ['2', '3', '4', '5'],
                    correct: 'C'
                },
                {
                    question: 'What is the next number? 2, 4, 6, ?',
                    options: ['7', '8', '9', '10'],
                    correct: 'B'
                }
            ]
        },
        {
            id: 2,
            name: 'General Knowledge Quiz',
            category: 'primary',
            questions: [
                {
                    question: 'Which planet is closest to the sun?',
                    options: ['Venus', 'Mercury', 'Mars', 'Earth'],
                    correct: 'B'
                },
                {
                    question: 'How many continents are there?',
                    options: ['5', '6', '7', '8'],
                    correct: 'C'
                },
                {
                    question: 'What is the capital of France?',
                    options: ['London', 'Berlin', 'Paris', 'Madrid'],
                    correct: 'C'
                }
            ]
        },
        {
            id: 3,
            name: 'Science Quiz',
            category: 'mid',
            questions: [
                {
                    question: 'What is the chemical formula for water?',
                    options: ['CO2', 'H2O', 'O2', 'H2'],
                    correct: 'B'
                },
                {
                    question: 'Which gas do plants absorb?',
                    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
                    correct: 'C'
                },
                {
                    question: 'What is the SI unit of force?',
                    options: ['Joule', 'Newton', 'Pascal', 'Watt'],
                    correct: 'B'
                },
                {
                    question: 'Which element has the symbol "Au"?',
                    options: ['Silver', 'Gold', 'Aluminum', 'Argon'],
                    correct: 'B'
                },
                {
                    question: 'What is the speed of light?',
                    options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '200,000 km/s'],
                    correct: 'A'
                },
                {
                    question: 'Which organelle is known as the "powerhouse of the cell"?',
                    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'],
                    correct: 'B'
                }
            ]
        },
        {
            id: 4,
            name: 'History Quiz',
            category: 'senior',
            questions: [
                {
                    question: 'In which year did World War II end?',
                    options: ['1943', '1944', '1945', '1946'],
                    correct: 'C'
                },
                {
                    question: 'Who was the first President of the United States?',
                    options: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'],
                    correct: 'B'
                },
                {
                    question: 'Which ancient wonder is still standing?',
                    options: ['Hanging Gardens', 'Great Pyramid of Giza', 'Colossus of Rhodes', 'Lighthouse of Alexandria'],
                    correct: 'B'
                },
                {
                    question: 'In which year did the Titanic sink?',
                    options: ['1910', '1911', '1912', '1913'],
                    correct: 'C'
                },
                {
                    question: 'Who wrote the Declaration of Independence?',
                    options: ['Benjamin Franklin', 'Thomas Jefferson', 'John Adams', 'George Washington'],
                    correct: 'B'
                },
                {
                    question: 'Which empire built the Great Wall of China?',
                    options: ['Qin Dynasty', 'Han Dynasty', 'Ming Dynasty', 'All of the above'],
                    correct: 'D'
                },
                {
                    question: 'In which century did the Renaissance begin?',
                    options: ['12th century', '13th century', '14th century', '15th century'],
                    correct: 'C'
                }
            ]
        }
    ]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    loadLeaderboard();
    setupEventListeners();
    displayQuizzes();
});

// Setup Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            navigateTo(page);
        });
    });

    // Category Selection
    document.querySelectorAll('.btn-category').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-category').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            appState.currentCategory = e.target.dataset.category;
            displayQuizzes();
        });
    });

    // Leaderboard Filters
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            displayLeaderboard(e.target.dataset.filter);
        });
    });

    // Admin Tabs
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            const tab = e.target.dataset.tab;
            document.getElementById(`${tab}-tab`).classList.add('active');
            if (tab === 'manage') {
                renderManageQuizzes();
            }
        });
    });

    // CSV File Upload
    document.getElementById('csvFile').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            parseCSV(file);
        }
    });

    // Admin Quiz Filters
    document.getElementById('searchQuiz').addEventListener('input', renderManageQuizzes);
    document.getElementById('categoryFilter').addEventListener('change', renderManageQuizzes);
}

// Navigation
function navigateTo(page) {
    // Update page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');

    // Update nav
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });

    appState.currentPage = page;

    // Special handling for pages
    if (page === 'leaderboard') {
        displayLeaderboard('all');
    } else if (page === 'admin') {
        document.getElementById('upload-tab').classList.add('active');
        document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById('upload-tab').classList.add('active');
    } else if (page === 'quiz') {
        displayQuizzes();
    }
}

// Display Quizzes
function displayQuizzes() {
    const quizList = document.getElementById('quizList');
    const category = appState.currentCategory;
    const quizzes = appState.quizzes.filter(q => q.category === category);

    if (quizzes.length === 0) {
        quizList.innerHTML = '<div class="empty-state"><p>No quizzes available for this category yet.</p></div>';
        return;
    }

    quizList.innerHTML = quizzes.map((quiz, index) => `
        <div class="quiz-card">
            <span class="quiz-card-category">${capitalize(quiz.category)}</span>
            <h3>${quiz.name}</h3>
            <div class="quiz-card-info">
                <div class="quiz-card-questions">
                    📝 <span>${quiz.questions.length} Questions</span>
                </div>
                <div class="difficulty">⭐ Mixed</div>
            </div>
            <button class="btn btn-primary" onclick="startQuizSelection(${index})">Start Quiz</button>
        </div>
    `).join('');
}

// Start Quiz Selection
function startQuizSelection(quizIndex) {
    const filteredQuizzes = appState.quizzes.filter(q => q.category === appState.currentCategory);
    appState.currentQuizIndex = appState.quizzes.indexOf(filteredQuizzes[quizIndex]);
    showPlayerModal();
}

// Show Player Modal
function showPlayerModal() {
    const modal = document.getElementById('playerModal');
    modal.classList.add('active');
}

// Close Player Modal
function closePlayerModal() {
    document.getElementById('playerModal').classList.remove('active');
}

// Start Quiz
function startQuiz(e) {
    e.preventDefault();
    
    const playerName = document.getElementById('playerName').value.trim();
    if (!playerName) {
        alert('Please enter your name');
        return;
    }

    appState.currentPlayerName = playerName;
    appState.currentQuestionIndex = 0;
    appState.userAnswers = [];
    appState.score = 0;

    const quiz = appState.quizzes[appState.currentQuizIndex];
    appState.totalQuestions = quiz.questions.length;

    closePlayerModal();
    displayQuestion();
    navigateTo('quiz-taking');
}

// Display Question
function displayQuestion() {
    const quiz = appState.quizzes[appState.currentQuizIndex];
    const questionIndex = appState.currentQuestionIndex;
    const question = quiz.questions[questionIndex];

    // Update title
    document.getElementById('quizTitle').textContent = quiz.name;

    // Update question number
    document.getElementById('questionNumber').textContent = 
        `Question ${questionIndex + 1} of ${quiz.questions.length}`;

    // Update progress bar
    const progress = ((questionIndex + 1) / quiz.questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    // Display question
    const container = document.getElementById('questionContainer');
    const selectedAnswer = appState.userAnswers[questionIndex] || null;

    container.innerHTML = `
        <div class="question-text">${question.question}</div>
        <div class="options-group">
            ${question.options.map((option, index) => {
                const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
                const isSelected = selectedAnswer === optionLetter;
                return `
                    <label class="option-label">
                        <input type="radio" name="answer" value="${optionLetter}" 
                               ${isSelected ? 'checked' : ''} 
                               onchange="selectAnswer('${optionLetter}')">
                        <span>${optionLetter}. ${option}</span>
                    </label>
                `;
            }).join('')}
        </div>
    `;

    // Update navigation buttons
    const isFirstQuestion = questionIndex === 0;
    const isLastQuestion = questionIndex === quiz.questions.length - 1;

    document.getElementById('prevBtn').style.display = isFirstQuestion ? 'none' : 'block';
    document.getElementById('nextBtn').style.display = isLastQuestion ? 'none' : 'block';
    document.getElementById('submitBtn').style.display = isLastQuestion ? 'block' : 'none';
}

// Select Answer
function selectAnswer(letter) {
    appState.userAnswers[appState.currentQuestionIndex] = letter;
}

// Next Question
function nextQuestion() {
    const quiz = appState.quizzes[appState.currentQuizIndex];
    if (appState.currentQuestionIndex < quiz.questions.length - 1) {
        appState.currentQuestionIndex++;
        displayQuestion();
    }
}

// Previous Question
function previousQuestion() {
    if (appState.currentQuestionIndex > 0) {
        appState.currentQuestionIndex--;
        displayQuestion();
    }
}

// Submit Quiz
function submitQuiz() {
    const quiz = appState.quizzes[appState.currentQuizIndex];
    
    // Calculate score
    let score = 0;
    quiz.questions.forEach((question, index) => {
        if (appState.userAnswers[index] === question.correct) {
            score++;
        }
    });

    appState.score = score;

    // Add to leaderboard
    const entry = {
        playerName: appState.currentPlayerName,
        category: quiz.category,
        quizName: quiz.name,
        score: score,
        totalQuestions: quiz.questions.length,
        percentage: Math.round((score / quiz.questions.length) * 100),
        date: new Date().toLocaleDateString()
    };

    appState.leaderboard.push(entry);
    appState.leaderboard.sort((a, b) => b.score - a.score);
    if (appState.leaderboard.length > 100) {
        appState.leaderboard.pop();
    }

    saveLeaderboard();
    displayResults();
    navigateTo('results');
}

// Display Results
function displayResults() {
    const percentage = Math.round((appState.score / appState.totalQuestions) * 100);
    
    let message = '';
    if (percentage === 100) {
        message = 'Perfect Score! 🎉';
    } else if (percentage >= 80) {
        message = 'Excellent! 🌟';
    } else if (percentage >= 60) {
        message = 'Good Job! 👍';
    } else if (percentage >= 40) {
        message = 'Keep Practicing! 📚';
    } else {
        message = 'Try Again! 💪';
    }

    document.getElementById('scorePercent').textContent = percentage + '%';
    document.getElementById('scoreMessage').textContent = message;
    document.getElementById('scoreStats').textContent = 
        `You answered ${appState.score} out of ${appState.totalQuestions} questions correctly.`;
}

// Review Answers
function reviewAnswers() {
    const quiz = appState.quizzes[appState.currentQuizIndex];
    const reviewList = document.getElementById('reviewList');

    const html = quiz.questions.map((question, index) => {
        const userAnswer = appState.userAnswers[index];
        const correctAnswer = question.correct;
        const isCorrect = userAnswer === correctAnswer;

        const answerLetter = (letter) => String.fromCharCode(65 + letter.charCodeAt(0) - 65);
        const userAnswerText = userAnswer ? question.options[userAnswer.charCodeAt(0) - 65] : 'Not answered';
        const correctAnswerText = question.options[correctAnswer.charCodeAt(0) - 65];

        return `
            <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="review-question">
                    ${index + 1}. ${question.question}
                </div>
                <div class="review-answer">
                    <span class="review-answer-label">Your Answer:</span>
                    <span class="review-answer-value">${userAnswer ? userAnswer + '. ' + userAnswerText : 'Not answered'}</span>
                </div>
                ${!isCorrect ? `
                    <div class="review-answer">
                        <span class="review-answer-label">Correct Answer:</span>
                        <span class="review-answer-value">${correctAnswer}. ${correctAnswerText}</span>
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');

    reviewList.innerHTML = html;
    document.getElementById('answerReview').style.display = 'block';
}

// Display Leaderboard
function displayLeaderboard(filter = 'all') {
    let filteredLeaderboard = appState.leaderboard;

    if (filter !== 'all') {
        filteredLeaderboard = appState.leaderboard.filter(entry => entry.category === filter);
    }

    const top10 = filteredLeaderboard.slice(0, 10);
    const tbody = document.getElementById('leaderboardBody');

    if (top10.length === 0) {
        document.getElementById('emptyLeaderboard').style.display = 'block';
        tbody.innerHTML = '';
        return;
    }

    document.getElementById('emptyLeaderboard').style.display = 'none';

    tbody.innerHTML = top10.map((entry, index) => {
        let badge = 'other';
        if (index === 0) badge = 'gold';
        else if (index === 1) badge = 'silver';
        else if (index === 2) badge = 'bronze';

        return `
            <tr>
                <td><span class="rank-badge ${badge}">${index + 1}</span></td>
                <td>${entry.playerName}</td>
                <td>${capitalize(entry.category)}</td>
                <td>${entry.quizName}</td>
                <td><strong>${entry.score}/${entry.totalQuestions}</strong> (${entry.percentage}%)</td>
                <td>${entry.date}</td>
            </tr>
        `;
    }).join('');
}

// CSV Upload
function uploadCSV() {
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a CSV file');
        return;
    }

    parseCSV(file);
}

// Parse CSV
function parseCSV(file) {
    const reader = new FileReader();

    reader.onload = function(e) {
        const csv = e.target.result;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());

        const quizMap = {};

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '') continue;

            const values = lines[i].split(',').map(v => v.trim());
            
            if (values.length < 8) continue;

            const quizName = values[0];
            const category = values[1].toLowerCase();
            const question = values[2];
            const optionA = values[3];
            const optionB = values[4];
            const optionC = values[5];
            const optionD = values[6];
            const correct = values[7].toUpperCase();

            if (!['A', 'B', 'C', 'D'].includes(correct)) {
                console.warn(`Invalid correct answer: ${correct}`);
                continue;
            }

            if (!['primary', 'mid', 'senior'].includes(category)) {
                console.warn(`Invalid category: ${category}`);
                continue;
            }

            if (!quizMap[quizName]) {
                quizMap[quizName] = {
                    name: quizName,
                    category: category,
                    questions: []
                };
            }

            quizMap[quizName].questions.push({
                question: question,
                options: [optionA, optionB, optionC, optionD],
                correct: correct
            });
        }

        // Add to quizzes
        let addedCount = 0;
        for (const quizName in quizMap) {
            const existingIndex = appState.quizzes.findIndex(q => q.name === quizName);
            
            if (existingIndex >= 0) {
                appState.quizzes[existingIndex] = {
                    ...quizMap[quizName],
                    id: appState.quizzes[existingIndex].id
                };
            } else {
                quizMap[quizName].id = Math.max(...appState.quizzes.map(q => q.id), 0) + 1;
                appState.quizzes.push(quizMap[quizName]);
            }
            addedCount++;
        }

        alert(`✅ Successfully uploaded ${addedCount} quiz(zes)!`);
        document.getElementById('csvFile').value = '';
        displayQuizzes();
    };

    reader.readAsText(file);
}

// Create Empty Quiz
function createEmptyQuiz() {
    const name = document.getElementById('newQuizName').value.trim();
    const category = document.getElementById('newQuizCategory').value;
    const numQuestions = parseInt(document.getElementById('numQuestions').value);

    if (!name || !category || !numQuestions) {
        alert('Please fill in all fields');
        return;
    }

    if (numQuestions < 1 || numQuestions > 50) {
        alert('Number of questions must be between 1 and 50');
        return;
    }

    const newQuiz = {
        id: Math.max(...appState.quizzes.map(q => q.id), 0) + 1,
        name: name,
        category: category,
        questions: Array(numQuestions).fill().map((_, i) => ({
            question: `Question ${i + 1}`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 'A'
        }))
    };

    appState.quizzes.push(newQuiz);
    alert('✅ Quiz created! Edit it in the Manage section.');

    document.getElementById('newQuizName').value = '';
    document.getElementById('newQuizCategory').value = '';
    document.getElementById('numQuestions').value = '';

    displayQuizzes();
}

// Render Manage Quizzes
function renderManageQuizzes() {
    const searchTerm = document.getElementById('searchQuiz').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    let filtered = appState.quizzes;

    if (searchTerm) {
        filtered = filtered.filter(q => q.name.toLowerCase().includes(searchTerm));
    }

    if (category) {
        filtered = filtered.filter(q => q.category === category);
    }

    const container = document.getElementById('quizManageList');

    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No quizzes found.</p></div>';
        return;
    }

    container.innerHTML = filtered.map((quiz, index) => `
        <div class="quiz-manage-item">
            <div class="quiz-manage-info">
                <h4>${quiz.name}</h4>
                <p>Category: ${capitalize(quiz.category)} | Questions: ${quiz.questions.length}</p>
            </div>
            <div class="quiz-manage-actions">
                <button class="btn btn-secondary" onclick="editQuiz(${quiz.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteQuiz(${quiz.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Edit Quiz
function editQuiz(quizId) {
    const quiz = appState.quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    const modal = document.getElementById('editQuizModal');
    const form = document.getElementById('editQuizForm');

    form.innerHTML = `
        <div class="form-group">
            <label>Quiz Name:</label>
            <input type="text" id="editQuizName" value="${quiz.name}" class="form-input">
        </div>
        <div class="form-group">
            <label>Category:</label>
            <select id="editQuizCategory" class="form-input">
                <option value="primary" ${quiz.category === 'primary' ? 'selected' : ''}>Primary</option>
                <option value="mid" ${quiz.category === 'mid' ? 'selected' : ''}>Mid</option>
                <option value="senior" ${quiz.category === 'senior' ? 'selected' : ''}>Senior</option>
            </select>
        </div>
        <div id="questionsContainer" class="form-group">
            ${quiz.questions.map((q, idx) => `
                <div style="background: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 10px;">
                    <label>Question ${idx + 1}:</label>
                    <input type="text" value="${q.question}" class="form-input" style="margin-bottom: 10px;" 
                           onchange="updateQuestion(${quizId}, ${idx}, 'question', this.value)">
                    ${q.options.map((opt, oIdx) => `
                        <input type="text" value="${opt}" class="form-input" style="margin-bottom: 5px;"
                               onchange="updateQuestion(${quizId}, ${idx}, 'option${String.fromCharCode(65 + oIdx)}', this.value)"
                               placeholder="Option ${String.fromCharCode(65 + oIdx)}">
                    `).join('')}
                    <select class="form-input" onchange="updateQuestion(${quizId}, ${idx}, 'correct', this.value)">
                        <option value="A" ${q.correct === 'A' ? 'selected' : ''}>A</option>
                        <option value="B" ${q.correct === 'B' ? 'selected' : ''}>B</option>
                        <option value="C" ${q.correct === 'C' ? 'selected' : ''}>C</option>
                        <option value="D" ${q.correct === 'D' ? 'selected' : ''}>D</option>
                    </select>
                </div>
            `).join('')}
        </div>
        <button class="btn btn-success btn-block" onclick="saveQuizEdit(${quizId})">Save Changes</button>
    `;

    modal.classList.add('active');
}

// Update Question
function updateQuestion(quizId, questionIndex, field, value) {
    const quiz = appState.quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    const question = quiz.questions[questionIndex];

    if (field === 'question') {
        question.question = value;
    } else if (field === 'correct') {
        question.correct = value;
    } else if (field.startsWith('option')) {
        const optionIndex = field.charCodeAt(6) - 65; // A=0, B=1, C=2, D=3
        question.options[optionIndex] = value;
    }
}

// Save Quiz Edit
function saveQuizEdit(quizId) {
    const quiz = appState.quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    quiz.name = document.getElementById('editQuizName').value;
    quiz.category = document.getElementById('editQuizCategory').value;

    alert('✅ Quiz updated successfully!');
    closeEditModal();
    renderManageQuizzes();
}

// Close Edit Modal
function closeEditModal() {
    document.getElementById('editQuizModal').classList.remove('active');
}

// Delete Quiz
function deleteQuiz(quizId) {
    if (confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
        appState.quizzes = appState.quizzes.filter(q => q.id !== quizId);
        alert('✅ Quiz deleted successfully!');
        renderManageQuizzes();
    }
}

// Leaderboard Persistence
function saveLeaderboard() {
    localStorage.setItem('quizboxLeaderboard', JSON.stringify(appState.leaderboard));
}

function loadLeaderboard() {
    const saved = localStorage.getItem('quizboxLeaderboard');
    if (saved) {
        try {
            appState.leaderboard = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading leaderboard:', e);
            appState.leaderboard = [];
        }
    }
}

// Utility Functions
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const playerModal = document.getElementById('playerModal');
    const editQuizModal = document.getElementById('editQuizModal');

    if (event.target === playerModal) {
        closePlayerModal();
    }
    if (event.target === editQuizModal) {
        closeEditModal();
    }
});
