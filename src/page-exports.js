let projects;
const default_projects = [
    [
         "default",
         {
            title: "default TODO",
            desc: "This is a default todo, showing the format.",
            dueDate: "N/A",
            priority: "low",
            note: "learn how to use this tool",
            display: false
        },
         {
            title: "default hello",
            desc: "This is a default todo, showing the format.",
            dueDate: "1999",
            priority: "low",
            note: "learn how to use this tool",
            display: false
        }
    ]
   ];
let currentProject;
let iterations = 0;
let recentlyRemoved = false;
let forIterations = 0;
function load_project(project) {
   currentProject = project[0];
   preScreen();
   const main = document.querySelector("main");
   const removal_wrapper = document.createElement("div");
   const project_head = document.createElement("h2");
   const todo_head = document.createElement("h3");
   const deleteBtn = document.createElement("button");
   
   deleteBtn.textContent = "delete project";
   deleteBtn.classList.add("delete-project");
   removal_wrapper.setAttribute("id", "removal-wrapper");
   project_head.textContent = `Project: ${project[0]}`;
   todo_head.textContent = "Todos: ";

   deleteBtn.addEventListener("click", () => {
     let projectIndex = projects.indexOf(project);
     projects.splice(projectIndex, 1);
     const navBtn = document.querySelectorAll("#projectBtn");
     navBtn.forEach((button) => {
           button.remove();
     }); 
     displayProjects();
     removal_wrapper.remove();
     recentlyRemoved = true;
     saveProjects();
   });

   removal_wrapper.appendChild(project_head);
   removal_wrapper.appendChild(todo_head);
   for (let item in project) {
      if (item === "0") {
        continue;
      }
      const main_wrapper = document.createElement("div");
      const todoBtn = document.createElement("button");
      const removeBtn = document.createElement("button");
      const buttons = document.createElement("div");
      const buttonCenter = document.createElement("div");

      buttonCenter.classList.add("center-removeBtn");
      removeBtn.textContent = "X";
      removeBtn.classList.add("remove-todo");
      buttons.classList.add("todo-buttons");
      main_wrapper.classList.add("main-wrapper");
      todoBtn.textContent = project[item].title;
      if (project[item].priority === "low") {
        todoBtn.classList.add("prior-low");
      } 
      else  if (project[item].priority === "medium") {
        todoBtn.classList.add("prior-medium");
      }
      else  if (project[item].priority === "high") {
        todoBtn.classList.add("prior-high");
      }
      else {
        todoBtn.classList.add("prior-undefined");
      }
      todoBtn.addEventListener("click", () => {
        if (project[item].display === false) {
            project[item].display = true;
         }
         else if (project[item].display === true) {
           project[item].display = false;
         }
        
        if (project[item].display === true) {
            try {
                const info_remove = document.getElementById("info-wrapper");
                info_remove.remove();
                for (let todo in project) {
                   if (todo === "0" || todo === item) {
                    continue;
                   }
                   project[todo].display = false;
                }
            } catch(error) {}
            const info_wrapper = document.createElement("div");
            const info_head = document.createElement("h4");
            const info_desc = document.createElement("p");
            const info_dueDate = document.createElement("p");
            const info_priority = document.createElement("p");
            const info_note = document.createElement("p");

            info_note.textContent = `Notes: ${project[item].note}`;
            info_priority.textContent = `Priority level: ${project[item].priority}`;
            info_dueDate.textContent = `Due date: ${project[item].dueDate}`;
            info_desc.textContent = `Description: ${project[item].desc}`;
            info_head.textContent = project[item].title;
            info_wrapper.classList.add("info-wrapper");
            info_wrapper.setAttribute("id", "info-wrapper")

            info_wrapper.appendChild(info_head);
            info_wrapper.appendChild(info_desc);
            info_wrapper.appendChild(info_dueDate);
            info_wrapper.appendChild(info_priority);
            info_wrapper.appendChild(info_note)
            main_wrapper.appendChild(info_wrapper);
        }
        else {
            const info_remove = document.getElementById("info-wrapper");
            info_remove.remove();
        }
      });

      removeBtn.addEventListener("click", () => {
           project.splice(item, 1);
           main_wrapper.remove();
           saveProjects();
      });

      buttonCenter.appendChild(removeBtn);
      buttons.appendChild(todoBtn);
      buttons.appendChild(buttonCenter);
      main_wrapper.appendChild(buttons);
      removal_wrapper.appendChild(main_wrapper);
   }
   removal_wrapper.appendChild(deleteBtn);
   main.appendChild(removal_wrapper);
   iterations++;
}

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
}

