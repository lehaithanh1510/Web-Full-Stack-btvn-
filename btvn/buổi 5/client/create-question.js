const textArea = document.querySelector(".formQuestion");
const form = document.getElementById("questionForm");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form submited");
    const content = textArea.value;
    $.ajax({
        url: "http://localhost:3000/create-question",
        type: 'POST',
        data: {
            content
        },
        success: (res) => {
            if (res.success) {
                const idQuestion = res.data.id ;
                window.location.href = "http://localhost:3000/question/" + idQuestion; 
            }
        },
        error: (err) => {
            console.log(err)
        }
    })
})
textArea.addEventListener("input", () => {
    const content = textArea.value
    const restCharacterLength = 200 - content.length;
    const restSpan = document.getElementById("rest");
    restSpan.innerHTML = restCharacterLength
})