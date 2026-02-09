const envelope = document.getElementById('envelopeWrapper');
        const noBtn = document.getElementById('noBtn');
        const yesBtn = document.getElementById('yesBtn');
        const celebration = document.getElementById('celebration');

        envelope.addEventListener('click', () => {
            envelope.classList.add('open');
        });

        const moveNoButton = () => {
            const limit = 100; 
            
            const x = Math.floor(Math.random() * (limit * 2)) - limit;
            const y = Math.floor(Math.random() * (limit * 2)) - limit;

            noBtn.style.transform = `translate(${x}px, ${y}px)`;
        };

        document.addEventListener('mousemove', (e) => {
            if (!envelope.classList.contains('open')) return;

            const rect = noBtn.getBoundingClientRect();
            const distance = Math.hypot(
                e.clientX - (rect.left + rect.width / 2),
                e.clientY - (rect.top + rect.height / 2)
            );

            if (distance < 70) {
                moveNoButton();
            }
        });

        noBtn.addEventListener('mouseover', moveNoButton);

        yesBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            celebration.style.display = 'flex';
        });