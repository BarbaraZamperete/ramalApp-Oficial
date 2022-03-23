const consultar = document.getElementById("consultar-button");
const ramal = document.getElementById("ramal-button");

consultar.addEventListener("mouseover", () => {
  const myDropConsultar = document.getElementById("consultar-pop-up");
  myDropConsultar.classList.remove("hide");
});
consultar.addEventListener("mouseleave", () => {
  const myDropConsultar = document.getElementById("consultar-pop-up");
  myDropConsultar.classList.add("hide");
});
ramal.addEventListener("mouseover", () => {
  const myDropRamal = document.getElementById("ramal-pop-up");
  myDropRamal.classList.remove("hide");
});
ramal.addEventListener("mouseleave", () => {
  const myDropRamal = document.getElementById("ramal-pop-up");
  myDropRamal.classList.add("hide");
});
