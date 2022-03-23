const fisico = document.getElementById("fisico");
const virtual = document.getElementById("virtual");
const fisicoC = document.getElementById("fisico-container");
const virtualC = document.getElementById("virtual-container");
const tipo = document.querySelector(".tipos");
tipo.addEventListener("click", (n) => {
  if (n.target.id == "fisico") {
    fisico.classList.add("tipo-ativo");
    fisicoC.classList.add("ramal-form-ativo");
    virtual.classList.remove("tipo-ativo");
    virtualC.classList.remove("ramal-form-ativo");
  } else if (n.target.id == "virtual") {
    virtual.classList.add("tipo-ativo");
    virtualC.classList.add("ramal-form-ativo");
    fisico.classList.remove("tipo-ativo");
    fisicoC.classList.remove("ramal-form-ativo");
  }
});

const modelo = document.getElementById("modelo");
modelo.addEventListener("change", (n) => {
    const rack = document.getElementById("rack")
    if(n.target.value == "ip"){
        rack.classList.add("hide")
    }else{
        rack.classList.remove("hide")
    }
})

