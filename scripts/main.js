//  Va a contener el id de cada uno de los cursos
var carrito = [];

// objeto carritoCompras
var changuito = "";

var cursos = $('#cursos');
var listadoCursos = $('#listado-cursos');
var grillaCursos = $('#grillaCursos')
var grillaFinal = $('#seccionFinalizarCompra')
var subtotal = $('#subtotal');
var contenidoJSON = []
var contenidoHTML = ""
var grillaVisible = false

//CARGA LA PARTE DE LAS TARJETAS DE BOOTSTRAP
//DONDE MUESTRA CADA CURSO CON SU IMAGEN, DETALLES Y PRECIOS
function cargarCursos(tarjetas) {
    $.ajax({
        url:"scripts/api.json",
        dataType:"json",
        success: function(response){
            contenidoJSON = response
            $.each(contenidoJSON, function(i){
                contenidoHTML += `<div class="col-md-4"><div class="card mb-4" id="curso${contenidoJSON[i].id}">
            <img src="${contenidoJSON[i].imgSrc}" class="card-img-top" alt="..."><div class="card-body">
            <h3 class="card-title">${contenidoJSON[i].nombre}</h3><div class="badges"> ${contenidoJSON[i].nivelTag}</div>
            <p class="card-text mt-4"> <ul><li>  <span class="negrita">Cantidad de clases: </span> <span class="resaltado">${contenidoJSON[i].cantidadClases}</span></li>
            <li><span class="negrita">Horas de cursada: </span> <span id="jsHorasCursada" class="resaltado">${contenidoJSON[i].horasCursada}</span> </li><li>
            <span class="negrita">Precio Total: </span> <span class="resaltado">$${contenidoJSON[i].precio}</span> </li> </ul></p>
            <a href="#curso{${contenidoJSON[i].id}}" class="btn btn-primary"  onclick="agregarCurso(${contenidoJSON[i].id})">🛒</a></div></div></div>`
            })
            $("#listado-cursos").html(contenidoHTML)
        },
        error: function(response){
            $("#listado-cursos").html(`<h3>Ops! Parece que tenemos problemas al cargar la información. Por favor vuelve a intentarlo más tarde.</3>`).css("color", "red");
        }
    })
    
    tarjetas.html = contenidoHTML
    mostrarItemsEnCarrito()
}

//CUANDO SE CARGA LA PAGINA
document.body.onload = function (){
    cargarCursos(listadoCursos)
    ocultarGrilla()

    if (!("enCarrito" in localStorage)){
        localStorage.setItem("enCarrito",JSON.stringify(carrito))
    }

    else {
        carrito =  JSON.parse(localStorage.getItem("enCarrito"))
    }   
   
} 

//MUESTRA CUANTOS ITEMS TENGO EN EL CARRITO
function mostrarItemsEnCarrito () {
     enCarrito = JSON.parse(localStorage.getItem('enCarrito'))
    if(enCarrito!=null){
        $('#checkoutBtn').removeClass('d-none')
        $("#itemsCarrito").text(enCarrito.length) 
    }
    else if (enCarrito=''){
        $('#checkoutBtn').addClass('d-none')
    }
    else {
        $("#itemsCarrito").text('0') 
    }
}

//FUNCION QUE SE DISPARA AL AGREGAR UN CURSO AL CARRITO
function agregarCurso(id){
    let existe = false 
        
        if (enCarrito!=null){
            for (let i in enCarrito){
                if (enCarrito[i] == id){
                    Swal.fire({
                        position: 'bottom-end',
                        icon: 'warning',
                        title: 'Ya agregaste este curso',
                        text:'Por favor elige algún otro',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    existe = true
                    break
                }
            }
        }
       
        
        if (existe == false){
            carrito.push(id)
            localStorage.setItem("enCarrito",JSON.stringify(carrito))
            Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Agregaste un item al carrito',
                    showConfirmButton: false,
                    timer: 1500
                  })
            $('#checkoutBtn').removeClass('d-none')
            
        }
        mostrarItemsEnCarrito()
}

function mostrarGrilla(){
    $('#grillaContainer').removeClass('d-none')
}

function ocultarGrilla(){
    $('#grillaContainer').addClass('d-none')
}

function ocultar(){
    $('.ocultar').addClass('d-none')
}

