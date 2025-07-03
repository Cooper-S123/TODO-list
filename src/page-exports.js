const projects = [
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

let iterations = 0;
function load_project(project) {
   const main = document.querySelector("main");
   const removal_wrapper = document.createElement("div");
   const project_head = document.createElement("h2");
   const todo_head = document.createElement("h3");
   
   removal_wrapper.setAttribute("id", "removal-wrapper");
   project_head.textContent = `Project: ${project[0]}`;
   todo_head.textContent = "Todos: ";

   removal_wrapper.appendChild(project_head);
   removal_wrapper.appendChild(todo_head);
   for (let item in project) {
      if (item === "0") {
        continue;
      }
      const main_wrapper = document.createElement("div");
      const todoBtn = document.createElement("button");

      main_wrapper.classList.add("main-wrapper");
      todoBtn.textContent = project[item].title;
      todoBtn.addEventListener("click", () => {
        if (project[item].display === false) {
            project[item].display = true;
         }
         else if (project[item].display === true) {
           project[item].display = false;
         }
        
        if (project[item].display === true) {
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

      main_wrapper.appendChild(todoBtn);
      removal_wrapper.appendChild(main_wrapper);
      main.appendChild(removal_wrapper);
   }
   iterations++;
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

function dialog(currentProject, project) {
    const showDialog = document.querySelector("#showDialog");
    const dialog = document.querySelector("dialog");
    const confirmBtn = document.querySelector("#confirmBtn");

    showDialog.addEventListener("click", () => {
      dialog.showModal();
    });

    confirmBtn.addEventListener("click", (event) => {
      try {
        const newTitle = document.querySelector("#title");
        const newDesc = document.querySelector("#desc");
        const newDate = document.querySelector("#date");
        const newPriority = document.querySelector("#priority");
        const newNotes = document.querySelector("#note");
        
        let newTodo = new Todo(newTitle.value, newDesc.value, newDate.value, newPriority.value, newNotes.value);
        projects[currentProject].push(newTodo);

        event.preventDefault();
        dialog.close();

        const removal_wrapper = document.getElementById("removal-wrapper");
        removal_wrapper.remove();
        load_project(project);
      } catch (error) {
         projects[currentProject].splice((projects[currentProject].length - 1), 1);
         errorPage();
      }
    });
}

export function projects_bar() {
   const nav = document.querySelector("nav");
   for (let project in projects) {
    const project_button = document.createElement("button");

    project_button.textContent = projects[project][0];
    project_button.addEventListener("click", () => {
        if (iterations > 0) {
            const removal_wrapper = document.getElementById("removal-wrapper");
            removal_wrapper.remove();
            reset(projects[project]);
        }
        load_project(projects[project]);
    });
   
    nav.appendChild(project_button);
    dialog(project, projects[project]);
   }
}