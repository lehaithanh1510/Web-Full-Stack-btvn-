const textArea = $(".formQuestion");
const form = $("#questionForm");
form.on("submit", (e) => {
    e.preventDefault();
    console.log("Form submited");
    const content = textArea.val();
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
textArea.on("input", () => {
    const content = textArea.val()
    const restCharacterLength = 200 - content.length;
    const restSpan = $("#rest");
    restSpan.html(restCharacterLength) 
})