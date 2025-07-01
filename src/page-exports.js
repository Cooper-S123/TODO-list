const projects = [
    {
        title: "default",
        todo: {
            title: "default TODO",
            desc: "This is a default todo, showing the format.",
            dueDate: "N/A",
            priority: "low",
            note: "learn how to use this tool",
            display: false
        },
        todo1: {
            title: "default hello",
            desc: "This is a default todo, showing the format.",
            dueDate: "1999",
            priority: "low",
            note: "learn how to use this tool",
            display: false
        }
    }
   ];

let iterations = 0;
function load_project(project) {
   const main = document.querySelector("main");
   const removal_wrapper = document.createElement("div");
   const project_head = document.createElement("h2");
   const todo_head = document.createElement("h3");
   
   removal_wrapper.setAttribute("id", "removal-wrapper");
   project_head.textContent = `Project: ${project.title}`;
   todo_head.textContent = "Todos: ";

   removal_wrapper.appendChild(project_head);
   removal_wrapper.appendChild(todo_head);
   for (let item in project) {
      if (item === "title") {
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
        if (item === "title") {
          continue;
        }
       project[item].display = false;
    }
}

export function projects_bar() {
   const nav = document.querySelector("nav");
   for (let project in projects) {
    const project_button = document.createElement("button");

    project_button.textContent = projects[project].title;
    project_button.addEventListener("click", () => {
        if (iterations > 0) {
            const removal_wrapper = document.getElementById("removal-wrapper");
            removal_wrapper.remove();
            reset(projects[project]);
        }
        load_project(projects[project]);
    });

    nav.appendChild(project_button);
   }
}