const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs for notes

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

app.get('/true_false', (req, res) => {
  res.render('true_false');
});

app.post('/true_false', (req, res) => {
  const answers = req.body;
  const correctAnswers = { Q1: 'False', Q2: 'True', Q3: 'True', Q4: 'False' };  // Add more questions as needed
  let feedback = {};
  let score = 0;
  let correctAnswerDisplay = {};

  // Loop through each question and check the answer
  for (let question in correctAnswers) {
    correctAnswerDisplay[question] = correctAnswers[question];  // Store correct answer for each question
    if (answers[question] === correctAnswers[question]) {
      feedback[question] = 'correct';
      score += 1;
    } else {
      feedback[question] = 'wrong';
    }
  }

  res.render('true_false', { feedback, score, correctAnswerDisplay });
});

app.get('/essay', (req, res) => {
  res.render('essay');
});

app.post('/essay', (req, res) => {
  const answers = req.body;

  // Store essay answer somewhere for review
  // Render a thank-you page or feedback
  res.send('Your essay has been submitted for review.');
});

app.get('/checkbox', (req, res) => {
  res.render('checkbox');
});

app.post('/checkbox', (req, res) => {
  const answers = req.body || [];
  const correctAnswers = {
    q1: ['hybrid', 'public'],  // Question 1 correct answers
    q2: ['wide area network', 'wireless local area network', 'local area network'],  //Question 2 correct answers
    q3: ['all of the above'],  //Question 3 correct answers
    q4: ['they check software or files before they are run or loaded on a computer', 'anti-virus software needs to be kept up to date because new viruses are constantly being discovered'],  //Question 4 correct answer
  };
  
  let feedback = {};
  let score = 0;
  let correctAnswerDisplay = {};  // Display correct answers for the user

  // Loop through each question
  for (let question in correctAnswers) {
  const userAnswers = req.body[question] || [];  // User's answers for this question
  const correct = correctAnswers[question];      // Correct answers for this question

  // Checking correct answers
  const isCorrect = correct.every(answer => userAnswers.includes(answer)) && userAnswers.length === correct.length;

 // Dynamically store feedback for the specific question
 if (isCorrect) {
  feedback[question] = 'correct';
  score += 1;
} else {
  feedback[question] = 'wrong';
}

  // Store the correct answers for display
  correctAnswerDisplay[question] = correct.join(',');
}

  res.render('checkbox', { feedback, score, correctAnswerDisplay });
});

let userNotes = []; // Global array to store notes
let notesDatabase = []; // Simulating a database with an in-memory array

app.get('/notes', (req, res) => {
  // Fetch user's notes from database and render the notes page
  res.render('notes', { notes: notesDatabase });
});

app.post('/notes', (req, res) => {
  const newNote = {
    id: uuidv4(), // Generate a unique ID for each note
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
    dateCreated: new Date()
  };
  
  // Save the note to the database
  notesDatabase.push(newNote);
  res.redirect('/notes');
});

// Delete note by ID
app.post('/notes/delete/:id', (req, res) => {
  const noteId = req.params.id;

  // Filter out the note with the specific ID
  notesDatabase = notesDatabase.filter(note => note.id !== noteId);

  res.redirect('/notes');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
