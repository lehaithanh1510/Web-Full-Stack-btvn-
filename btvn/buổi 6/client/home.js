let idQuestion = undefined
const getRandomQuestion = () => {
    $.ajax({
        url: `http://localhost:3000/random-question/`,
        method: "GET",
        success: (res) => {
            if (res.success) {
                const question = res.data;
                const { content } = question;
                idQuestion = res.data.id;
                $("#contentQuestion").html(content);
            }
        },
        error: (res) => {
            console.log(res)
        },
    })
}
getRandomQuestion()

const otherQuestionBtn = $("#otherQuestion");
otherQuestionBtn.on('click', () => {
    getRandomQuestion()
})
const voteResultButton = $("#voteResult");
voteResultButton.on('click', () => {
    window.location.href = "http://localhost:3000/question/" + idQuestion
})
const sendRequestVote = (type) => {
    $.ajax({
        url: `http://localhost:3000/vote-question/${idQuestion}/${type}`,
        method: "GET",
        success: (res) => {
            console.log(res);
            window.location.href = "http://localhost:3000/question/" + idQuestion

        },
        error: (err) => {
            console.log(err);
        }
    })
}
// document.getElementById("answerYes").addEventListener("click", () => {
//     $.ajax ({
//         url: `http://localhost:3000/voteYes-question/${idQuestion}`,
//         type : "POST",
//         success: (res) => {
//             if (res.success) {
//                 console.log(res)
//             }
//         },
//         error: (err) => {
//             console.log(err)
//         }
//     })
//     window.location.href = "http://localhost:3000/question/" + idQuestion
// })
// document.getElementById("answerNo").addEventListener("click", () => {
//     $.ajax ({
//         url: `http://localhost:3000/voteNo-question/${idQuestion}`,
//         type : "POST",
//         success: (res) => {
//             if (res.success) {
//                 console.log(res)
//             }
//         },
//         error: (err) => {
//             console.log(err)
//         }
//     })
//     window.location.href = "http://localhost:3000/question/" + idQuestion
// })

$("#answerNo").on("click", () => {
    sendRequestVote("no")
})
$("#answerYes").on("click", () => {
    sendRequestVote("yes")
})