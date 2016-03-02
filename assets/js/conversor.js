(function(exports) {
  "use strict";

  function Medida(valor,tipo)
  {
    this.valor = valor;
    this.tipo = tipo || "";
    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    /* ademas de new Medida(45.2, "Km") */
  }

  function Temperatura(valor,tipo)
  {
    Media.call(this, valor, tipo);
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
  }

  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;

  function Celsius(valor)
  {
    Temperatura.call(this, valor);
  }

  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;

  Celsius.prototype.toFarenheit = function () {
    var result = (this.valor * 9/5)+32;
    return result;
  }

Celsius.prototype.toKelvin = function () {
    var result = this.valor + 273.15;
    return result;
}

  function Farenheit(valor)
  {
    Temperatura.call(this, valor);
  }

  Farenheit.prototype = new Temperatura();
  Farenheit.prototype.constructor = Farenheit;

  Farenheit.prototype.toCelsius = function () {
    var result = (this.valor - 32) * 5/9;
    return result;
  }

  Farenheit.prototype.toKelvin = function () {
    var result = ((this.valor - 32) / (9/5)) + 273.15;
    return result;
  }

  function Kelvin(valor)
  {
    Temperatura.call(this, valor);
  }

  Kelvin.prototype = new Temperatura();
  Kelvin.prototype.constructor = Kelvin;

  Kelvin.prototype.toCelsius = function () {
    var result = this.valor - 273.15;
    return result;
  }

  Kelvin.prototype.toFarenheit = function () {
    var result = ((this.valor - 273.15) * 9/5) + 32;
    return result;
  }

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i;
        valor     = valor.match(regexp);

    if (valor) {
      var numero = valor[1],
          tipo   = valor[2].toLowerCase();

      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          break;

        default:
          elemento.innerHTML = "ERROR! Intenta algo como '23.2C' ";
          /* rellene este código */
      }
    }
    else
      elemento.innerHTML = "";
  }
})(this);
