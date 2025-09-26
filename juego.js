let puntos = 0;
const marcador = document.getElementById("puntos");
const zonaInicial = document.getElementById("zona-inicial");
const cubos = document.querySelectorAll(".cubo");
const reiniciarBtn = document.getElementById("reiniciar");


function attachDragHandlers(obj) {
  if (!obj) return;
  obj.addEventListener("dragstart", e => {
    e.dataTransfer.setData("tipo", obj.dataset.tipo || "");
    e.dataTransfer.setData("html", obj.outerHTML);
    obj.classList.add("arrastrando");
  });
  obj.addEventListener("dragend", e => {
    obj.classList.remove("arrastrando");
  }); 
}


const objetosIniciales = document.querySelectorAll(".objeto");
objetosIniciales.forEach(attachDragHandlers);


cubos.forEach(cubo => {
  cubo.addEventListener("dragover", e => e.preventDefault());

  cubo.addEventListener("drop", e => {
    e.preventDefault();
    const tipo = e.dataTransfer.getData("tipo");
    const objeto = document.querySelector(".arrastrando");

    if (!marcador || !zonaInicial) {
      console.error('Elementos necesarios no encontrados en el DOM.');
      return;
    }

    if (tipo === cubo.dataset.tipo) {
      puntos += 10;
      marcador.textContent = "Puntos: " + puntos;
      cubo.classList.add("correcto");
      setTimeout(() => cubo.classList.remove("correcto"), 800);
      if (objeto && objeto.remove) objeto.remove(); 
    } else {
      cubo.classList.add("incorrecto");
      setTimeout(() => cubo.classList.remove("incorrecto"), 800);
    }
  });
});



