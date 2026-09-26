const joinForm = document.querySelector("#joinForm")
const joinPage = document.querySelector("#joinPage")
const modal = document.querySelector("#myModal")
const btnClosemodal = document.querySelector("#close")
const learnMore = document.querySelectorAll(".learnMore")


if (joinPage) {

    learnMore.forEach(button => {

        button.addEventListener("click", () => {

            const membershipCard = button.parentElement;

            let membership;

            if (membershipCard.classList.contains("np-member")) {
                membership = "np";

            } else if (membershipCard.classList.contains("bronze-membership")) {
                membership = "bronze";

            } else if (membershipCard.classList.contains("silver-membership")) {
                membership = "silver";

            } else if (membershipCard.classList.contains("gold-membership")) {
                membership = "gold";
            }

            createModal(membership);

            modal.showModal();
        });

    });

}


if (joinForm) {
    let timeStamp = document.querySelector("#timestamp")
    const current = Date.now()
    timeStamp.value = new Date(current).toLocaleString()
}

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
    timeStam.innerHTML = `<strong>Time: </strong> ${params.get('timestamp')}`

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
const card = document.createElement("div")
function createModal(membership) {
    card.innerHTML = ""
    let title = document.createElement("h3")
    let benefit1 = document.createElement("p")
    let benefit2 = document.createElement("p")
    let benefit3 = document.createElement("p")

    if (membership === "np") {
        title.textContent = "NP Membership — Free";
        benefit1.textContent = "Chamber networking opportunities";
        benefit2.textContent = "Access to selected Chamber events and training";
        benefit3.textContent = "Business/community listing on the Chamber website";

    } else if (membership === "bronze") {
        title.textContent = "Bronze Membership — $20";
        benefit1.textContent = "All NP Membership benefits";
        benefit2.textContent = "Member discounts on Chamber events and training";
        benefit3.textContent = "Business promotion through Chamber communications";

    } else if (membership === "silver") {
        title.textContent = "Silver Membership — $30";
        benefit1.textContent = "All Bronze Membership benefits";
        benefit2.textContent = "Priority advertising opportunities, including website promotion";
        benefit3.textContent = "Additional visibility at Chamber events and activities";

    } else if (membership === "gold") {
        title.textContent = "Gold Membership — $40";
        benefit1.textContent = "All Silver Membership benefits";
        benefit2.textContent = "Premium spotlight position on the Chamber homepage";
        benefit3.textContent = "Exclusive access to selected special events and promotional opportunities";
    }

    card.append(
        title,
        benefit1,
        benefit2,
        benefit3
    )
    modal.appendChild(card)
}

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.close()
    }
})

btnClosemodal.addEventListener("click", () => {
    modal.close()
})

