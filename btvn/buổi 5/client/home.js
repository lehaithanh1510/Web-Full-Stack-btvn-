let idQuestion = undefined
const getRandomQuestion = () => {
    $.ajax ({
        url: `http://localhost:3000/random-question/`,
        method: "GET",
        success : (res) => {
            if (res.success) {
                const question = res.data;
                const {content} = question;
                idQuestion = res.data.id;
                document.getElementById("contentQuestion").innerText = content;
            }
        },
        error : (res) => {
            console.log(res)
        },
    })
}
getRandomQuestion()

const otherQuestionBtn = document.getElementById("otherQuestion");
otherQuestionBtn.addEventListener('click',()=> {
    getRandomQuestion()
})
const voteResultButton = document.getElementById("voteResult"); 
voteResultButton.addEventListener('click', () => {
    window.location.href = "http://localhost:3000/question/" + idQuestion
})
document.getElementById("answerYes").addEventListener("click", () => {
    $.ajax ({
        url: `http://localhost:3000/voteYes-question/${idQuestion}`,
        type : "POST",
        success: (res) => {
            if (res.success) {
                console.log(res)
            }
        },
        error: (err) => {
            console.log(err)
        }
    })
    window.location.href = "http://localhost:3000/question/" + idQuestion
})
document.getElementById("answerNo").addEventListener("click", () => {
    $.ajax ({
        url: `http://localhost:3000/voteNo-question/${idQuestion}`,
        type : "POST",
        success: (res) => {
            if (res.success) {
                console.log(res)
            }
        },
        error: (err) => {
            console.log(err)
        }
    })
    window.location.href = "http://localhost:3000/question/" + idQuestion
})