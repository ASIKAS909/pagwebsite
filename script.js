document.getElementById('guessInput').addEventListener('input', function(event) {
    this.value = this.value.replace(/[^\d]/, ''); // Elimina cualquier carácter no numérico
});
document.addEventListener('DOMContentLoaded', function() {
    const targetNumber = '123456789'; // El número telefónico a adivinar
    const form = document.getElementById('guessForm');
    const input = document.getElementById('guessInput');
    const hint = document.getElementById('hint');
    const playButton = document.getElementById('playButton');
    let backgroundMusic = document.getElementById('backgroundMusic');

    // Función para reproducir la música
    function playMusic() {
        if (backgroundMusic.paused || backgroundMusic.ended) {
            backgroundMusic.play();
            playButton.textContent = 'Pausar';
        } else {
            backgroundMusic.pause();
            playButton.textContent = 'Continuar';
        }
    }

    // Evento para reproducir o pausar la música cuando se hace clic en el botón
    playButton.addEventListener('click', playMusic);

    // Evento para reiniciar la música cuando termina
    backgroundMusic.addEventListener('ended', function() {
        playButton.textContent = 'Escuchar';
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const guess = input.value;
        if (guess.length !== 9 || !/^\d{9}$/.test(guess)) {
            hint.textContent = 'Por favor, introduce un número de 9 dígitos válido.';
            return;
        }

        let correctPositions = 0;
        let hintHtml = '';

        for (let i = 0; i < 9; i++) {
            if (guess[i] === targetNumber[i]) {
                correctPositions++;
                hintHtml += `<img class="icon" src="Img/Bien.png" alt="Correcto"></span> <span class="correct">${guess[i]}`;
            }
        else {
                hintHtml += `<img class="icon" src="Img/Mal.png" alt="Incorrecto"></span> <span class="incorrect">${guess[i]}`;
            }
        }

        if (correctPositions === 9) {
            hint.innerHTML = '¡Felicidades! Obtuviste su número.';
            successGif.style.display = 'block';
        } else {
            hint.innerHTML = `Oh! Algunos números no son correctos D:<br>${hintHtml}`;
        }
    });
});