// select all the elements

let main = document.querySelector("main");
let form = document.querySelector("form");
let input = document.querySelector("input");
let button = document.querySelector("button");
let section = document.querySelector("section");
let draggable = document.getElementById("draggable");
let resizeHandle = document.querySelector('.resize-handle');


//message if send button is clicked without any input

let errorMessage = document.createElement("p");
errorMessage.textContent = "Please enter your text";
errorMessage.className = "error-message"; // Add class for styling

;
main.appendChild(errorMessage);

//displaying the message

form.addEventListener("click", (e) => {
    e.preventDefault();
    const inputText = input.value.trim();
    if (inputText === "") {
      errorMessage.style.display = "block";
      return;
    }
    errorMessage.style.display = "none";

    let paragraph = document.createElement("p");
    let spanText = document.createElement("span");
    let iconSpan = document.createElement("span");

    iconSpan.innerHTML = `<i class="fas fa-check"></i>`;
    spanText.innerText = inputText;
    paragraph.appendChild(spanText);
    paragraph.appendChild(iconSpan);

    //or single line
    //paragraph.append(spanText, iconSpan);

    section.appendChild(paragraph);

    //reseting input value
    input.value = "";
    

    //.completed
    paragraph.addEventListener("click", () => {
      paragraph.classList.toggle("completed");
    });



    //remove paragraph
    paragraph.addEventListener("dblclick", () => {
      paragraph.remove();
    });
   

    //draggable
    draggable.addEventListener('mousedown', (e) => {
        let shiftX = e.clientX - draggable.getBoundingClientRect().left;
        let shiftY = e.clientY - draggable.getBoundingClientRect().top;
    
        function moveAt(pageX, pageY) {
          draggable.style.left = pageX - shiftX + 'px';
          draggable.style.top = pageY - shiftY + 'px';
        }
    
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
    
        function onMouseUp() {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }
    
        draggable.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', draggable.id);
        });
    
        draggable.addEventListener('dragend', () => {
          draggable.style.left = '0';
          draggable.style.top = '0';
        });
    
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    
        draggable.ondragstart = () => false;
    });

    //resize
    resizeHandle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        const initialWidth = draggable.offsetWidth;
        const initialHeight = draggable.offsetHeight;
        const initialX = e.clientX;
        const initialY = e.clientY;
  
        function onMouseMove(event) {
          const newWidth = initialWidth + (event.clientX - initialX);
          const newHeight = initialHeight + (event.clientY - initialY);
          draggable.style.width = newWidth + 'px';
          draggable.style.height = newHeight + 'px';
        }
  
        function onMouseUp() {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        }
  
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });

      
});


