//CANVAS
//--------
const fingerprintMarkPosition = [
  { posix: 158, posiy: 197 },
  { posix: 222, posiy: 233 },
  { posix: 144, posiy: 219 },
  { posix: 164, posiy: 211 },
  { posix: 152, posiy: 252 },
  { posix: 155, posiy: 265  },
  { posix: 197, posiy: 240 },
  { posix: 251, posiy: 256  },
  { posix: 284, posiy: 188  },
  { posix: 200, posiy: 137 },
  { posix: 151, posiy:136  },
  { posix: 131, posiy:166  },
  { posix: 155, posiy:174  },
  { posix:53 , posiy:255  },
  { posix: 53, posiy:334  },
];


const image = new Image();
image.src = "emp1.jpg";
let score = 0;
let scoreDisplay = document.getElementById("score");
let messageDisplay = document.getElementById("message");

const leftCanva = document.getElementById("leftCanva");
const leftContext = leftCanva.getContext("2d");
leftCanva.width = 336;
leftCanva.height = 450;
leftContext.drawImage(image, 0, 0);

const rightCanva = document.getElementById("rightCanva");
const rightContext = rightCanva.getContext("2d");
rightCanva.width = 336;
rightCanva.height = 450;
rightContext.drawImage(image, 0, 0);

const canvaBorderStyle = (color) =>{
  leftCanva.style.border = `${color} solid 2px`
  rightCanva.style.border = `${color} solid 2px`;
}



const drawCircle = (selectedCanva, posX, posY) => {
  selectedCanva.beginPath();
  selectedCanva.arc(posX, posY, 5, 0, 2 * Math.PI);
  selectedCanva.strokeStyle = "rgb(255,0,0)";
  selectedCanva.stroke();
};

rightCanva.addEventListener("click", (e) => {
  let rect = rightCanva.getBoundingClientRect();
  let posX =
    ((e.clientX - rect.left) / (rect.right - rect.left)) * rightCanva.width;
  let posY =
    ((e.clientY - rect.top) / (rect.bottom - rect.top)) * rightCanva.height;

  let fingerprintMark = fingerprintMarkPosition.find( (coord)=> {return posX <= coord.posix + 3 &&
      posX >= coord.posix - 3 &&
      posY >= coord.posiy - 3 &&
      posY <= coord.posiy + 3 } )
      
    
    if(fingerprintMark) {
      drawCircle(rightContext, posX, posY);
      drawCircle(leftContext, posX, posY);
      score++;
      scoreDisplay.innerHTML = `<h3>Score: ${score}<h3>`;
      messageDisplay.innerHTML = " ";
      fingerprintMarkPosition.splice(fingerprintMarkPosition.indexOf(fingerprintMark),1)
    
    } else {
        messageDisplay.innerHTML = "Il n'y pas de point caractéristique ici";
        canvaBorderStyle("red")
        setTimeout(() => {
          messageDisplay.innerHTML = "";
          canvaBorderStyle("rgb(232, 154, 10)")
        }, 2000);
      }
  });



//How to get frinprint mark position

// leftCanva.addEventListener("click", (e) => {
//   let rect = leftCanva.getBoundingClientRect();
//   let posX =
//     ((e.clientX - rect.left) / (rect.right - rect.left)) * leftCanva.width;
//   let posY =
//     ((e.clientY - rect.top) / (rect.bottom - rect.top)) * leftCanva.height;
//   drawCircle(leftContext, posX, posY);
//   console.log(posX, posY, "left canva");
// });













  // Some canva theory to remove

  // leftContext.beginPath();
// leftContext.arc(150,170,50,0,2*Math.PI)
// leftContext.fillStyle= "rgba(0,100,200,0.5)"
// leftContext.fill();

// leftContext.fillRect(50,50,50,150) // crée un rectangle à (pos pos size size)

// leftContext.fillStyle="rgba(0,100,200,0.5)"
// leftContext.fillRect(30,30,100,50)
// leftContext.clearRect(15,25,40,40) // crée un rectangle dans lequel on

// rightContext.fillStyle = "rgb(200,0,0)"
// rightContext.fillRect(50,50,50,150) // crée un rectangle à (pos pos size size)