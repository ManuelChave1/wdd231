const getInfoUrl = window.location.search

let myInfor = new URLSearchParams(getInfoUrl);
document.querySelector("#results").innerHTML = `
<p>Name: ${myInfor.get("first")} ${myInfor.get("last")}</p>
<p>Phone: ${myInfor.get("phone")}</p>
<p>Email: ${myInfor.get("email")}</p>
<p>Ordenance: ${myInfor.get("ordinance")}</p>
<p>Location: ${myInfor.get("location")}</p>

`