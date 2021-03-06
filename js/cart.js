var currentCart = []
var total = 0



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getCart().then((cart) => {
        renderCart(cart.articles)
    })


});

let getCart = async () => {
    //invoca la funcion getJSONData, espera la respuesta de la URL y la guarda en la variable
    // currentProductsArray
    let response = await getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json")
    currentCart = response.data
    return response.data
};

let renderCart = (cart) => {
    let htmlcontent = `<tr>
    <th></th>
    <th>Nombre</th>
    <th>Precio</th>
    <th>Cantidad</th>
    <th>Subtotal</th>
  </tr>`
    //convierto lo que viene en dolares a pesos
    cart.forEach(element => {
        let cost = element.unitCost
        if (element.currency != 'UYU') {
            cost = element.unitCost * 40
        }
        htmlcontent += `
        <tr>
        <td><img src="${element.src}" width="200">
        <td>${element.name}</td>
        <td><span> UYU </span><span> ${cost}</span></td>
        <td><input type="number" name="" class="cart-item-count" value="${element.count}"></td>
        <td class="subtotal">${element.count * cost}</td>
        </tr>
        `
        total += element.count * cost
    });

    htmlcontent += `<tr>
    <td></td>
    <td></td>
    <td></td>
    <td>Total :</td>
    <td id="total">${total}</td>
    </tr>`
    document.getElementById('cart').innerHTML += htmlcontent
    // Obtengo la lista de elementos cantidad en el carrito
    const items = document.getElementsByClassName('cart-item-count')
    // A cada elemento de la lista...
    Array.from(items).forEach(item => {
        // Le asigno un eventListener escuchando el evento change
        item.addEventListener("change", function (e) {
            // Obtengo el precio unitario del elemento seleccionado accediendo al target del evento disparado
            // y navegando hasta el valor del precio unitario en el html
            let unitPrice = e.target.parentElement.previousElementSibling.children[1].innerText
            // Calculo el subtotal para este elemento usando el nuevo valor de cantidad del input
            e.target.parentElement.nextElementSibling.innerHTML = unitPrice * parseInt(e.target.value)
            // Busco todos los elementos de subtotal para calcular el total general
            let subtotals = document.getElementsByClassName('subtotal')
            total = 0
            // Sumo cada elemento subtotal y lo asigno a la variable total para mostrarlo en el carrito
            Array.from(subtotals).forEach(subtotal => {
                total += parseFloat(subtotal.innerText)
            })
            document.getElementById('total').innerText = total
            actulizarTotales(total)
        })
    })
    actulizarTotales(total)


}
let validar = (evt)=>{
    if ($('#calle').val() == "") {
        alert('Ingrese calle');
        return false;
    }
    if($('#numeroDpuerta').val()==""){
        alert('Ingrese numero');
        return false
    }
    if($('#esquina').val()==""){
        alert('Ingrese esquina');
        return false
    }
    $('#exampleModal').modal('show')
};

//funcion que devuelve el valor del radio button seleccionado
let valorSeleccionado = () => {
    let valor
    if (document.getElementById("envioRadios1").checked) {
        valor = document.getElementById("envioRadios1").value
    }

    if (document.getElementById("envioRadios2").checked) {
        valor = document.getElementById("envioRadios2").value
    }
    if (document.getElementById("envioRadios3").checked) {
        valor = document.getElementById("envioRadios3").value
    }
    //convierto a numero a lo que me devuelva (valor)
    return Number(valor)
}




//eventos que hacen abrir opciones modal tipo accordeon
$('#r11').on('click', function () {
    $(this).parent().find('a').trigger('click')
    $('#collapseTwo').collapse('hide')
})

$('#r12').on('click', function () {
    $(this).parent().find('a').trigger('click')
    $('#collapseOne').collapse('hide')
})

//funcion para actulizar subtotal y total con porcentajes por envio seleccionado
let actulizarTotales = (subtotal) => {
    document.getElementById("subtotal").innerHTML = subtotal
    let envio = subtotal * (valorSeleccionado() / 100)
    document.getElementById("costoDeEnvio").innerHTML = envio
    document.getElementById("totalFinal").innerHTML = envio + subtotal
}
const items = document.getElementsByClassName('radio-envio')
// A cada elemento de la lista...
Array.from(items).forEach(item => {
    // Le asigno un eventListener escuchando el evento click
    item.addEventListener("click", function (e) {

        actulizarTotales(total)
    })
})