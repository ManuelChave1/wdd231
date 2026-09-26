
let timeStamp = document.querySelector("#timestamp")
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
    const timeStam = document.createElement("p")

    fullName.innerHTML = `<strong>Name: </strong> ${params.get('first')} ${params.get('last')}`;
    email.innerHTML = `<strong>Email: </strong> ${params.get('email')}`
    phoneNumber.innerHTML = `<strong>Phone Number: </strong> ${params.get('phoneNumber')}`
    organizationTitle.innerHTML = `<strong>Organization title:</strong> ${params.get('organizationTitle')}`
    organizationName.innerHTML = `<strong>Organization name: </strong>${params.get('organizationTitle')}`
    description.innerHTML = `<strong>Description:</strong> ${params.get('organizationDescription')} `
    memberLevel.innerHTML = `<strong>Member Level: </strong> ${params.get('membershipLevel')}`
    timeStam.innerHTML = `<strong>Time: </strong> ${timeStamp}`

    divAplication.append(
        fullName,
        email,
        phoneNumber,
        organizationTitle,
        organizationName,
        memberLevel,
        description,
        timeStam
    )

    aplicationInfor.appendChild(divAplication)
}

// to improve
let currentTime = Date.now();

timeStamp = new Date(currentTime).toLocaleString()
