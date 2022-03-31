const servidores = document.getElementById("servidores-button");
const setores = document.getElementById("setores-button");
const ramal = document.getElementById("ramal-button");

servidores.addEventListener("mouseover", () => {
  const myDropServidores = document.getElementById("servidores-pop-up");
  myDropServidores.classList.remove("hide");
});
servidores.addEventListener("mouseleave", () => {
  const myDropServidores = document.getElementById("servidores-pop-up");
  myDropServidores.classList.add("hide");
});
setores.addEventListener("mouseover", () => {
  const myDropSetores = document.getElementById("setores-pop-up");
  myDropSetores.classList.remove("hide");
});
setores.addEventListener("mouseleave", () => {
  const myDropSetores = document.getElementById("setores-pop-up");
  myDropSetores.classList.add("hide");
});
ramal.addEventListener("mouseover", () => {
  const myDropRamal = document.getElementById("ramal-pop-up");
  myDropRamal.classList.remove("hide");
});
ramal.addEventListener("mouseleave", () => {
  const myDropRamal = document.getElementById("ramal-pop-up");
  myDropRamal.classList.add("hide");
});
