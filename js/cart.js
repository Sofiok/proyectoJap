var currentCart = []



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    getCart().then((cart)=>{
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

 let renderCart = (cart) =>{
    let total = 0
    let htmlcontent =`<tr>
    <th></th>
    <th>Nombre</th>
    <th>Precio</th>
    <th>Cantidad</th>
    <th>Subtotal</th>
  </tr>`
    cart.forEach(element => {
        let cost = element.unitCost
        if (element.currency != 'UYU') {
            cost = element.unitCost * 40
        }
        htmlcontent +=`
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
    document.getElementById('cart').innerHTML+= htmlcontent
    // Obtengo la lista de elementos cantidad en el carrito
    const items = document.getElementsByClassName('cart-item-count')
    // A cada elemento de la lista...
    Array.from(items).forEach(item => {
        // Le asigno un eventListener escuchando el evento change
        item.addEventListener("change", function(e){
            // Obtengo el precio unitario del elemento seleccionado accediendo al target del evento disparado
            // y navegando hasta el valor del precio unitario en el html
            let unitPrice = e.target.parentElement.previousElementSibling.children[1].innerText
            // Calculo el subtotal para este elemento usando el nuevo valor de cantidad del input
            e.target.parentElement.nextElementSibling.innerHTML = unitPrice * parseInt(e.target.value)
            // Busco todos los elementos de subtotal para calcular el total general
            let subtotals = document.getElementsByClassName('subtotal')
            let total = 0
            // Sumo cada elemento subtotal y lo asigno a la variable total para mostrarlo en el carrito
            Array.from(subtotals).forEach(subtotal => {
                total += parseFloat(subtotal.innerText)
            })
            document.getElementById('total').innerText = total
        })
    })
    
 }