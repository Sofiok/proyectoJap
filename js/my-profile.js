//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    mostrarDatos()
});
//funcion que guarda los datos del formulario en un objeto 
let guardarDatos = ()=>{
    
    let profile = {
        firstName: document.getElementById("firstName").value,
        secondName: document.getElementById("secondName").value,
        lastName: document.getElementById("lastName").value,
        secondLastname: document.getElementById("secondLastname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value

    }
    //guardo los datos en el local storage
    console.log(profile)
    localStorage.setItem('profileData', JSON.stringify(profile))
}
// funcion que se fija que haya datos en el local storage y popula en el form
let mostrarDatos = () =>{
    let profileData = localStorage.getItem('profileData')
    if(profileData){
        data = JSON.parse(profileData)
        document.getElementById("firstName").value = data.firstName
        document.getElementById("secondName").value = data.secondName
        document.getElementById("lastName").value = data.lastName
        document.getElementById("secondLastname").value = data.secondLastname
        document.getElementById("email").value = data.email
        document.getElementById("phone").value = data.phone
    }
}