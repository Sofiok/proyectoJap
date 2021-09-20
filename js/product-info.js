//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productInfo = {}
document.addEventListener("DOMContentLoaded", function(e){
//invoca la funcion getJSONData, espera la respuesta de la URL y cuando obtiene la respuesta se lo asigno a value
  getJSONData( PRODUCT_INFO_URL).then( (value) => {
      //asigno a cada carousel itema una imagen 
        document.getElementById('img1').src = value.data.images[0]
        document.getElementById('img2').src = value.data.images[1]
        document.getElementById('img3').src = value.data.images[2]
        document.getElementById('img4').src = value.data.images[3]
        document.getElementById('img5').src = value.data.images[4]
        //asigno a cada elemento sus atributos y los imprimo en pantalla
        document.getElementById('nombre').innerHTML = value.data.name
        document.getElementById('precio').innerHTML = `${value.data.currency}  ${value.data.cost}`
        document.getElementById('descripcion').innerHTML = value.data.description
    })
    //activo el carosuel para que sea dinamico y que cada 2 segundos muestre otra automaticamente
    $('.carousel').carousel({
        interval: 2000
    })

   
});



