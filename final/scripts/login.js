const params = new URLSearchParams(window.location.search)
let registerForm = document.querySelector("#registerForm")
let formLogin = document.querySelector("#LoginForm")
let loginFormSubmit = document.querySelector("#loginSubmit")
let btnsubmit = document.querySelector("#btnSubmit")
let myModal = document.querySelector("#myModal")
let LoginModal = document.querySelector("#myModalLogin")


let listOfAccounts = JSON.parse(localStorage.getItem("users")) || []

if (registerForm) {
    const fullName = params.get("full-name")?.trim();
    const email = params.get("email")?.trim().toLowerCase();
    const password = params.get("password");

    if (!fullName || !email || !password) {
        alert("Please fill in all the fields!");
    } else if (password.length < 8) {
        alert("Password must contain at least 8 characters!");
    } else {
        const accountExists = listOfAccounts.some(
            account => account.email?.toLowerCase() === email
        );

        if (accountExists) {
            alert("An account with this email already exists!");
        } else {
            listOfAccounts.push({
                fullName: fullName,
                email: email,
                password: password,
            });


            myModal.showModal()

        }
    }
}

if (formLogin) {

    const fullName = params.get("full-name")?.trim().toLowerCase();
    const email = params.get("email")?.trim().toLowerCase();

    const userExists = listOfAccounts.some(account =>
        account.fullname?.trim().toLowerCase() === fullName &&
        account.email?.trim().toLowerCase() === email
    );
    loginFormSubmit.addEventListener("click", () => {
        if (userExists) {
            window.location.href = "index.html";

        } else {
            LoginModal.showModal();
        }

    })
}
