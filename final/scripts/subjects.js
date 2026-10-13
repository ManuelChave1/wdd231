
/* ========================================
   STUDYTRACK - SUBJECTS MANAGEMENT
   ======================================== */

// Get elements from subjects.html
const subjectsContainer = document.querySelector("#subjectsContentInfo");
const subjectSearch = document.querySelector("#subjectSearch");

// Store all subjects loaded from localStorage
let subjects = [];


/* ========================================
   1. LOAD SUBJECTS
   ======================================== */

function loadSubjects() {
    const savedSubjects = localStorage.getItem("subjects");

    if (savedSubjects) {
        try {
            const parsedSubjects = JSON.parse(savedSubjects);

            // Make sure the saved data is an array
            if (Array.isArray(parsedSubjects)) {
                subjects = parsedSubjects;
            } else {
                subjects = [];
            }
        } catch (error) {
            console.error("Error loading subjects:", error);
            subjects = [];
        }
    } else {
        subjects = [];
    }

    displaySubjects(subjects);
}


/* ========================================
   2. DISPLAY SUBJECTS
   ======================================== */

function displaySubjects(subjectList) {
    if (!subjectsContainer) {
        return;
    }

    // Clear the current list before displaying subjects
    subjectsContainer.innerHTML = "";

    // Show a message if there are no subjects
    if (subjectList.length === 0) {
        const message = document.createElement("p");

        if (subjects.length === 0) {
            message.textContent =
                "You haven't added any subjects yet. Click Add Subject to get started.";
        } else {
            message.textContent =
                "No subjects match your search.";
        }

        message.classList.add("empty-message");
        subjectsContainer.appendChild(message);
        return;
    }

    // Create an element for each subject
    subjectList.forEach((subject) => {
        const article = document.createElement("article");
        article.classList.add("subject-row");

        // Subject name
        const name = document.createElement("h3");
        name.textContent = subject.name;

        // Subject progress
        const progress = document.createElement("p");
        const progressValue = Number(subject.progress) || 0;

        progress.textContent = `${progressValue}%`;
        progress.classList.add("subject-progress");

        // Actions container
        const actions = document.createElement("div");
        actions.classList.add("subject-actions");

        // Edit link
        const editLink = document.createElement("a");
        editLink.href =
            `subjectsForm.html?id=${encodeURIComponent(subject.id)}`;
        editLink.textContent = "Edit";
        editLink.classList.add("edit-button");
        editLink.setAttribute("aria-label", `Edit ${subject.name}`);

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.setAttribute(
            "aria-label",
            `Delete ${subject.name}`
        );

        deleteButton.addEventListener("click", () => {
            deleteSubject(subject.id);
        });

        // Add actions to the row
        actions.append(editLink, deleteButton);

        // Add elements to the subject article
        article.append(name, progress, actions);

        // Add the subject to the page
        subjectsContainer.appendChild(article);
    });
}


/* ========================================
   3. SEARCH SUBJECTS
   ======================================== */

function searchSubjects() {
    const searchText = subjectSearch.value.trim().toLowerCase();

    const filteredSubjects = subjects.filter((subject) => {
        return subject.name.toLowerCase().includes(searchText);
    });

    displaySubjects(filteredSubjects);
}


/* ========================================
   4. DELETE SUBJECTS
   ======================================== */

function deleteSubject(subjectId) {
    const subjectToDelete = subjects.find((subject) => {
        return subject.id === subjectId;
    });

    // Stop if the subject doesn't exist
    if (!subjectToDelete) {
        return;
    }

    // Ask the user to confirm deletion
    const confirmDelete = window.confirm(
        `Are you sure you want to delete "${subjectToDelete.name}"?`
    );

    if (!confirmDelete) {
        return;
    }

    // Remove the selected subject
    subjects = subjects.filter((subject) => {
        return subject.id !== subjectId;
    });

    // Update localStorage
    localStorage.setItem("subjects", JSON.stringify(subjects));

    // Refresh the displayed list
    searchSubjects();
}


/* ========================================
   5. INITIALIZE THE PAGE
   ======================================== */

// Listen for changes in the search field
if (subjectSearch) {
    subjectSearch.addEventListener("input", searchSubjects);
}

// Load subjects when the page opens
loadSubjects();
