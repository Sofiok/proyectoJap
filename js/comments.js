var comments = [];

let saveComment = () => {
    let date = new Date();
    let formatDate = date.getDate().toString().padStart(2, '0') + "/" + (date.getMonth() +1).toString().padStart(2, '0') + "/" + date.getFullYear().toString() + "  " + date.getHours() + ":" + date.getMinutes();
    comment = {
        message: document.getElementById("textarea").value,
        completeDate: formatDate,
        score: document.getElementById("score").value,
        user: localStorage.getItem("userName")
    }

    comments.push(comment);
    showComment();
}
//funcion que trae los comentarios desde la url y los agrega al array de comentarios 
let getComments = () =>{
    getJSONData( PRODUCT_INFO_COMMENTS_URL).then( (value) => {
        //iterar sobre cada elemento y creo un objeto comentarios que agrego a la variable comment
        value.data.forEach(element => {
            comment = {
                message: element.description,
                completeDate: element.dateTime,
                score: element.score,
                user: element.user
            }
            
            comments.push(comment);
        })
        //muestro todos los comentarios guardados
        showComment();
    })

}

let drawStars = (stars) =>{

    let number = parseInt(stars);
    let html="";
    for(let i =1; i<=number;i++){
        html +=`<span class="fa fa-star checked"></span>`

    }
    for(let j=number+1;j<=5;j++){
        html +=`<span class="fa fa-star"></span>`
    }    
    return html;

}

let showComment = () => {
    let html = ""
    for (let i = comments.length - 1; i >= 0; i--) {
        let comment = comments[i];
        html += `<div class= "bd-example">
                    <dl>
                        <dt>${comment.user} - ${comment.completeDate} - ${drawStars(comment.score)}</dt>
                        <dd>${comment.message}</dd>
                    </dl>
                </div>`

    }



    document.getElementById("comentarios").innerHTML = html;
    document.getElementById("formulario").reset();
}

document.addEventListener("DOMContentLoaded", function (e) {
//llamada a la funcion para que se impriman en pantalla
    getComments()

})
