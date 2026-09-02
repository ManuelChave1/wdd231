let currentyear = document.querySelector("#currentYear")
let lastModified = document.querySelector("#lastModified");
let date = new Date();
currentyear.textContent = `© ${date.getFullYear()} * Manuel Chave * Maputo-Mozambique`;
lastModified.textContent = `LastModified ${date.toLocaleString("pt-BR")}`;