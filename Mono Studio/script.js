 const cursor = document.querySelector('.cursor');
    const title = document.querySelector('h1');
    const visual = document.querySelector('.visual');
    const cards = document.querySelectorAll('.card');

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';

      if (Math.random() > 0.88) createParticle(e.clientX, e.clientY);

      cards.forEach(card => {
        const speed = card.classList.contains('c2') ? 18 : 10;
        const x = (window.innerWidth / 2 - e.clientX) / speed;
        const y = (window.innerHeight / 2 - e.clientY) / speed;
        card.style.transform = `translate(${x}px, ${y}px)`;
      });
    });

    document.addEventListener('click', (e) => {
      for (let i = 0; i < 28; i++) createParticle(e.clientX, e.clientY, true);
    });

    function createParticle(x, y, large = false) {
      const p = document.createElement('span');
      p.className = 'particle';
      const size = large ? Math.random() * 9 + 3 : Math.random() * 4 + 2;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      p.style.opacity = Math.random() * 0.8 + 0.2;
      p.style.setProperty('--x', (Math.random() - 0.5) * 190 + 'px');
      p.style.setProperty('--y', (Math.random() - 0.5) * 190 + 'px');
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 750);
    }

    function changeText() {
      const moods = [
        'Clean <span>Chaos</span>',
        'Dark <span>Luxury</span>',
        'Silent <span>Motion</span>',
        'Soft <span>Noise</span>'
      ];
      title.innerHTML = moods[Math.floor(Math.random() * moods.length)];
    }

    function burstCenter() {
      const box = visual.getBoundingClientRect();
      const x = box.left + box.width / 2;
      const y = box.top + box.height / 2;
      for (let i = 0; i < 60; i++) createParticle(x, y, true);
    }

    setInterval(() => {
      const line = document.createElement('div');
      line.className = 'line';
      line.style.left = Math.random() * 80 + 'px';
      line.style.top = Math.random() * 100 + '%';
      line.style.width = Math.random() * 260 + 80 + 'px';
      visual.appendChild(line);
      setTimeout(() => line.remove(), 3000);
    }, 900);