'use strict';

/* your code goes here! */

class Task {

  constructor(newDescription, newIsComplete) {
    this.description = newDescription;
    this.complete = newIsComplete;
  }

    render() {
      let elem = document.createElement('li');
      elem.textContent = this.description;
      if (this.complete) {
        elem.classList.add("font-strike");
      }

      elem.addEventListener("click", () => {
        console.log("you clicked me");
        this.toggleFinished();
        elem.classList.toggle('font-strike');
      })
      return elem;
    }

    toggleFinished() {
      this.complete = !this.complete;
    }
}

class TaskList {
  constructor(taskArray) {
    this.tasks = taskArray;
  }

  addTask(descrString) {
    let newTask = new Task(descrString, false);
    this.tasks.push(newTask);
  }

  render() {
    let olElem = document.createElement("ol");
    this.tasks.forEach((aTask) => {
      let taskElem = aTask.render();
      olElem.appendChild(taskElem);
    })
    return olElem;
  }
}

class NewTaskForm {
constructor(whatFunctionToCallWhenSubmitted) {
  this.submitCallback = whatFunctionToCallWhenSubmitted;
}

  render() {
    let formElem = document.createElement("form");

    let inputElem = document.createElement("input");
    inputElem.classList.add("form-control", "mb-3");
    inputElem.setAttribute("placeholder", "What else do you have to do?");
    formElem.appendChild(inputElem);
    let buttonElem = document.createElement("button");
    buttonElem.classList.add("btn", "btn-primary");
    buttonElem.textContent = "Add task to list";
    formElem.appendChild(buttonElem)

    buttonElem.addEventListener("click", (event) => {
      event.preventDefault();
      let inputValue = inputElem.value;
      this.submitCallback(inputValue);
    })


    return formElem;
  }
}

class App {
  constructor(newParentElement, newTaskList) {
    this.parentElement = newParentElement;
    this.taskList = newTaskList;
  }

  render() {
    let listElem = this.taskList.render();
    this.parentElement.appendChild(listElem);

    let formObj = new NewTaskForm((arg) => this.addTaskToList(arg));
    this.parentElement.appendChild(formObj.render());
  }

  addTaskToList(descrString) {
    this.taskList.addTask(descrString);
    // refresh w new content
    this.parentElement.innerHTML = "";
    this.render();
  }
}


let taskListObj = new TaskList([
  new Task("Make some classes", true),
  new Task("Arrow some functions", false)
]);


let appElem = document.querySelector("#app");
let appObj = new App(appElem, taskListObj);
appObj.render();




//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined') 
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined') 
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined') 
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined') 
    module.exports.App = App;
}
