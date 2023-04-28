
// Iconos e imagen de las cartas
let iconoDuda = `<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxgPFS1JW6K5_MUT7vc01D9GDMwRhhquSARA&usqp=CAU">`;
let iconoPicas = `<i class="bi bi-suit-spade"></i>`;
let iconoCorazones = `<i class="bi bi-suit-heart"></i></i>`;
// Array para el valor de las monedas de apuestas
let coins = [10, 25, 50, 100];


// Juego de la casa
let puntosCasa = 0;
let jugadaCasa = [];
let cartasCasa = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

//Juego del jugador
let puntosJugador = 0;
let jugadaJugador = [];
let cartasJugador = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

// Identificamos los elementos de HTML, para las variables que vamos a imprimir en pantalla
const cotent = document.querySelector('.cotent');
const tabContent = document.getElementById('tab');

// Identificador para la casa
const manoCasa = document.getElementById('mano-casa');
const displayCasa = document.getElementById('puntos-casa');

// Identificador para el jugador
const manoJugador = document.getElementById('mano-jugador');
const displayJugador = document.getElementById('puntos-jugador');
const resultado = document.getElementById('resultado');

// Identificador para los controles
const controls = document.querySelector('.controls');
const btnIniciar = document.getElementById('btn-iniciar');
const btnPedir = document.getElementById('btn-pedir');
const btnPlantarse = document.getElementById('btn-plantarse');
const reset = document.getElementById('reset');
const btnApostar = document.getElementById('btn-apostar');
const cash = document.querySelector('.cash');

// Ponemos un identificador para las apuestas
let monedasJugador = [];
const apuestas = document.querySelector('.apuestas');


let jugadorPlantado = false;

let fin = false;
let timer = 0;

let temporizador = 0;



// El juego empieza con dos cartas ya sea para la casa y  para el jugador
function empezar() {
    // Se resetean las cartas
    puntosCasa = 0;
    jugadaCasa = [];

    puntosJugador = 0;
    jugadaJugador = [];


    activarBotones();

    // Recogemos las cartas iniciales de la casa:
    darCarta("casa");



    //Recogemos las dos cartas iniciales del jugador:
    darCarta();
    darCarta();

    // Botones los cuales se ocultan o se muestarn según el display que le ponemos
    cotent.style.display = "flex"
    tabContent.style.display = "flex"
    btnApostar.style.display = "block"
    btnPlantarse.style.display = "flex"
    reset.style.display = "flex"
    btnPedir.style.display = "flex"
    cash.style.display = "flex"
    manoCasa.classList.add('cartaOculta');
    manoJugador.classList.add('cartaOculta');

    // revisar 
    resultado.innerHTML = "Introduce tu apuesta";
    // console.log("resultado");


}
// Está función manda al juego
// function play() {
//     empezar();
// }

// Función la cual se activan o desactivan los controles
function activarBotones() {
    btnPedir.style['pointer-events'] = 'auto';
    btnPedir.style['opacity'] = 1;
    btnPlantarse.style['pointer-events'] = 'auto';
    btnPlantarse.style['opacity'] = 1;
    // apuestas.style['pointer-events'] = 'auto';
    // apuestas.style['opacity'] = 1;
}
function desactivarBotones() {
    btnPedir.style['pointer-events'] = 'none';
    btnPedir.style['opacity'] = 0.7;
    btnPlantarse.style['pointer-events'] = 'none';
    btnPlantarse.style['opacity'] = 0.7;
    // apuestas.style['pointer-events'] = 'none';
    // apuestas.style['opacity'] = 0.7;
}

// Le damos la función a calcularPuntos el cual le dará el número y las letras a las cartas, seguido creamos un switch el cual le dará el valor si se cumple la condición 
function calcularPuntos() {
    puntosCasa = 0;
    puntosJugador = 0;

    // Se debe realizar un for con cada jugador
    for (let i = 0; i < jugadaCasa.length; i++) {
        let as = false;
        // Le damos el valor a las letras
        switch (jugadaCasa[i]) {
            case "A":
                puntosCasa += 11;
                as = true;
                break;
            case "J":
            case "Q":
            case "K":
                puntosCasa += 10;
                break;

            default:
                puntosCasa += jugadaCasa[i];
                break;
        }
        // Si los puntos son menores a 21 le restará 10 al "as" para que este valga 1
        if (puntosCasa > 21 && as) {
            puntosCasa -= 10;
        }
    }

    for (let i = 0; i < jugadaJugador.length; i++) {
        let as = false;
        // Le damos el valor a las letras
        switch (jugadaJugador[i]) {
            case "A":
                puntosJugador += 11;
                as = true;
                break;
            case "J":
            case "Q":
            case "K":
                puntosJugador += 10;
                break;

            default:
                puntosJugador += jugadaJugador[i];
                break;
        }
        if (puntosJugador > 21 && as) {
            puntosJugador -= 10;
        }
    }
    //  Muestra los puntos de la casa y los puntos del jugador
    displayCasa.innerHTML = puntosCasa;
    displayJugador.innerHTML = puntosJugador;

    cartasCasa.innerHTML = jugadaCasa.join();
    cartasJugador.innerHTML = jugadaJugador.join();
    mostrarCartas();

    ganador();
}


