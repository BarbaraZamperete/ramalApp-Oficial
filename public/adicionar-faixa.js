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

// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################
// ####################################################################


const inicioF = document.querySelector("#inicio-f");
const inicioV = document.getElementById("inicio-v");
const fimF = document.getElementById("fim-f");
const fimV = document.getElementById("fim-v");
const ramaisBoxF = document.getElementById("ramais-add-f");
const ramaisBoxV = document.getElementById("ramais-add-v");

inicioF.addEventListener("focusout", (e) => {
  if (!fimF.value && inicioF.value ) {
    ramaisBoxF.innerHTML = `
            <div class="ramal-list ocupado-fisico">
                <h4>${e.target.value}</h4>
            </div>`;
  }
  else if (!fimF.value && !inicioF.value){
    ramaisBoxF.innerHTML = `<div></div>`
  }
});
fimF.addEventListener("focusout", (e) => {
  if ((inicioF.value == e.target.value) || (inicioF.value && !fimF.value))  {
    ramaisBoxF.innerHTML = `
            <div class="ramal-list ocupado-fisico">
                <h4>${inicioF.value}</h4>
            </div>`;;
  }else if (inicioF.value) {
    let ramais = parseInt(`${inicioF.value}`) + 1;
    let fim = parseInt(`${e.target.value}`);
    while (ramais <= fim) {
      ramaisBoxF.innerHTML += `
            <div class="ramal-list ocupado-fisico">
                <h4>${ramais}</h4>
            </div>`;
      ramais++;
    }
  }  
});

// ####################################################################
// ####################################################################
// ####################################################################


inicioV.addEventListener("focusout", (e) => {
  if (!fimV.value && inicioV.value) {
    ramaisBoxV.innerHTML = `
            <div class="ramal-list ocupado-virtual">
                <h4>${e.target.value}</h4>
            </div>`;
  } else if (!fimV.value && !inicioV.value){
    ramaisBoxV.innerHTML = `<div></div>`
  }
});
fimV.addEventListener("focusout", (e) => {
  if (inicioV.value == e.target.value)  {
    ramaisBoxV.innerHTML = `
            <div class="ramal-list ocupado-virtual">
                <h4>${e.target.value}</h4>
            </div>`;;
  }else if (inicioV.value) {
    let ramais = parseInt(`${inicioV.value}`) + 1;
    let fim = parseInt(`${e.target.value}`);
    while (ramais <= fim) {
      ramaisBoxV.innerHTML += `
            <div class="ramal-list ocupado-virtual">
                <h4>${ramais}</h4>
            </div>`;
      ramais++;
    }
  }  
});
