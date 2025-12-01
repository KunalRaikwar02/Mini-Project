const paragraphs = document.querySelectorAll('p');
const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

paragraphs.forEach(p => {
    const text = p.textContent;
    let iteration = 0;
    let randomInterval;
    let revealInterval;

    // random text
    const makeRandom = () => {
        p.textContent = [...text].map(() => characters[Math.floor(Math.random() * characters.length)]).join('');
    }

    const startRandom = () => {
        randomInterval = setInterval(makeRandom, 50);
    }

    // left-to-right
    const revealText = () => {
        clearInterval(randomInterval);
        iteration = 0;
        revealInterval = setInterval(() => {
            p.textContent = [...text].map((char, idx) => idx < iteration ? char : characters[Math.floor(Math.random() * characters.length)]).join('');
            iteration++;
            if(iteration > text.length) clearInterval(revealInterval);
        }, 40);
    }

    // events
    p.addEventListener('mouseenter', revealText);
    p.addEventListener('mouseleave', () => {
        clearInterval(revealInterval);
        startRandom();
    });

    // start random text initially
    startRandom();
});

                                     // Original single paragraph version: \\

// const p = document.querySelector('p');
// const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

// const text = p.textContent;

// let randomInterval;
// let revealInterval;
// let iteration = 0;

// // random text running
// function makeRandom() {
//     const str = text.split("").map((char) => {
//         return characters[Math.floor(Math.random() * characters.length)];
//     }).join("");
//     p.textContent = str;
// }

// function startRandom() {
//     randomInterval = setInterval(makeRandom, 50);
// }

//     // left to right reveal \\

// function revealText() {
//     clearInterval(randomInterval);

//     revealInterval = setInterval(() => {
//         const updated = text.split("").map((char, index) => {
//             if (index < iteration) {
//                 return text[index]; 
//             }
//             return characters[Math.floor(Math.random() * characters.length)];
//         }).join("");

//         p.textContent = updated;
//         iteration++;

//         if (iteration > text.length) {
//             clearInterval(revealInterval);
//         }
//     }, 40);
// }

// startRandom();

// p.addEventListener('mouseenter', () => {
//     iteration = 0;
//     revealText();
// });

// p.addEventListener('mouseleave', () => {
//     clearInterval(revealInterval);
//     startRandom();
// });
