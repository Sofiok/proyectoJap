const ORDER_ASC_BY_COST = "ASC";
const ORDER_DESC_BY_COST = "DESC";
const ORDER_BY_SOLD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        generarTabla();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        generarTabla();
    });

    //llamada a la funcion asincrona
    getProducts()

});

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) {
                return -1;
            }
            if (a.cost > b.cost) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) {
                return -1;
            }
            if (a.cost < b.cost) {
                return 1;
            }
            return 0;
        });
    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) {
                return -1;
            }
            if (aCount < bCount) {
                return 1;
            }
            return 0;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro los productos ordenados
    generarTabla();
}

//funcion asincronica que espera la respuesta de la api de productos 
let getProducts = async () => {
    //invoca la funcion getJSONData, espera la respuesta de la URL y la guarda en la variable
    // currentProductsArray
    let response = await getJSONData(PRODUCTS_URL)
    currentProductsArray = response.data
    generarTabla()
};


let generarTabla = () => {
    // Obtener la referencia del elemento container
     var container = document.getElementsByClassName("container p-5")[0]
    // Borro el contenido del contenedor para reemplazarlo con la nueva informacion
    container.innerHTML= " "
    // Crea un elemento <table> y un elemento <tbody>
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    // Crea las celdas
    currentProductsArray.forEach(element => {
        if (((minCount == undefined) || (minCount != undefined && parseInt(element.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(element.cost) <= maxCount))){
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
            }
    })
    tabla.appendChild(tblBody);

    container.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "1";
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