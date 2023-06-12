// Creamos el contenedor
let main = document.getElementsByTagName('main')[0];
main.classList.add('container');

// Agrego el numero de filas y columnas que voy a utilizar
let nfilas = 15;
let ncolumnas = 15;

let objetivo; //esta variable la uso para almacenar la posicion del objetivo al que se tiene que llegar.
let j1; // La uso para guardar la posicion aleatoria del jugador 1
let j2; // La uso para guardar la posicion aleatoria del jugador 2

let posicionJ1x;  // Almacena el valor de las columnas del jugador 1
let posicionJ1y;  // Almacena el valor de las filas del jugador 1
let posicionJ2x; // Almacena el valor de las columnas del jugador 2
let posicionJ2y; // Almacena el valor de las filas del jugador 1

// Inicio de los contadores
let div = document.getElementsByTagName('div')[0];
div.setAttribute('class', 'contadores');

// Apartado para el contador del jugador 1
let contadorJ1 = document.createElement('p');
contadorJ1.setAttribute('class', 'contadorJ1');
contadorJ1.textContent = 'Jugador 1: 0';

// Apartado para el contador del jugador 2
let contadorJ2 = document.createElement('p');
contadorJ2.setAttribute('class', 'contadorJ2');
contadorJ2.textContent = 'Jugador 2: 0';


// Agregar contadores al HTML
div.appendChild(contadorJ1);
div.appendChild(contadorJ2);

// Fin de los contadores


// creo un evento de escucha que cuando cargue se cargue inicio
document.addEventListener('load', inicio());



/**
 * Funcion que inicia el tablero
 * @param - no
 * @return - no
 */
function inicio() {
    for (let i = 0; i < nfilas; i++) {

        for (let j = 0; j < ncolumnas; j++) {
            div = document.createElement('div');
            div.classList.add('card');
            div.setAttribute('id', `f${i}c${j}`);
            main.appendChild(div);
        }

    }

    pintarCasillas();
    movimiento();
}

/**
 * Funcion que se encarga de pintar las casillas de forma aleatoria.
 * @param - no
 * @return - no
 */
function pintarCasillas() {

    posicionJ1x = posAleatoria(0, 14);
    posicionJ1y = posAleatoria(0, 14);
    posicionJ2x = posAleatoria(0, 14);
    posicionJ2y = posAleatoria(0, 14);

    objetivo = document.getElementById(`f${posAleatoria(0, 14)}c${posAleatoria(0, 14)}`);
    objetivo.classList.add('objetivo');


    j1 = document.getElementById(`f${posicionJ1y}c${posicionJ1x}`);
    j1.classList.add('j1');

    j2 = document.getElementById(`f${posicionJ2y}c${posicionJ2x}`);
    j2.classList.add('j2');
}

/**
 * Funcion para hacer la formula de generacion aleatoria
 * @param - int min, int max


* @return - int
 */
