    const MIN_DIAMETER = 200;
    const MAX_DIAMETER = 800;
    const DEG_TO_RAD = Math.PI / 180;
    const CLOCK_RADIUS = 0.4; 

    let hourHand, minuteHand, secondHand;

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
        const x = centerX + Math.cos(angleRad) * radius - 15;
        const y = centerY + Math.sin(angleRad) * radius - 15;

        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.left = x - 5 + 'px';
        circle.style.top = y - 5 + 'px';
        clock.appendChild(circle);

        const number = document.createElement('div');
        number.className = 'number';
        number.style.left = x + 'px';
        number.style.top = y + 'px';
        number.innerText = i;
        clock.appendChild(number);
      }

      hourHand = createHand('hourHand', 8, 25); 
      minuteHand = createHand('minuteHand', 4, 30); 
      secondHand = createHand('secondHand', 2, 35); 

      clock.appendChild(hourHand);
      clock.appendChild(minuteHand);
      clock.appendChild(secondHand);

      startClock();
    }

    function createHand(className, width, heightPercentage) {
  const hand = document.createElement('div');
  hand.className = 'hand ' + className;
  hand.style.backgroundColor = 'black';
  hand.style.width = width + 'px';
  hand.style.height = heightPercentage + '%'; 
  hand.style.borderRadius = width / 2 + 'px';
  hand.style.bottom = '50%';
  hand.style.transform = 'translateY(50%)';
  return hand;
}
    function startClock() {
      updateClock();
      setInterval(updateClock, 1000);
    }

    function updateClock() {
      const now = new Date();
      const hours = now.getHours() % 12;
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const hourAngle = (hours * 30) + (0.5 * minutes);
      const minuteAngle = (minutes * 6) + (0.1 * seconds);
      const secondAngle = seconds * 6;

      hourHand.style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
      minuteHand.style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
      secondHand.style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;

      console.log(`${hours}:${minutes}:${seconds}`);
    }
