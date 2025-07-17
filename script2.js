const gameArea = document.querySelector('.game-area');
const car = document.querySelector('.car');
let carPosition = 180;
let gameSpeed = 5;
let obstacleInterval;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && carPosition > 0) {
        carPosition -= 20;
    } else if (e.key === 'ArrowRight' && carPosition < 360) {
        carPosition += 20;
    }
    car.style.left = `${carPosition}px`;
});

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = `${Math.floor(Math.random() * 360)}px`;
    obstacle.style.top = '-80px';
    gameArea.appendChild(obstacle);
    moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
    let obstaclePosition = -80;
    const obstacleMovement = setInterval(() => {
        obstaclePosition += gameSpeed;
        obstacle.style.top = `${obstaclePosition}px`;
        if (obstaclePosition > 600) {
            clearInterval(obstacleMovement);
            gameArea.removeChild(obstacle);
        }
        checkCollision(obstacle, obstacleMovement);
    }, 20);
}

function checkCollision(obstacle, obstacleMovement) {
    const obstacleRect = obstacle.getBoundingClientRect();
    const carRect = car.getBoundingClientRect();
    if (
        carRect.left < obstacleRect.right &&
        carRect.right > obstacleRect.left &&
        carRect.top < obstacleRect.bottom &&
        carRect.bottom > obstacleRect.top
    ) {
        clearInterval(obstacleMovement);
        clearInterval(obstacleInterval);
        alert('Game Over!');
        resetGame();
    }
}

function resetGame() {
    carPosition = 180;
    car.style.left = `${carPosition}px`;
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach((obstacle) => obstacle.remove());
    gameSpeed = 5;
    startGame();
}

function startGame() {
    obstacleInterval = setInterval(createObstacle, 1000);
}

startGame();
