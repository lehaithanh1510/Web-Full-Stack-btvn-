const pathName = window.location.pathname 
const idQuestion = pathName.split("/").pop() ;

$.ajax ({
    url: `http://localhost:3000/detail-question/${idQuestion}`,
    method: "GET",
    success : (res) => {
        if (res.success) {
            const question = res.data
            console.log(question)
            const {content, id ,yesCount :yes, noCount :no} = question
            const total = parseInt(yes) + parseInt(no);
            const percentYes = total !== 0 ? (parseInt(yes)*100/total).toFixed(2) : 50 ;
            const percentNo  = (100 - percentYes).toFixed(2)
            console.log(percentYes)
            $("#contentQuestion").html(content);
            $("#totalVote").html(total);
            $("#percentYes").html(percentYes) ;
            $("#percentNo").html(percentNo) ;
            $("button").on("click", () => {
                window.location.href = "http://localhost:3000"
            })

        }
    },
    error : (res) => {
        console.log(res)
    },
})