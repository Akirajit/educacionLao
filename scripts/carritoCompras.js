class carritoCompras {
    // CUANDO INICIALICEMOS EL CARRITO, LE VAMOS A PASAR EL ARRAY "carrito" Y EL JSON "ContenidoJSON"
    constructor(carrito,cursos){
        //aca se va a ir sumando el subtotal de la compra
        var subtotal = 0
        //array con x cantidad de objetos
        this.carrito = carrito
        //JSON con todos los cursos y detalles
        this.cursos = cursos

        //DIBUJA Y AGREGA EN EL HTML TODOS LOS ELEMENTOS AGREGADOS AL CARRITO POR EL USUARIO
        this.verCompra = function (grillaCheckout) {
            subtotal = 0
            let grilla = ""
                for(let i  in this.carrito){
                    for (let j in this.cursos){
                        if (this.cursos[j].id == carrito[i]) {
                            grilla += `
                            <tr>
                            <td>${cursos[j].nombre}</td>
                            <td>${cursos[j].precio}</td>
                            <td>
                                <button type="button" class="btn btn-outline-danger" onclick="borrarItem(${j})">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                  </svg>
                                  
                                </button>
                            </td>
                          </tr>                         
                            `
                            subtotal += cursos[j].precio
                            total += cursos[j].precio
                        }

                    }
                }
            grillaCheckout.html(grilla)
        }
        //DIBUJA EL TOTAL (SIN DESCUENTOS)
        this.verSubtotal = function(grillaSubtotal){
            let grilla = `
            <tr>
                <td>SUBTOTAL</td>
                <td class="text-right"><strong>$${this.subtotal()}</strong></td>
            </tr>                            
            `                        
            grillaSubtotal.html(grilla)
        }

        //FUNCION QUE CALCULA EL TOTAL (SIN DESCUENTOS)
        this.subtotal = function (){
            return subtotal
        }

       
        // MUESTRA LA ULTIMA PARTE DEL PROCESO DE PAGO
        this.verTotal = function(grillaFinal){
            let grilla = `  
            <h3>Cómo querés pagar?</h3>
            <form name="cuotas">
            <input type="radio" id="1cuota" name="modoDePago" value="1cuota" onclick="validarCuota()" checked >
            <label for="1cuota">1 pago</label><br>
            <input type="radio" id="3cuotas" name="modoDePago" value="3cuotas" onclick="validarCuota()">
            <label for="3cuotas">3 cuotas (10% interés)</label><br>
            <input type="radio" id="6cuotas" name="modoDePago" value="4cuotas" onclick="validarCuota()">
            <label for="6cuotas">6 cuotas (25% interés)</label><br>
            <input type="radio" id="12cuotas" name="modoDePago" value="12cuotas" onclick="validarCuota()">
            <label for="12cuotas">12 cuotas sin interés</label>
            </form>
          
            <h3 id="totalTitulo">TOTAL A PAGAR: <span id="totalFinal"> $${this.subtotal()} </span> </h3>
            <h4>a pagar en: <span id="cuotasFinal">  </span></h4>
            <div class="container text-center">
              <button type="button" id="atrasCompraFinalBtn" class="btn btn-info" onclick="deshacerOcultar()">Atrás</button>
              <button type="button" id="finalizarCompraBtn" class="btn btn-success" onclick="pagar()">Pagar</button>
              <button type="button" id="cancelarCompraTotalBtn" class="btn btn-danger" onclick="cancelarCompra()">Cancelar</button>
            </div>
            `
            grillaFinal.html(grilla)
        }
    }
}

