const { response } = require("express");
const express = require("express");
const path = require("path")
const bodyParser = require("body-parser")
const fs = require('fs');
const { json } = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('client'))

app.get("/", (req, res) => {
    const pathFile = path.resolve(__dirname, "client/home.html");
    res.sendFile(pathFile)
})

app.get('/ask', (req, res) => {
    const pathFile = path.resolve(__dirname, "./client/create-question.html")
    res.sendFile(pathFile)
})
// app.get('/detail-question.css', (req, res) => {
//     const pathFile = path.resolve(__dirname, "./client/detail-question.css")
//     res.sendFile(pathFile)
// })
app.listen(3000, (err) => {
    if (err) throw err;
    console.log("Server started");
})
app.post('/create-question', (req, res) => {
    const { content } = req.body
    // đọc data câu hỏi  cũ 
    fs.readFile('data.json', (err, data) => {
        const oldQuestions = JSON.parse(data);
        // Tạo question mới từ data     
        const newQuestion = {
            id: oldQuestions.length,
            content,
            yesCount: 0,
            noCount: 0,
        }
        // Add question mới vào đuôi của file
        const newQuestions = [...oldQuestions, newQuestion];
        fs.writeFile('data.json', JSON.stringify(newQuestions), (err) => {
            if (err) return res.send({ success: 0 })
            res.send({ success: 1, data: newQuestion })
        })
    })

})
app.get('/question/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/detail-question.html"))

})
app.get('/detail-question/:id', (req, res) => {
    // res.sendFile(path.resolve(__dirname, "./client/detail-question.html"))
    const idQuestion = req.params.id;
    fs.readFile('data.json', (err, data) => {
        if (err) {
            return res.send({ success: 0 });
        }
        const questions = JSON.parse(data);
        const foundQuestion = questions.find(q => q.id === parseInt(idQuestion))
        if (!foundQuestion) {
            return res.send({ success: 0 });
        }
        return res.send({ success: 1, data: foundQuestion });
    })
})

app.get('/random-question', (req, res) => {
    // const pathFile = path.resolve(__dirname, "./client/home.html")
    // res.sendFile(pathFile)
    fs.readFile('data.json', (err, data) => {
        if (err) {
            return res.send({ success: 0 });
        }
        const questions = JSON.parse(data);
        const randomIndex = Math.floor(Math.random()*questions.length);
        const foundQuestion = questions[randomIndex];
        return res.send({ success: 1, data: foundQuestion });
    })
})
app.post("/voteYes-question/:id", (req,res) => {
    const idQuestion = req.params.id;
    fs.readFile("data.json", (err,data) => {
        if (err) {
            return res.send({success: 0});
        }
        const questions = JSON.parse(data)
        const foundQuestion = questions.find(q => q.id === parseInt(idQuestion))
        foundQuestion.yesCount ++ ;
        fs.writeFile("data.json",JSON.stringify(questions), (err) => {
            if (err) return res.send({success:0})
            res.send({success: 1, data :foundQuestion})
        })
    })
})
app.post("/voteNo-question/:id", (req,res) => {
    const idQuestion = req.params.id;
    fs.readFile("data.json", (err,data) => {
        if (err) {
            return res.send({success: 0});
        }
        const questions = JSON.parse(data)
        const foundQuestion = questions.find(q => q.id === parseInt(idQuestion))
        foundQuestion.noCount ++ ;
        fs.writeFile("data.json",JSON.stringify(questions), (err) => {
            if (err) return res.send({success:0})
            res.send({success: 1, data :foundQuestion})
        })
    })
})
app
app.get('*', (req, res) => {
    res.send({ say: '404' });
})