function getProjects() {
    if (localStorage.getItem("projects") === undefined || localStorage.getItem("projects") === null) {
        projects = default_projects;
    }
    else {
        projects = JSON.parse(localStorage.getItem("projects"));
    }
    
}

function saveProjects() {
    localStorage.setItem("projects", JSON.stringify(projects));
    addTodoFunction();
}

function load_storage() {
    if (storageAvailable("localStorage")) {
        getProjects();
    }
    else {
        projects = default_projects;
    }
    addTodoFunction();
}

function reset(project) {
    for (let item in project) {
        if (item === "0") {
          continue;
        }
       project[item].display = false;
    }
}

function Todo(title, desc, date, priority, notes) {
   this.title = title;
   this.desc = desc;
   this.dueDate = date;
   this.priority = priority;
   this.note = notes;
   this.display = false;
}

function errorPage() {
   const warning = document.createElement("dialog");
   const errorMessage = document.createElement("h2");
   const closeBtn = document.createElement("button");
   const main = document.querySelector("main");

   warning.setAttribute("id", "errorPage");
   errorMessage.textContent = "Select a project before adding a TODO";
   closeBtn.textContent = "X";
   warning.appendChild(errorMessage);
   warning.appendChild(closeBtn);

   main.appendChild(warning);

   warning.showModal();

   closeBtn.addEventListener("click", () => {
     warning.remove();
   });
}

function addTodo(project) {
    const showDialog = document.querySelector("#showDialog");
    const dialog = document.querySelector("dialog");
    const confirmBtn = document.querySelector("#confirmBtn");

    showDialog.addEventListener("click", () => {
      dialog.showModal();
    });

    confirmBtn.addEventListener("click", (event) => {
      try {
        if (project[0] !== currentProject && currentProject !== undefined) {
           return;
        }
        const newTitle = document.querySelector("#title");
        const newDesc = document.querySelector("#desc");
        const newDate = document.querySelector("#date");
        const newPriority = document.querySelector("#priority");
        const newNotes = document.querySelector("#note");
        
        let newTodo = new Todo(newTitle.value, newDesc.value, newDate.value, newPriority.value, newNotes.value);
        project.push(newTodo);

        event.preventDefault();
        dialog.close();

        const removal_wrapper = document.getElementById("removal-wrapper");
        removal_wrapper.remove();
        load_project(project);
      } catch (error) {
         if (project.length > 0) {
           project.splice((project.length - 1), 1);
         }
         else {
            project.spice(project.length, 1);
         }
         errorPage();
      }
      saveProjects();
    });
}

function addProject() {
    const dialog = document.querySelector("#addProject");
    const showBtn = document.querySelector("#newProject");
    const confirmBtn = document.querySelector("#submitBtn");
     
    showBtn.addEventListener("click", () => {
       dialog.showModal();
    });
    
    confirmBtn.addEventListener("click", () => {
       const newName = document.querySelector("#name");

       let newProject = [newName.value];
       projects.push(newProject);

       const removeBtns = document.querySelectorAll("#projectBtn");

       removeBtns.forEach((button) => {
          button.remove();
       });
       displayProjects();
       saveProjects();
    });
}

function preScreen() {
    if (currentProject === undefined) {
        const main = document.querySelector("main");
        const text = document.createElement("h4");

        text.id = "preText";
        text.textContent = "Select a project to see/add Todos!";

        main.appendChild(text);
    }
    else {
       const removeText = document.querySelector("#preText");
       if (removeText !== null) {
         removeText.remove();
       }
    }
}

function addTodoFunction() {
    for (let project in projects) {
        if (project <= forIterations - 1) {
           continue;
        }
        addTodo(projects[project]);
        forIterations++;
    }
}

function displayProjects() {
    const nav = document.querySelector("nav");
    for (let project in projects) {
        const project_button = document.createElement("button");

        project_button.id = "projectBtn";
        project_button.textContent = projects[project][0];
        project_button.addEventListener("click", () => {
            if (iterations > 0 && !recentlyRemoved) {
                const removal_wrapper = document.getElementById("removal-wrapper");
                removal_wrapper.remove();
                reset(projects[project]);
            }
            else if (recentlyRemoved) {
                recentlyRemoved = false;
            }
            load_project(projects[project]);
        });
       
        nav.appendChild(project_button);
       }
}

export function projects_bar() {
   load_storage();
   preScreen();
   addProject();
   displayProjects();
}