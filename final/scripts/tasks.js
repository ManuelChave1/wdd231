
/* ========================================
   STUDYTRACK - TASK MANAGEMENT
   ======================================== */

const tasksContent = document.querySelector("#tasksContent");
const taskSearch = document.querySelector("#taskSearch");
const taskFilter = document.querySelector("#taskFilter");

let tasks = [];
let subjects = [];


/* Load saved arrays */
function getSavedArray(key) {
    try {
        const data = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(`Could not read ${key}:`, error);
        return [];
    }
}


/* Load tasks and subjects */
function loadTasks() {
    tasks = getSavedArray("tasks");
    subjects = getSavedArray("subjects");

    displayTasks();
}


/* Check whether a task is completed */
function isCompleted(task) {
    return task.completed === true
        || task.done === true
        || task.status === "completed";
}


/* Find the subject associated with a task */
function getSubjectName(subjectId) {
    const subject = subjects.find((item) => item.id === subjectId);

    return subject ? subject.name : "Subject not found";
}


/* Format a due date */
function formatDueDate(dateString) {
    if (!dateString) {
        return "No due date";
    }

    const date = new Date(`${dateString}T12:00:00`);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}


/* Display the task list */
function displayTasks() {
    tasksContent.innerHTML = "";

    const searchText = taskSearch.value.trim().toLowerCase();
    const selectedFilter = taskFilter.value;

    const filteredTasks = tasks.filter((task) => {
        const subjectName = getSubjectName(task.subjectId);

        const matchesSearch =
            (task.title || "").toLowerCase().includes(searchText)
            || subjectName.toLowerCase().includes(searchText);

        let matchesFilter = true;

        if (selectedFilter === "pending") {
            matchesFilter = !isCompleted(task);
        } else if (selectedFilter === "completed") {
            matchesFilter = isCompleted(task);
        }

        return matchesSearch && matchesFilter;
    });

    // Show a message if there are no matching tasks
    if (filteredTasks.length === 0) {
        const message = document.createElement("p");

        if (tasks.length === 0) {
            message.textContent =
                "You haven't added any tasks yet. Click Add Task to get started.";
        } else {
            message.textContent = "No tasks match your search or filter.";
        }

        tasksContent.appendChild(message);
        return;
    }

    // Display each task
    filteredTasks.forEach((task) => {
        const article = document.createElement("article");
        article.classList.add("task-card");

        if (isCompleted(task)) {
            article.classList.add("task-completed");
        }

        const heading = document.createElement("h2");
        heading.textContent = task.title || "Untitled task";

        const subject = document.createElement("p");
        subject.textContent = `Subject: ${getSubjectName(task.subjectId)}`;

        const date = document.createElement("p");
        date.textContent = `Due date: ${formatDueDate(task.dueDate)}`;

        const description = document.createElement("p");
        description.textContent = task.description || "No description provided.";

        const status = document.createElement("p");
        status.textContent = isCompleted(task) ? "Completed" : "Pending";
        status.classList.add("task-status");

        // Completion checkbox
        const completionLabel = document.createElement("label");
        const completionCheckbox = document.createElement("input");

        completionCheckbox.type = "checkbox";
        completionCheckbox.checked = isCompleted(task);

        completionCheckbox.addEventListener("change", () => {
            toggleTaskCompletion(task.id, completionCheckbox.checked);
        });

        completionLabel.append(
            completionCheckbox,
            document.createTextNode(" Mark as completed")
        );

        // Edit link
        const editLink = document.createElement("a");
        editLink.href = `taskForm.html?id=${encodeURIComponent(task.id)}`;
        editLink.textContent = "Edit";
        editLink.classList.add("edit-button");

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", () => {
            deleteTask(task.id);
        });

        const actions = document.createElement("div");
        actions.classList.add("subject-actions");
        actions.append(completionLabel, editLink, deleteButton);

        article.append(heading, subject, date, description, status, actions);
        tasksContent.appendChild(article);
    });
}


/* Mark a task as completed or pending */
function toggleTaskCompletion(taskId, completed) {
    tasks = tasks.map((task) => {
        if (task.id === taskId) {
            return {
                ...task,
                completed: completed
            };
        }

        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}


/* Delete a task */
function deleteTask(taskId) {
    const task = tasks.find((item) => item.id === taskId);

    if (!task) {
        return;
    }

    const confirmDelete = window.confirm(
        `Are you sure you want to delete "${task.title}"?`
    );

    if (!confirmDelete) {
        return;
    }

    tasks = tasks.filter((item) => item.id !== taskId);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}


/* Search and filter listeners */
taskSearch.addEventListener("input", displayTasks);
taskFilter.addEventListener("change", displayTasks);


/* Initialize the page */
loadTasks();
