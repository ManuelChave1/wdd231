
/* ========================================
   STUDYTRACK - TASK FORM
   ======================================== */

const taskForm = document.querySelector("#taskForm");
const taskTitle = document.querySelector("#taskTitle");
const subjectSelect = document.querySelector("#subjectId");
const dueDate = document.querySelector("#dueDate");
const taskDescription = document.querySelector("#taskDescription");
const taskFormTitle = document.querySelector("#taskFormTitle");
const taskFormMessage = document.querySelector("#taskFormMessage");

const urlParams = new URLSearchParams(window.location.search);
const taskId = urlParams.get("id");


/* Read saved data safely */
function getSavedArray(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(`Could not read ${key}:`, error);
        return [];
    }
}


/* Load subjects into the dropdown */
function loadSubjectOptions() {
    const subjects = getSavedArray("subjects");

    subjects.forEach((subject) => {
        const option = document.createElement("option");
        option.value = subject.id;
        option.textContent = subject.name;
        subjectSelect.appendChild(option);
    });

    if (subjects.length === 0) {
        taskFormMessage.textContent =
            "You need to add a subject before creating a task.";

        taskForm.querySelector('button[type="submit"]').disabled = true;
    }
}


/* Load task information when editing */
function loadTaskForEditing() {
    if (!taskId) {
        return;
    }

    const tasks = getSavedArray("tasks");
    const task = tasks.find((item) => item.id === taskId);

    if (!task) {
        taskFormMessage.textContent = "Task not found.";
        taskForm.querySelector('button[type="submit"]').disabled = true;
        return;
    }

    taskTitle.value = task.title || "";
    subjectSelect.value = task.subjectId || "";
    dueDate.value = task.dueDate || "";
    taskDescription.value = task.description || "";

    taskFormTitle.textContent = "Edit Task";
}


/* Save a new task or update an existing one */
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const selectedSubjectId = subjectSelect.value;
    const date = dueDate.value;
    const description = taskDescription.value.trim();

    if (!title || !selectedSubjectId || !date) {
        taskFormMessage.textContent =
            "Please complete the task title, subject, and due date.";
        return;
    }

    const subjects = getSavedArray("subjects");

    const subjectExists = subjects.some((subject) => {
        return subject.id === selectedSubjectId;
    });

    if (!subjectExists) {
        taskFormMessage.textContent =
            "Please choose a valid subject.";
        return;
    }

    const tasks = getSavedArray("tasks");

    if (taskId) {
        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        if (taskIndex === -1) {
            taskFormMessage.textContent = "Task not found.";
            return;
        }

        // Keep the existing completion status when editing
        tasks[taskIndex].title = title;
        tasks[taskIndex].subjectId = selectedSubjectId;
        tasks[taskIndex].dueDate = date;
        tasks[taskIndex].description = description;
    } else {
        const newTask = {
            id: crypto.randomUUID(),
            title: title,
            subjectId: selectedSubjectId,
            dueDate: date,
            description: description,
            completed: false
        };

        tasks.push(newTask);
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));

    window.location.href = "tasks.html";
});


/* Initialize the form */
loadSubjectOptions();
loadTaskForEditing();
