//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    //llamada a la funcion asincrona
    getProducts()

});
//funcion asincronica que espera la respuesta de la api de productos 
let getProducts = async () => {
    //invoca la funcion getJSONData y espera la respuesta de la URL
    let response = await getJSONData(PRODUCTS_URL)
    generar_tabla(response.data)

};


let generar_tabla = (data) => {
    // Obtener la referencia del elemento container
    var container = document.getElementsByClassName("container p-5")[0]
    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    // Crea las celdas
    data.forEach(element => {
        var hilera = document.createElement("tr");
        var celda = document.createElement("td");
        const img = new Image(200, 100); // width, height
        img.src = element.imgSrc;

        celda.appendChild(img);
        hilera.appendChild(celda);
        tblBody.appendChild(hilera);

        createTd(element.name, hilera, tblBody)
        createTd(element.description, hilera, tblBody)
        createTd(`${element.currency} ${element.cost}`, hilera, tblBody)

    })
    tabla.appendChild(tblBody);

    container.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "1");
}

let createTd = (text, hilera, tblBody) => {
    var celda = document.createElement("td");
    celda.classList.add("mystyle");
    var textoCelda = document.createTextNode(text);
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
    tblBody.appendChild(hilera);

}

