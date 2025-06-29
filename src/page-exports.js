const projects = [
    {
        title: "default",
        todo: {
            title: "default TODO",
            desc: "This is a default todo, showing the format.",
            dueDate: "N/A",
            priority: "low",
            note: "learn how to use this tool"
        },
        todo1: {
            title: "default TODO",
            desc: "This is a default todo, showing the format.",
            dueDate: "N/A",
            priority: "low",
            note: "learn how to use this tool"
        }
    }
   ];

function load_project(project) {
   const main = document.querySelector("main");
   const project_head = document.createElement("h2");
   const todo_head = document.createElement("h3");

   project_head.textContent = `Project: ${project.title}`;
   todo_head.textContent = "Todos: ";

   main.appendChild(project_head);
   main.appendChild(todo_head);
   for (let item in project) {
      if (item === "title") {
        continue;
      }
      const main_wrapper = document.createElement("div");
      const todoBtn = document.createElement("button");

      main_wrapper.classList.add("main-wrapper");
      todoBtn.textContent = project.todo.title;
      todoBtn.addEventListener("click", () => {
        const info_wrapper = document.createElement("div");
        const info_head = document.createElement("h4");
        const info_desc = document.createElement("p");
        const info_dueDate = document.createElement("p");
        const info_priority = document.createElement("p");
        const info_note = document.createElement("p");

        info_note.textContent = `Notes: ${project.todo.note}`;
        info_priority.textContent = `Priority level: ${project.todo.priority}`;
        info_dueDate.textContent = `Due date: ${project.todo.dueDate}`;
        info_desc.textContent = `Description: ${project.todo.desc}`;
        info_head.textContent = project.todo.title;
        info_wrapper.classList.add("info-wrapper");

        info_wrapper.appendChild(info_head);
        info_wrapper.appendChild(info_desc);
        info_wrapper.appendChild(info_dueDate);
        info_wrapper.appendChild(info_priority);
        info_wrapper.appendChild(info_note)
        main_wrapper.appendChild(info_wrapper);
      });

      main_wrapper.appendChild(todoBtn);
      main.appendChild(main_wrapper);
   }
}

export function projects_bar() {
   const nav = document.querySelector("nav");
   for (let project in projects) {
    const project_button = document.createElement("button");

    project_button.textContent = projects[project].title;
    project_button.addEventListener("click", () => {
        load_project(projects[project]);
    });

    nav.appendChild(project_button);
   }
}