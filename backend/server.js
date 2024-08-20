const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');
const client = new OpenAI({apiKey: process.env.OPENAI_KEY || "test"})

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(express.static(path.join(__dirname, '/dist')));

const PORT = process.env.PORT || 8000;

router.post('/quiz', async (req, res) => {
    const { topic, level, questionNum, style } = req.body;
    try {
        const chatCompletion = await chatGPT(
            [{
                role: "system",
                content: `
                Create a ${questionNum} question quiz in a difficulty level of ${level} regarding ${topic}.
                Strictly follow the format shown below inside the ellipses and replace the words Generated question with the question.
                
                ...
                    question 1,,,question 2,,,question 3,,,question n
                ...
                
                Ensure it is obvious that you are Jedi and that a(n) ${level} could answer the question.
                Your response should not consist of any other words, even a question title, and don't include the ellipses but do include three commas between every question like in the format.
                `
            }]);
            res.json({
                level,
                style,
                questions: chatCompletion.choices[0].message.content.split(',,,')
            })
    } catch (err) {
        console.error(err, 'Error: Invalid response');
        res.json({
            content: "\n\nThis is a test!",
            level,
            style,
            questions: ['How do you create a function in JavaScript??', 'What is the valid way to declare a JavaScript variable?', 'What is used to comment a single line in JavaScript?', 'console.log(2 + "2")', 'What method can be used to find the length of a string in JavaScript?']
        })
    }
})

router.post('/results', async (req, res) => {
    const { questions, style, level, answers } = req.body;
    let chatCompletion = {};
    try {
        chatCompletion = await chatGPT(
        [{  role: "system",
            content: `
            Grade the response to the questions '${questions}' in the style of ${style}
            and grade the response according to the level of a(n) ${level}.
            Grade the response as correct if it is at least half-way correct.
            Start with either saying 'Yes' if the response is correct or 'No' if the response does not adequately answer the question.
            Then include a detailed paragraph explaining why it is correct or incorrect.
            Do not include double quotes in the paragraph.
            It is imperative that every response is separated by three commas (,,,).
            
            
            Here are the responses:
            ${answers}
            
            In your response follow the format shown below inside the ellipses.
            Strictly follow the format shown below ensuring each explanation is separated with three commas.
            ...
            Yes/No Explanation to question 1,,,Yes/No Explanation to question 2,,,Yes/No Explanation to question 3,,,Yes/No Explanation to question n,,,
            ...
            
            Ensure it is obvious that you are ${style} and that the question is graded according to a(n) ${level}.
            Include at least one reference to pop culture per question that ensures it is obvious to the reader that you are ${level}.

            Include no other words and do not include ellipses.
            Redo the responses if every they are not accurately separated by three commas (,,,).
            Include no spaces or other characters before 'No' or 'Yes' at the beginning. 
            `}
    ]);
        const result = chatCompletion.choices[0].message.content.split(',,,');
        res.json(result);
    } catch (err) {
        console.error(err, 'Error: Invalid response');
        res.json([
            'Yes ffdsfsf this is wrong',
            'No dasda this is correct dfnsajuifhbsadfjkuhda sfjhsjadf jdsahf'
        ]);
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/', 'index.html'));
});

async function chatGPT(prompt) {
    return await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: prompt,
        temperature: 1
    });
}

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));