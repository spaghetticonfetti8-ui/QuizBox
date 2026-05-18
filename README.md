# QuizBox - Interactive Quiz Platform

A comprehensive web-based quiz platform built entirely with HTML and CSS, featuring age-based categories, dynamic question management, and a live leaderboard system.

## Features

### 🎯 Quiz Categories
- **Primary** (Under 10 years): Age-appropriate beginner quizzes
- **Mid** (11-18 years): Intermediate level quizzes
- **Senior** (18+ years): Advanced level quizzes

### 📝 Quiz Management
- **Upload Questions**: Import quizzes via CSV/Excel spreadsheets
- **Dynamic Question Count**: Set custom number of questions per quiz
- **Question Format**: Supports multiple-choice questions (A, B, C, D)
- **Quiz Administration**: Create, edit, and delete quizzes

### 🏆 Leaderboard System
- **Top 10 Rankings**: View the best performers across all quizzes
- **Score Tracking**: Automatic score calculation and ranking
- **Category Filter**: See top performers by age category
- **Timestamp Recording**: Track when each quiz was completed

### ✨ User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Progress Tracking**: Visual progress bar during quiz taking
- **Instant Results**: Immediate feedback with detailed answer review
- **Answer Review**: See correct and incorrect answers with explanations

## File Structure

```
QuizBox/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## How to Use

### 1. Taking a Quiz
1. Click "Take Quiz" from the home page
2. Select your age category (Primary, Mid, or Senior)
3. Choose a quiz from the available options
4. Enter your name when prompted
5. Answer all questions using the Next/Previous buttons
6. Submit your quiz
7. View your results and detailed answer review

### 2. Uploading Quiz Questions

#### CSV Format
Upload a CSV file with the following columns:
| Quiz Name | Category | Question | Option A | Option B | Option C | Option D | Correct Answer |
|-----------|----------|----------|----------|----------|----------|----------|----------------|
| Math Quiz | primary  | What is 2+2? | 3 | 4 | 5 | 6 | B |
| Science Quiz | mid | What is H2O? | Hydrogen | Water | Oxygen | Salt | B |

**Important Notes:**
- Category must be: `primary`, `mid`, or `senior`
- Correct Answer must be: `A`, `B`, `C`, or `D`
- All fields are required
- Use CSV format for automatic parsing

### 3. Managing Quizzes
1. Go to "Admin Panel"
2. Click "Manage Quizzes"
3. Filter by category or view all
4. Edit or delete existing quizzes
5. View question counts and details

### 4. Viewing Leaderboard
1. Click "Leaderboard" in the navigation
2. See top 10 performers sorted by score
3. View player names, categories, scores, and dates
4. Gold/Silver/Bronze badges for top 3

## Sample Quiz Data

The platform comes with pre-loaded sample quizzes:
- **General Knowledge Quiz** (Primary) - 5 questions
- **Science Quiz** (Mid) - 6 questions
- **History Quiz** (Senior) - 7 questions

## Technical Details

### Built With
- **HTML5**: Semantic structure and forms
- **CSS3**: Advanced styling, gradients, animations, and responsive design
- **JavaScript (Vanilla)**: No dependencies, pure JavaScript

### Key Features
- Client-side data storage (localStorage-compatible structure)
- Responsive grid and flexbox layouts
- Smooth animations and transitions
- Form validation
- Dynamic DOM manipulation
- CSV parsing

## Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --success-color: #10b981;
    /* ... more colors ... */
}
```

### Adding More Questions
Edit `script.js` and add to the `appState.quizzes` array following the existing format.

### Modifying Category Names
Update the category labels in `renderManageQuizzes()` function.

## Sample CSV Format

```csv
Quiz Name,Category,Question,Option A,Option B,Option C,Option D,Correct Answer
Math Quiz,primary,What is 2 + 2?,3,4,5,6,B
Science Quiz,mid,What is the chemical symbol for Gold?,Go,Gd,Au,Ag,C
History Quiz,senior,In which year did World War II end?,1943,1944,1945,1946,C
```

## Future Enhancements

Potential features for future versions:
- User authentication and accounts
- Persistent data storage (Backend/Database)
- Timer for quizzes
- Difficulty levels
- Category-based scoring
- Certificate generation
- Analytics dashboard
- Social sharing

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please refer to the inline comments in the code files.

---

**QuizBox** - Making learning fun and interactive! 🎓
