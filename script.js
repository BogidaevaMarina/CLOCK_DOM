const MIN_DIAMETER = 200;
const MAX_DIAMETER = 800;
const DEG_TO_RAD = Math.PI / 180;
const CLOCK_RADIUS = 0.4;

let hourHand, minuteHand, secondHand, timeDisplay;

function buildClock() {
    const diameterInput = document.getElementById('diameterInput');
    const diameter = parseInt(diameterInput.value);

    if (isNaN(diameter) || diameter < MIN_DIAMETER || diameter > MAX_DIAMETER) {
        alert('Введите корректное число от 200 до 800.');
        return;
    }

    const clockContainer = document.getElementById('clockContainer');
    clockContainer.innerHTML = '';

    const clock = document.createElement('div');
    clock.style.width = diameter + 'px';
    clock.style.height = diameter + 'px';
    clock.style.position = 'relative';
    clockContainer.appendChild(clock);

    const centerX = diameter / 2;
    const centerY = diameter / 2;
    const radius = diameter * CLOCK_RADIUS;

    const clockBackground = document.createElement('div');
    clockBackground.className = 'clock-background';
    clock.appendChild(clockBackground);

    for (let i = 1; i <= 12; i++) {
        const angle = (i - 3) * 30;
        const angleRad = angle * DEG_TO_RAD;
        const x = centerX + Math.cos(angleRad) * radius - diameter * 0.03;
        const y = centerY + Math.sin(angleRad) * radius - diameter * 0.03;

        const number = document.createElement('div');
        number.className = 'number';
        number.style.width = diameter * 0.1 + 'px';
        number.style.height = diameter * 0.1 + 'px';
        number.style.lineHeight = diameter * 0.1 + 'px';
        number.style.fontSize = diameter * 0.05 + 'px';
        number.style.left = x - diameter * 0.05 + 'px';
        number.style.top = y - diameter * 0.05 + 'px';
        number.innerText = i;
        clock.appendChild(number);
    }

    hourHand = createHand('hourHand', diameter * 0.04, diameter * 0.25);
    minuteHand = createHand('minuteHand', diameter * 0.02, diameter * 0.3);
    secondHand = createHand('secondHand', diameter * 0.01, diameter * 0.35);

    clock.appendChild(hourHand);
    clock.appendChild(minuteHand);
    clock.appendChild(secondHand);

    timeDisplay = createTextDisplay(diameter * 0.2, diameter);
    clock.appendChild(timeDisplay);

    startClock();
}

function createHand(className, width, height) {
    const hand = document.createElement('div');
    hand.className = 'hand ' + className;
    hand.style.backgroundColor = 'black';
    hand.style.width = width + 'px';
    hand.style.height = height + 'px';
    hand.style.borderRadius = width / 2 + 'px';
    hand.style.bottom = '50%';
    hand.style.transform = 'translateY(50%)';
    return hand;
}

function createTextDisplay(distanceFromCenter, diameter) {
    const textDisplay = document.createElement('div');
    textDisplay.className = 'time-display';
    textDisplay.style.position = 'absolute';
    textDisplay.style.top = '45%';
    textDisplay.style.left = '50%';
    textDisplay.style.transform = `translate(-50%, -${distanceFromCenter}px)`;
    textDisplay.style.fontSize = diameter * 0.06 + 'px';
    return textDisplay;
}

function startClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourAngle = (hours * 30) + (0.5 * minutes);
    const minuteAngle = (minutes * 6) + (0.1 * seconds);
    const secondAngle = seconds * 6;

    hourHand.style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
    minuteHand.style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
    secondHand.style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;

    const timeText = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    timeDisplay.innerText = timeText;
}