function deshacerOcultar(){
    $('.ocultar').fadeIn()
    $('.ocultar').removeClass('d-none')
    $('#grillaContainer').fadeOut()
    grillaFinal.addClass('d-none')
}

// FUNCION QUE BORRA UN ITEM DEL CARRITO
function borrarItem(id){
    for(let i in carrito){
        
        if (id==carrito[i]){
        carrito.splice(i,1)
        }
    }
    localStorage.setItem("enCarrito",JSON.stringify(carrito))
    mostrarItemsEnCarrito()
    refrescar()
        if(carrito==""){
            deshacerOcultar()
        }
}

// FUNCION QUE SE DISPARA AL PRESIONAR "CANCELAR"
function cancelarCompra(){
    Swal.fire({
        title: 'Deseas cancelar la compra? ',
        text: "Todos los elementos del carrito serán removidos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí'
      }).then((result) => {
        if (result.isConfirmed) {
            carrito = []
            localStorage.setItem("enCarrito",JSON.stringify(carrito))
            mostrarItemsEnCarrito()
            deshacerOcultar()
        }
      })   
}

// FUNCION QUE VALIDA LAS CUOTAS ELEGIDAS
function validarCuota(){ 
    var unaCuota = $('#1cuota')
    var tresCuotas = $('#3cuotas')
    var seisCuotas = $('#6cuotas')
    var doceCuotas = $('#12cuotas')

    if (unaCuota.prop('checked')){
        
        $('#totalFinal').html('$'+changuito.subtotal())
        $('#cuotasFinal').html(`1 cuota de $${changuito.subtotal()}`)
    }
    else if (tresCuotas.prop('checked')){
        $('#totalFinal').html('$'+(changuito.subtotal()*1.1).toFixed(0))
        $('#cuotasFinal').html(`3 cuotas de $${(changuito.subtotal()*1.1/3).toFixed(2)}`)
    }
    else if (seisCuotas.prop('checked')){       
        $('#totalFinal').html('$'+(changuito.subtotal()*1.25).toFixed(0))
        $('#cuotasFinal').html(`6 cuotas de $${(changuito.subtotal()*1.25/6).toFixed(2)}`)
    }
    else if (doceCuotas.prop('checked')){
        $('#totalFinal').html('$'+changuito.subtotal())
        $('#cuotasFinal').html(`12 cuotas de $${(changuito.subtotal()/12).toFixed(2)}`)
    }
}

// FUNCION QUE SE DISPARA AL PRESIONAR EL CARRITO
function muestroCheckout (){
    if (carrito.length == 0) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No hay ningún ítem en el carrito',
            showConfirmButton: false,
            timer: 1500
          })
    } else {
        changuito =  new carritoCompras(carrito, contenidoJSON)
        changuito.verCompra(grillaCursos)
        changuito.verSubtotal(subtotal)
        $('#grillaContainer').fadeIn()
        $('#grillaContainer').removeClass('d-none')
        $('.ocultar').fadeOut()
    }
}

// SE DISPARA AL PRESIONAR "SIGUIENTE"
function confirmarCompra (){
    $('#grillaContainer').fadeOut()
    grillaFinal.removeClass('d-none')
    if (carrito.length !=0){
        changuito.verTotal(grillaFinal)
    }
    $('#1cuota').click()
}

// VUELVE A DIBUJAR LA GRILLA 
function refrescar (){
        changuito.verCompra(grillaCursos)
        changuito.verSubtotal(subtotal)
        $('#grillaContainer').removeClass('d-none')        
}

// FUNCION QUE SE DISPARA AL PRESIONAR "PAGAR"
function pagar(){
    let timerInterval
Swal.fire({
  title: 'Procesando el pago, por favor aguarde...',
  allowEscapeKey: false,
  allowOutsideClick: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    timerInterval = setInterval(() => {
      const content = Swal.getContent()
      if (content) {
        const b = content.querySelector('b')
        if (b) {
          b.textContent = Swal.getTimerLeft()
        }
      }
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El pago se registró correctamente',
        text:'Gracias por confiar en Educacion LAO!',
        showConfirmButton: false,
        timer: 2000
      })
  }
})

    carrito = []
    localStorage.setItem("enCarrito",JSON.stringify(carrito))
    mostrarItemsEnCarrito()
    deshacerOcultar()
}