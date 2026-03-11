const textArray = [
  "Web Developer",
  "Frontend Designer",
  "JavaScript Lover",
  "Creative Coder"
];

let index = 0;
let charIndex = 0;
let currentText = "";
let typingElement = document.getElementById("typing");

function type() {

  if(charIndex < textArray[index].length){
    currentText += textArray[index].charAt(charIndex);
    typingElement.textContent = currentText;
    charIndex++;
    setTimeout(type,100);
  }

  else{
    setTimeout(erase,1500);
  }
}

function erase(){

  if(charIndex > 0){
    currentText = currentText.slice(0,-1);
    typingElement.textContent = currentText;
    charIndex--;
    setTimeout(erase,50);
  }

  else{
    index++;
    if(index >= textArray.length){
      index = 0;
    }
    setTimeout(type,200);
  }
}

type();