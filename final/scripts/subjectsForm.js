
const subjectForm = document.querySelector("#subjectForm");
const subjectName = document.querySelector("#subjectName");
const subjectDescription = document.querySelector("#subjectDescription");
const formTitle = document.querySelector("#formTitle");
const formMessage = document.querySelector("#formMessage");

// Check whether the user is editing an existing subject
const urlParams = new URLSearchParams(window.location.search);
const subjectId = urlParams.get("id");

// Load saved subjects
function getSubjects() {
    const savedSubjects = localStorage.getItem("subjects");

    if (savedSubjects) {
        try {
            const parsedSubjects = JSON.parse(savedSubjects);

            if (Array.isArray(parsedSubjects)) {
                return parsedSubjects;
            }
        } catch (error) {
            console.error("Could not load subjects:", error);
        }
    }

    return [];
}

// If an ID exists in the URL, load that subject into the form
function loadSubjectForEditing() {
    if (!subjectId) {
        return;
    }

    const subjects = getSubjects();

    const subject = subjects.find((item) => item.id === subjectId);

    if (subject) {
        subjectName.value = subject.name;
        subjectDescription.value = subject.description || "";
        formTitle.textContent = "Edit Subject";
    } else {
        formMessage.textContent = "Subject not found. You can add a new subject.";
    }
}

// Save a new subject or update an existing one
subjectForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = subjectName.value.trim();
    const description = subjectDescription.value.trim();

    if (name === "") {
        formMessage.textContent = "Please enter a subject name.";
        subjectName.focus();
        return;
    }

    const subjects = getSubjects();

    // Check whether another subject already uses this name
    const duplicateSubject = subjects.some((subject) => {
        return subject.name.toLowerCase() === name.toLowerCase()
            && subject.id !== subjectId;
    });

    if (duplicateSubject) {
        formMessage.textContent = "A subject with this name already exists.";
        subjectName.focus();
        return;
    }

    if (subjectId) {
        // Update an existing subject
        const subjectIndex = subjects.findIndex((subject) => {
            return subject.id === subjectId;
        });

        if (subjectIndex === -1) {
            formMessage.textContent = "The subject could not be found.";
            return;
        }

        subjects[subjectIndex].name = name;
        subjects[subjectIndex].description = description;
    } else {
        // Create a new subject
        const newSubject = {
            id: crypto.randomUUID(),
            name: name,
            description: description,
            progress: 0
        };

        subjects.push(newSubject);
    }

    // Save the updated array in localStorage
    localStorage.setItem("subjects", JSON.stringify(subjects));

    // Return to the subjects page
    window.location.href = "subjects.html";
});

// Prepare the form when the page opens
loadSubjectForEditing();
