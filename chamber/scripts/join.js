
const btnSubmint = document.querySelector("#btnSubmint")
const timeStamp = document.querySelector("#timestamp")
const joinForm = document.querySelector("#joinForm")
const params = new URLSearchParams(window.location.search)



if (joinForm) {
    const aplicationInfor = document.querySelector("#aplication-infor")
    const divAplication = document.createElement("div")
    divAplication.classList.add("divAplication")

    const fullName = document.createElement("p")
    const organizationTitle = document.createElement("p")
    const email = document.createElement("p")
    const phoneNumber = document.createElement("p")
    const description = document.createElement("p")

    fullName.textContent = `Name: ${params.get('first')} ${params.get('last')}`;
    email.textContent = `Email: ${params.get('email')}`
    phoneNumber.textContent = `Phone Number: ${params.get('phoneNumber')}`
    organizationTitle.textContent = `Organization: ${params.get('organization')}`
    description.textContent = `Organization: ${params.get('organizationDescription')}`

    divAplication.append(
        fullName,
        email,
        phoneNumber,
        organizationTitle,
        description
    )

    aplicationInfor.appendChild(divAplication)

}
else {
    alert("Error processing the form")
}
