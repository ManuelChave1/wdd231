
const registerForm = document.querySelector("#registerForm");
const loginForm = document.querySelector("#LoginForm");

let listOfAccounts = JSON.parse(localStorage.getItem("users")) || [];

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const fullName = document.querySelector("#full-name").value.trim();
        const email = document.querySelector("#email").value.trim().toLowerCase();
        const password = document.querySelector("#password").value;

        if (password.length < 8) {
            alert("Password must contain at least 8 characters.");
            return;
        }

        const accountExists = listOfAccounts.some(
            account => account.email === email
        );

        if (accountExists) {
            alert("An account with this email already exists.");
            return;
        }

        const newAccount = {
            fullName: fullName,
            email: email,
            password: password
        };

        listOfAccounts.push(newAccount);

        localStorage.setItem("users", JSON.stringify(listOfAccounts));

        alert("Account created successfully!");
        window.location.href = "login.html";
    });
}

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.querySelector("#loginEmail").value
            .trim().toLowerCase();

        const password = document.querySelector("#loginPassword").value;

        const userExists = listOfAccounts.find(
            account =>
                account.email === email &&
                account.password === password
        );

        if (userExists) {
            localStorage.setItem("currentUser", JSON.stringify({
                fullName: userExists.fullName,
                email: userExists.email
            }));

            window.location.href = "index.html";
        } else {
            alert("Incorrect email or password. Please try again.");
        }
    });
}



