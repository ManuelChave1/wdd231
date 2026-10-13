
/* ========================================
   STUDYTRACK - HOME DASHBOARD
   ======================================== */

// Get dashboard elements
const totalSubjectsElement = document.querySelector("#totalSubjects");
const totalTasksElement = document.querySelector("#totalTasks");
const completedTasksElement = document.querySelector("#completedTasks");
const averageProgressElement = document.querySelector("#averageProgress");
const subjectsProgressElement = document.querySelector("#subjectsProgress");
const upcomingTasksElement = document.querySelector("#upcomingTasks");
const userNameElement = document.querySelector("#userName");


/* ========================================
   1. LOAD SAVED DATA
   ======================================== */

function getSavedData(key) {
    const savedData = localStorage.getItem(key);

    if (!savedData) {
        return [];
    }

    try {
        const data = JSON.parse(savedData);

        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(`Error loading ${key}:`, error);
        return [];
    }
}


/* ========================================
   2. CALCULATE SUBJECT PROGRESS
   ======================================== */

function getSubjectProgress(subject, tasks) {
    // Find tasks belonging to this subject
    const subjectTasks = tasks.filter((task) => {
        return task.subjectId === subject.id;
    });

    // If the subject has tasks, calculate progress from them
    if (subjectTasks.length > 0) {
        const completed = subjectTasks.filter(isTaskCompleted).length;

        return Math.round((completed / subjectTasks.length) * 100);
    }

    // Otherwise, use the progress saved with the subject
    const progress = Number(subject.progress) || 0;

    return Math.min(100, Math.max(0, progress));
}


/* ========================================
   3. CHECK TASK COMPLETION
   ======================================== */

function isTaskCompleted(task) {
    return task.completed === true
        || task.done === true
        || task.status === "completed";
}


/* ========================================
   4. DISPLAY DASHBOARD STATISTICS
   ======================================== */

function displayStatistics(subjects, tasks) {
    // Total subjects
    totalSubjectsElement.textContent = subjects.length;

    // Total tasks
    totalTasksElement.textContent = tasks.length;

    // Completed tasks
    const completedTasks = tasks.filter(isTaskCompleted);

    completedTasksElement.textContent = completedTasks.length;

    // Calculate average subject progress
    if (subjects.length === 0) {
        averageProgressElement.textContent = "0";
        return;
    }

    let totalProgress = 0;

    subjects.forEach((subject) => {
        totalProgress += getSubjectProgress(subject, tasks);
    });

    const averageProgress = Math.round(totalProgress / subjects.length);

    averageProgressElement.textContent = averageProgress;
}


/* ========================================
   5. DISPLAY PROGRESS BY SUBJECT
   ======================================== */

function displaySubjectsProgress(subjects, tasks) {
    subjectsProgressElement.innerHTML = "";

    if (subjects.length === 0) {
        const message = document.createElement("p");
        message.textContent =
            "No subjects yet. Add your first subject to track your progress.";

        subjectsProgressElement.appendChild(message);
        return;
    }

    subjects.forEach((subject) => {
        const progress = getSubjectProgress(subject, tasks);

        const article = document.createElement("article");
        article.classList.add("subject-progress-item");

        const heading = document.createElement("div");
        heading.classList.add("progress-heading");

        const name = document.createElement("h3");
        name.textContent = subject.name;

        const percentage = document.createElement("span");
        percentage.textContent = `${progress}%`;

        heading.append(name, percentage);

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");

        const progressFill = document.createElement("div");
        progressFill.classList.add("progress-fill");

        progressFill.style.width = `${progress}%`;

        progressBar.setAttribute("role", "progressbar");
        progressBar.setAttribute("aria-label", `${subject.name} progress`);
        progressBar.setAttribute("aria-valuemin", "0");
        progressBar.setAttribute("aria-valuemax", "100");
        progressBar.setAttribute("aria-valuenow", progress);

        progressBar.appendChild(progressFill);
        article.append(heading, progressBar);

        subjectsProgressElement.appendChild(article);
    });
}


/* ========================================
   6. DISPLAY UPCOMING TASKS
   ======================================== */

function displayUpcomingTasks(tasks, subjects) {
    upcomingTasksElement.innerHTML = "";

    // Keep only incomplete tasks with a due date
    const upcomingTasks = tasks
        .filter((task) => {
            return !isTaskCompleted(task) && task.dueDate;
        })
        .sort((a, b) => {
            return a.dueDate.localeCompare(b.dueDate);
        })
        .slice(0, 5);

    if (upcomingTasks.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No upcoming tasks. You're all caught up!";

        upcomingTasksElement.appendChild(message);
        return;
    }

    upcomingTasks.forEach((task) => {
        const article = document.createElement("article");
        article.classList.add("upcoming-task-item");

        const title = document.createElement("h3");
        title.textContent = task.title || task.taskTitle || "Untitled task";

        const dueDate = document.createElement("p");
        dueDate.textContent = `Due: ${formatDate(task.dueDate)}`;

        article.append(title, dueDate);

        // Show the subject name when the task is linked to a subject
        const subject = subjects.find((item) => {
            return item.id === task.subjectId;
        });

        if (subject) {
            const subjectName = document.createElement("p");
            subjectName.textContent = `Subject: ${subject.name}`;
            article.appendChild(subjectName);
        }

        upcomingTasksElement.appendChild(article);
    });
}


/* ========================================
   7. FORMAT DATES
   ======================================== */

function formatDate(dateString) {
    // Add a time to avoid date-only timezone shifts
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


/* ========================================
   8. UPDATE THE DASHBOARD
   ======================================== */

function updateDashboard() {
    const subjects = getSavedData("subjects");
    const tasks = getSavedData("tasks");

    displayStatistics(subjects, tasks);
    displaySubjectsProgress(subjects, tasks);
    displayUpcomingTasks(tasks, subjects);
}


/* ========================================
   9. START THE DASHBOARD
   ======================================== */

// Update the dashboard when the page opens
updateDashboard();

// Update when localStorage changes in another browser tab
window.addEventListener("storage", (event) => {
    if (event.key === "subjects" || event.key === "tasks") {
        updateDashboard();
    }
});