// Función de mostrar cartas
// Aquí creas las cartas para el jugador y la mesa
function mostrarCartas() {
    manoCasa.innerHTML = '';
    manoJugador.innerHTML = '';
    for (let i = 0; i < jugadaCasa.length; i++) {
        if (jugadaCasa.length < 2) {
            manoCasa.innerHTML += "<div class='carta duda'>"
                + "<div class='palo'>" + iconoDuda + "</div>"
                + "</div>"
                + "<div class='carta'>"
                + "<div class='num top'>" + jugadaCasa[i] + "</div>"
                + "<div class='palo'>" + iconoCorazones + "</div>"
                + "<div class='num bot'>" + jugadaCasa[i] + "</div>"
                + "</div>";
        } else {
            manoCasa.innerHTML += "<div class='carta'>"
                + "<div class='num top'>" + jugadaCasa[i] + "</div>"
                + "<div class='palo'>" + iconoCorazones + "</div>"
                + "<div class='num bot'>" + jugadaCasa[i] + "</div>"
                + "</div>";
        }
    }
    for (let i = 0; i < jugadaJugador.length; i++) {
        manoJugador.innerHTML += "<div class='carta'>"
            + "<div class='num top'>" + jugadaJugador[i] + "</div>"
            + "<div class='palo'>" + iconoPicas + "</div>"
            + "<div class='num bot'>" + jugadaJugador[i] + "</div>"
            + "</div>";
    }

}



// Le damos la función al ganador, el ganador debe tener 21 puntos no pasarse de 21 puntos.
function ganador() {
    // Switch para comentar el estado actual del juego
    switch (true) {
        case puntosJugador > puntosCasa:
            resultado.innerHTML = "Va ganando el jugador"
            break;
        case puntosCasa > puntosJugador:
            resultado.innerHTML = "Va ganando la casa"
            break;
        case puntosCasa === puntosJugador:
            resultado.innerHTML = "Empate"
            break;

        default:
            console.log("default switch 1");
            break;
    }
    // si se cumple esta función se bloquean los botones
    desactivarBotones();


    // switch para determinar que ha finalizado la partida
    switch (true) {
        // para que nos muestre el valor en la pantalla debemos poner el total que es menor o igual que el valor de la apuesta
        
        // casa
        case (puntosCasa === 21 && puntosJugador === 21):
            resultado.innerHTML = "Ambas partes tienen 21, la apuesta se recupera."
            // total == valorApuesta;
            break;
        case (puntosCasa === 21 && puntosJugador != 21):
            resultado.innerHTML = "La casa tiene Blackjack. El jugador pierde la apuesta!"
            total -= valorApuesta;
            break;
        case puntosJugador > 21:
            resultado.innerHTML = "Gana la casa."
            total -= valorApuesta;
            break;
            
        // jugador
        case (puntosCasa != 21 && puntosJugador === 21):
            resultado.innerHTML = "Has ganado!"
            total += valorApuesta * 2;
            break;
        case puntosCasa > 21:
            resultado.innerHTML = "La casa se ha pasado de 21. Gana el jugador."
            total += valorApuesta;
            desactivarBotones();
            
            break;
            

        default:
            console.log("default switch 2");
            activarBotones();
            break;
    }
    // Para vaciar la apuesta le ponemos comillas simples
    apuestaDisplay.innerHTML = '';
    // Para que imprima el valor en pantalla
    totalDisplay.innerHTML =  'Saldo: ' + total + " € ";

}
//  Esta función le da las cartas al jugador en cada juego
function darCarta(jugada) {
    switch (jugada) {
        case "casa":
            jugadaCasa.push(cartasCasa[Math.floor(Math.random() * cartasCasa.length)]);
            break;
        default:
            jugadaJugador.push(cartasJugador[Math.floor(Math.random() * cartasJugador.length)]);
            break;
    }
    //    Cuentas los puntos del jugador y de la casa
    if (jugadaJugador.length >= 2)

        // Ponemos para que se ejecute la función
        calcularPuntos("");
}

// Es la función que deja al jugador que se plante en el juego
function plantarse() {
    jugadorPlantado = true;
    desactivarBotones();
    if (puntosJugador > puntosCasa) {
        darCarta('casa');
        timer = setTimeout(() => {
            plantarse();
        }, 1000);
    } else {
        clearTimeout(timer);
        timer = 0;
    }

}

// Es la función en la cual empiezas a jugar
function jugar() {
    empezar();
    
    btnIniciar.style.display = "none"
    apuestas.style.display = "flex";
    btnApostar.style.display = "none";

    controls.style.display = "none";
}

function playagain() {
    location.reload(true);
    empezar();
}

// Le damos el estilo e imprimos en pantalla
function mostrarMonedas() {
    let style_coins = ''

    const data = coins.map(coin => {
        switch (coin) {
            case 10:
                style_coins = 'coin_10';
                break;
            case 25:
                style_coins = 'coin_25';
                break;
            case 50:
                style_coins = 'coin_50';
                break;
            case 100:
                style_coins = 'coin_100';
                break;

            default:
                break;
        }
        return `
        <div>
            <div class="${style_coins}" onclick="apostar(${coin})">${coin}€</div>
        </div>        
       `
    })

    apuestas.innerHTML = data.join('')
}

mostrarMonedas();
let total = 1000;
// le damos que el valor comience con 0
let valorApuesta = 0;
let totalDisplay = document.getElementById("total");
totalDisplay.innerHTML = "Saldo: " + total + "€";
let apuestaDisplay = document.querySelector('#coin');
function apostar(coin) {
    monedasJugador = [];
    monedasJugador.push(coin)
    console.log(monedasJugador)
    btnApostar.style.display = "none";
    controls.style.display = 'flex';
    manoCasa.classList.remove('cartaOculta');
    manoJugador.classList.remove('cartaOculta');

    calcularPuntos("");
    valorApuesta = 0;
    for (let i = 0; i < monedasJugador.length; i++) {
        valorApuesta += monedasJugador[i];

    }
    console.log(total);
    console.log(valorApuesta);
    apuestaDisplay.innerHTML = "Tu apuesta es de: " + valorApuesta + " €";

    totalDisplay.innerHTML = total - valorApuesta + " € " + ' Saldo: ';

}


