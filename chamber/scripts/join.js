
const btnSubmint = document.querySelector("#btnSubmint")
const timeStamp = document.querySelector("#timestamp")
const joinForm = document.querySelector("#joinForm")
const params = new URLSearchParams(window.location.search)


const aplicationInfor = document.querySelector("#aplication-infor")
const divAplication = document.createElement("div")
divAplication.classList.add("divAplication")

if (aplicationInfor) {
    const fullName = document.createElement("p")
    const organizationTitle = document.createElement("p")
    const organizationName = document.createElement("p")
    const email = document.createElement("p")
    const phoneNumber = document.createElement("p")
    const description = document.createElement("p")
    const memberLevel = document.createElement("p")

    fullName.textContent = `Name: ${params.get('first')} ${params.get('last')}`;
    email.textContent = `Email: ${params.get('email')}`
    phoneNumber.textContent = `Phone Number: ${params.get('phoneNumber')}`
    organizationTitle.textContent = `Organization title: ${params.get('organizationTitle')}`
    organizationName.textContent = `Organization name: ${params.get('organizationTitle')}`
    description.textContent = `Description: ${params.get('organizationDescription')}`
    memberLevel.textContent = `Member Level: ${params.get('membershipLevel')}`

    divAplication.append(
        fullName,
        email,
        phoneNumber,
        organizationTitle,
        organizationName,
        memberLevel,
        description
    )

    aplicationInfor.appendChild(divAplication)
}

