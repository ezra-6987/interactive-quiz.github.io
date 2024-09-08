const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));  // Serve static files (CSS, images, etc.)

app.set('view engine', 'ejs');

// Home route - Welcome page
app.get('/', (req, res) => {
  res.render('index');
});

// Quiz route - Displays quiz
app.get('/quiz', (req, res) => {
  res.render('quiz', { feedback: {}, score: null });
});

// Quiz submission - Calculate score
app.post('/quiz', (req, res) => {
    const answers = req.body;
    let feedback = {};
    let score = 0;

    // Correct answers
    const correctAnswers = {
        q1: 'correct', // Printer
        q2: 'correct', // Hardware & Software
        q3: 'correct', // Internal & External
        q4: 'correct', // RAM
        q5: 'correct', // Programs that allow the user to do specific tasks
        q6: 'correct', // Solid-state drive
        q7: 'correct', // Read-only memory (ROM)
        q8: 'correct', // Command line interface (CLI)
        q9: 'correct', // Artificial Intelligence (AI)
        q10: 'correct', // Mobile computers
    };

    // Compare user's answers with correct answers
    for (let question in correctAnswers) {
        if (answers[question] === correctAnswers[question]) {
            feedback[question] = 'correct';
            score += 1;
        } else {
            feedback[question] = 'wrong';
        }
    }

    // Render the quiz page again with the feedback and score
    res.render('quiz', { feedback, answers, score });
});

  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
