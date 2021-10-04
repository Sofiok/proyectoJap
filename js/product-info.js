//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productInfo = {}
var currentProductsArray = [];

document.addEventListener("DOMContentLoaded", function(e){
//invoca la funcion getJSONData, espera la respuesta de la URL y cuando obtiene la respuesta se lo asigno a value
  getJSONData(PRODUCT_INFO_URL).then( (value) => {
      //asigno a cada carousel item una imagen 
        document.getElementById('img1').src = value.data.images[0]
        document.getElementById('img2').src = value.data.images[1]
        document.getElementById('img3').src = value.data.images[2]
        document.getElementById('img4').src = value.data.images[3]
        document.getElementById('img5').src = value.data.images[4]
        //asigno a cada elemento sus atributos y los imprimo en pantalla
        document.getElementById('nombre').innerHTML = value.data.name
        document.getElementById('precio').innerHTML = `${value.data.currency}  ${value.data.cost}`
        document.getElementById('descripcion').innerHTML = value.data.description
        productInfo = value.data
    }).then(()=>{
        getProducts().then(()=> {
            displayRelatedProduct()
        })
    })
    //activo el carosuel para que sea dinamico y que cada 2 segundos muestre otra automaticamente
    $('.carousel').carousel({
        interval: 2000
    })
    
});

//funcion asincronica que espera la respuesta de la api de productos 
let getProducts = async () => {
    //invoca la funcion getJSONData, espera la respuesta de la URL y la guarda en la variable
    // currentProductsArray
    let response = await getJSONData(PRODUCTS_URL)
    currentProductsArray = response.data
};

let displayRelatedProduct = () => {
    let htmlContentToAppend = "";
    productInfo.relatedProducts.forEach( (element) => {
        let = product = currentProductsArray[element]
        htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
       
    })
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}