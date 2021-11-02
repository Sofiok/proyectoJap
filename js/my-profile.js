//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    mostrarDatos()
});

let guardarDatos = ()=>{
    
    let profile = {
        firstName: document.getElementById("firstName").value,
        secondName: document.getElementById("secondName").value,
        lastName: document.getElementById("lastName").value,
        secondLastname: document.getElementById("secondLastname").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value

    }
    console.log(profile)
    localStorage.setItem('profileData', JSON.stringify(profile))
}

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