function posAleatoria(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let finJuego = false; //Esta variable la uso para que cuando alguien ha ganado no se puedan seguir moviendo.

let ganaJ1 = 0;//contador para cuando ganan las X
let ganaJ2 = 0;//contador para cuando ganan las O

/**
 * Funcion que muestra un mensaje cuando alguien gana
 * @param - no
 * @return - no
 */
function victoria() {
    let j1 = document.getElementById(`f${posicionJ1y}c${posicionJ1x}`);
    let j2 = document.getElementById(`f${posicionJ2y}c${posicionJ2x}`);
    let objetivo = document.querySelector('.objetivo');
    if (j1 && j1.id == objetivo.id) {
        alert('¡Jugador 1 ha ganado!')
        finJuego = true;
        ganaJ1++;
        actualizarContadores();
        
    } else if (j2 && j2.id == objetivo.id) {
        alert('¡Jugador 2 ha ganado!')
        finJuego = true;
        ganaJ2++;
        actualizarContadores();
    }
}

/**
 * Funcion en la que muestra por pantalla los contadores cuando estos se van actualizando
 * @param - no
 * @return - no 
 */
function actualizarContadores() {
    contadorJ1.textContent = `Jugador 1: ${ganaJ1}`;
    contadorJ2.textContent = `Jugador 2: ${ganaJ2}`;
}

/**
 * Funcion que se encarga de resetear la partida cuando alguien gana pulsando un boton
 * @param - no
 * @return - no
 */
function resetear() {

    div = document.getElementById(`f${posicionJ1y}c${posicionJ1x}`);
    div.classList.remove('j1');

    div = document.getElementById(`f${posicionJ2y}c${posicionJ2x}`);
    div.classList.remove('j2');

    objetivo.classList.remove('objetivo');
    pintarCasillas();

    finJuego = false;
}

/**
 * Funcion que hace que al pulsar las respectivas teclas se puedan mover ambos jugadores
 * @param - no
 * @return - no
 */
function movimiento() {
    let div;
    document.addEventListener('keyup', (accion) => {
        if (!finJuego) {
            switch (accion.key) {
                case 'ArrowUp':
                    if (posicionJ1y > 0) {
                        // Eliminar la clase 'j1' de la casilla anterior
                        div = document.getElementById(`f${posicionJ1y}c${posicionJ1x}`);
                        div.classList.remove('j1');

                        // Mueve al jugador a la nueva casilla
                        posicionJ1y--;
                        div = document.getElementById(`f${posicionJ1y}c${posicionJ1x}`);
                        div.classList.add('j1');
                    }
                    break;
                case 'ArrowDown':
                    if (posicionJ1y < 14) {
                        // Eliminar la clase 'j1' de la casilla anterior
                        div = document.getElementById(`f${posicionJ1y}c${posicionJ1x}`);
                        div.classList.remove('j1');

                        // Mueve al jugador a la nueva casilla
                        posicionJ1y++;
                        div = document.getElementById(`f${posicionJ1y}c${posicionJ1x}`);
                        div.classList.add('j1');
                    }
                    break;
                case 'ArrowLeft':
                    if (posicionJ1x > 0) {
                        // Eliminar la clase 'j1' de la casilla anterior
                        div = document.getElementById(`f${posicionJ1y}c${posicionJ1x}`);
                        div.classList.remove('j1');

                        // Mueve al jugador a la nueva casilla
                        posicionJ1x--;
                        div = document.getElementById(`f${posicionJ1y}c${posicionJ1x}`);
                        div.classList.add('j1');
                    }
                    break;
                case 'ArrowRight':
                    if (posicionJ1x < 14) {
                        // Eliminar la clase 'j1' de la casilla anterior
                        div = document.getElementById(`f${posicionJ1y}c${posicionJ1x}`);
                        div.classList.remove('j1');

                        // Mueve al jugador a la nueva casilla
                        posicionJ1x++;
                        div = document.getElementById(`f${posicionJ1y}c${posicionJ1x}`);
                        div.classList.add('j1');
                    }
                    break;
                case 'w':
                    if (posicionJ2y > 0) {
                        // Eliminar la clase 'j1' de la casilla anterior
                        div = document.getElementById(`f${posicionJ2y}c${posicionJ2x}`);
                        div.classList.remove('j2');

                        // Mueve al jugador a la nueva casilla
                        posicionJ2y--;
                        div = document.getElementById(`f${posicionJ2y}c${posicionJ2x}`);
                        div.classList.add('j2');
                    }
                    break;
                case 's':
                    if (posicionJ2y < 14) {
                        // Eliminar la clase 'j2' de la casilla anterior
                        div = document.getElementById(`f${posicionJ2y}c${posicionJ2x}`);
                        div.classList.remove('j2');

                        // Mueve al jugador a la nueva casilla
                        posicionJ2y++;
                        div = document.getElementById(`f${posicionJ2y}c${posicionJ2x}`);
                        div.classList.add('j2');
                    }
                    break;
                case 'a':
                    if (posicionJ2x > 0) {
                        // Eliminar la clase 'j2' de la casilla anterior
                        div = document.getElementById(`f${posicionJ2y}c${posicionJ2x}`);
                        div.classList.remove('j2');

                        // Mueve al jugador a la nueva casilla
                        posicionJ2x--;
                        div = document.getElementById(`f${posicionJ2y}c${posicionJ2x}`);
                        div.classList.add('j2');
                    }
                    break;
                case 'd':
                    if (posicionJ2x < 14) {
                        // Eliminar la clase 'j' de la casilla anterior
                        div = document.getElementById(`f${posicionJ2y}c${posicionJ2x}`);
                        div.classList.remove('j2');

                        // Mueve al jugador a la nueva casilla
                        posicionJ2x++;
                        div = document.getElementById(`f${posicionJ2y}c${posicionJ2x}`);
                        div.classList.add('j2');
                    }
                    break;
            }
            victoria();

        }

    });
}









