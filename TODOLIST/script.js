let toDoData = [];
const localStorage = window.localStorage.maboite;
taskform = document.getElementById("taskform");
taskInput = document.getElementById("task");
taskContainer = document.querySelector(".task-container");
toDoElement = document.querySelectorAll(".todoelement");
window.localStorage.setItem("hello",5) // permet de creer un élément qui s'apelle hello dans le local storage setItem(clef/value)
// window.localStorage.blabla= 7 // permet aussi de creer un élément dans le local storage

const toDoList = (arrayToParse) => {
  taskContainer.innerHTML = "";
  for (let i = 0; i < arrayToParse.length; i++) {
    taskContainer.innerHTML += `
        <div class="todoelement">
        <p class="task-number"> ${i + 1}</p>
        <p>${arrayToParse[i]}</p>
        <div>`;
  }
  window.localStorage.maboite = toDoData;
};

const deleteData = (param) => {
  let taskToDelete = toDoData.find(element => element === param.target.textContent);
  const index = toDoData.indexOf(taskToDelete);
  toDoData.splice(index, 1);
};

if (localStorage) {
  toDoData = localStorage.split(",");
  toDoList(toDoData);
}

taskform.addEventListener("submit", (e) => {
  e.preventDefault();
  toDoData.push(taskInput.value);
  taskInput.value = "";
  toDoList(toDoData);
  return toDoData;
});

taskContainer.addEventListener("click", (e) => {
  deleteData(e);
  toDoList(toDoData);
  return toDoData;
});
