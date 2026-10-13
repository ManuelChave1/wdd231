const params = new URLSearchParams(window.location.search)
let registerForm = document.querySelector("#registerForm")
let btnsubmit = document.querySelector("#btnSubmit")
let btnGoLogin = document.querySelector("#btnGoLogin")
let myModal = document.querySelector("#myModal")

let listOfAccounts = JSON.parse(localStorage.getItem("users")) || []
if (registerForm) {
    if (params.get("full-name") === "" && params.get("email") === "" && params.get("password")) {
        return
    } else {
        listOfAccounts.push({
            fullname: params.get("full-name"),
            email: params.get("email"),
            password: params.get("password")

        })
    }
    localStorage.setItem("users", JSON.stringify(listOfAccounts))
    myModal.show();

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
