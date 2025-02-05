// Símbolos de la máquina tragamonedas
const symbols = ['🍒', '🍋', '🍇', '🍉', '🔔', '💎'];

// Elementos del DOM
const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
]

let auto
let clicked = false

const spinButton = document.getElementById('spin-button');
const autoButton = document.getElementById('auto-button');
const result = document.getElementById('result');

spinButton.addEventListener('click', spin)
autoButton.addEventListener('click', () => {
    if (clicked === false) {
        spin()
        auto = setInterval(spin, 1000 * 3)
        clicked = true
    }
})

// Función para girar los rodillos
function spin() {
    // Deshabilitar el botón mientras gira
    spinButton.disabled = true;
    result.textContent = '';

    // Girar cada rodillo
    reels.forEach((reel, index) => {
        const spins = 10 + index * 5; // Número de giros por rodillo
        let spinCount = 0;

        const interval = setInterval(() => {
            // Cambiar el símbolo del rodillo
            reel.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            spinCount++;

            // Detener el giro después de un número determinado de vueltas
            if (spinCount >= spins) {
                clearInterval(interval);

                // Habilitar el botón después de que todos los rodillos se detengan
                if (index === reels.length - 1) {
                    spinButton.disabled = false;
                    checkResult();
                }
            }
        }, 100); // Velocidad de giro (en milisegundos)
    });
}

// Función para verificar el resultado
function checkResult() {
    const reelValues = reels.map(reel => reel.textContent);

    // Verificar si todos los símbolos son iguales
    if (reelValues[0] === reelValues[1] && reelValues[1] === reelValues[2]) {
        result.textContent = '¡Ganaste! 🎉'
        clearInterval(auto)
        clicked = false
    } else {
        result.textContent = 'Inténtalo de nuevo. 😢';
    }
}


