var encriptarBtn = document.querySelector(".encriptarButton");
var desencriptarBtn = document.querySelector(".desencriptarButton");
var mensajeContainer = document.querySelector(".mensajeContainer");
var errorContainer = document.querySelector(".errorContainer");
var copiarBtn = document.querySelector(".copiar");
var copiarP = document.querySelector(".copiarMsj");
var variable = document.querySelectorAll(".variable");

var habilitado = true;

addEventListener("load", function() {
  var viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
})


const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function MayusculayAcento(letra) {
   salida = false;
  var letras = "ABCDEFGHYJKLMNÑOPQRSTUBWXYZ";
  sinAcentos = removeAccents(letra);
  if (sinAcentos !== letra) {
    salida = true;
  }
  else {
    for (i = 0; i < letra.length; i++) {
      if (letras.indexOf(letra.charAt(i), 0) != -1) {
        salida = true;
      }
    }
  }
  return salida;

}

function hover(e) {
  e.target.setAttribute('src','variable');
}

function unhover(e) {
  e.target.setAttribute('src', 'variable');
}

function lectura() {
  habilitado = false;
  variable.forEach((index) => {
    setTimeout(() => { variable.setAttribute('src','variable'); }, 500 * index);
  })
}

function escritura() {
  habilitado = true;
  variable.forEach((circulo, index) => {
    variable.setAttribute('src');
  })
}

function encriptar() {
  if (habilitado) {
    var textArea = document.querySelector(".textInput");
    var texto = textArea.value;

    if (MayusculayAcento(texto)) {
      Swal.fire({
        icon: 'error',
        title: 'Solo minusculas y sin acentos...',
        text: 'Ingrese solo letras minusculas y sin acentos!',
      })
      textArea.value = "";
    }
    else {
      texto = texto.replaceAll("e", "enter");
      texto = texto.replaceAll("i", "imes");
      texto = texto.replaceAll("a", "ai");
      texto = texto.replaceAll("o", "ober");
      texto = texto.replaceAll("u", "ufat");
      var mensajeArea = document.querySelector(".mensaje");
      lectura();
      textArea.value = "ENCRIPTANDO";
      setTimeout(() => {
        mensajeContainer.classList.remove("hidden");
        errorContainer.classList.add("hidden");
        mensajeArea.textContent = texto
        textArea.value = "";
        escritura();
      }, 500 * variable.length);
    }
  }

}

function desencriptar() {
  if (habilitado) {
    var textArea = document.querySelector(".textInput");
    var texto = textArea.value;
    var mensaje = "";
    if (MayusculayAcento(texto)) {
      Swal.fire({
        icon: 'error',
        title: 'Solo minusculas y sin acentos...',
        text: 'Ingrese solo letras minusculas y sin acentos!',
      })
      textArea.value = "";
    }
    else {
      texto = textArea.value;
      for (let i = 0; i < texto.length; i++) {
        switch (texto[i]) {
          case 'a':
            mensaje = mensaje + 'a';
            i = i + 1;
            break;
          case 'e':
            mensaje = mensaje + 'e';
            i = i + 4;
            break;
          case 'i':
            mensaje = mensaje + 'i';
            i = i + 3;
            break;
          case 'o':
            mensaje = mensaje + 'o';
            i = i + 3;
            break;
          case 'u':
            mensaje = mensaje + 'u';
            i = i + 3;
            break;

          default:
            mensaje = mensaje + texto[i];
            break;
        }
      }

      lectura();
      textArea.value = "DESENCRIPTANDO";
      setTimeout(() => {
        escritura();
        if (!texto.includes("enter") && !texto.includes("imes") && !texto.includes("ai") && !texto.includes("ober") && !texto.includes("ufat")) {
          mensajeContainer.classList.add("hidden");
          errorContainer.classList.remove("hidden");
        }
        else {
          mensajeContainer.classList.remove("hidden");
          errorContainer.classList.add("hidden");
          var mensajeTexto = document.querySelector(".mensaje");
          mensajeTexto.textContent = mensaje;
        }

        textArea.value = "";

      }, 500 * variable.length);
    }
  }
}

function copiar() {
  var codigoACopiar = document.getElementById('textoACopiar');
  var seleccion = document.createRange();
  seleccion.selectNodeContents(codigoACopiar);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(seleccion);
  var res = document.execCommand('copy');
  window.getSelection().removeRange(seleccion);

  copiarP.textContent = "COPIADO"
  setTimeout(() => { copiarP.textContent = "COPIAR"; }, 3000);

}


encriptarBtn.addEventListener("mouseover", hover);
encriptarBtn.addEventListener("mouseout", unhover);
encriptarBtn.addEventListener("click", encriptar)

desencriptarBtn.addEventListener("mouseover", hover);
desencriptarBtn.addEventListener("mouseout", unhover);
desencriptarBtn.addEventListener("click", desencriptar)

copiarBtn.addEventListener("click", copiar);