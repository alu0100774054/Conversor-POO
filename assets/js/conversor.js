(function(exports) {
  "use strict";

  function Medida(valor,tipo)
  {
    this.valor = valor;
    this.tipo = tipo || "";
  }
  function Medida(valor,tipo) {
    this.type = tipo;
    this.value = valor;
  }

  function Temperatura(valor,tipo)
  {
    Medida.call(this, valor, tipo);
    //  this.tipo = tipo;
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
  }

Temperatura.prototype = new Medida();
Temperatura.prototype.constructor = Temperatura;


  function Celsius(valor)
  {
    Temperatura.call(this, valor)
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
  Temperatura.call(this, valor, "k");
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

  function Temperatura(valor,tipo) {
    Medida.call(this, valor, tipo);
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
  }
  // Hacemos que Temperatura Herede de Medida
  Temperatura.prototype = new Medida();
  Temperatura.prototype.constructor = Temperatura;

  function Celsius(valor) {
    Temperatura.call(this, valor, "c");
    //funcion Celsius to Farenheit
    this.toFarenheit = function(){
      return ((valor * 9/5)+32);
    };
    //funcion Celsius to Kelvin
    this.toKelvin = function(){
      return (valor + 273.15);
    };
  }
  Celsius.prototype = new Temperatura();
  Celsius.prototype.constructor = Celsius;

  function Farenheit(valor) {
    Temperatura.call(this, valor, "f");
    // funcion Farenheit to Celsius
    this.toCelsius = function(){
      return (valor - 32)*5/9;
    };
    // funcion Farenheit to Kelvin
    this.toKelvin = function(){
      var aux = (5*(valor - 32))/9
      return (aux + 273.15);
    };
  }
  Farenheit.prototype = new Temperatura();
  Farenheit.prototype.constructor = Farenheit;

  function Kelvin(valor) {
    Temperatura.call(this, valor, "k");
    // funcion Kelvin to Celsius
    this.toCelsius = function(){
      return (valor - 273.15);
    };
    // funcion Kelvin to Farenheit
    this.toFarenheit = function(){
      var aux = (9*(valor - 273.15))/5
      return (aux + 32);
    };
  }
  Kelvin.prototype = new Temperatura();
  Kelvin.prototype.constructor = Kelvin;

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;
  exports.Kelvin = Kelvin;

  exports.convertir = function(){
    var valor     = document.getElementById('convert').value,
        elemento  = document.getElementById('converted'),
        /* Extienda la RegeExp a la especificación. use una XRegExp */
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i;
        valor     = valor.match(regexp);

    if (valor) {
      var numero = valor[1],
          tipo   = valor[2].toLowerCase();
        regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([fkc])\s*(?:to)?\s*([fkc])$/i,

      /*  expresion = XRegExp('^\s*(<num> ([-+])?\d+(?:\.\d+)?(?:e[+-]?\d+)?) # numero \n' +
                           '\s*(<temp1> ([fkc]))\s* # temperatura1 \n' +
                          '(?:to)?\s* # to \n' +
                          '(<temp2> ([fkc]))$ # temperatura2', 'i');*/

    /*   date = XRegExp('(?<year>  [0-9]{4} ) -?  # year  \n' +
               '(?<month> [0-9]{2} ) -?  # month \n' +
               '(?<day>   [0-9]{2} )     # day     ', 'x');
    */
        valor     = valor.match(regexp);
      //  var match = XRegExp.exec(valor, expresion);

   if (valor) {
   //if (match) {
      var numero = valor[1],
          tipo   = valor[2].toLowerCase(),
          tipo2  = valor[3].toLowerCase();
  /*    var numero = match.numero,
          tipo = match.temp1,
          tipo2 = match.temp2;*/
      numero = parseFloat(numero);
      console.log("Valor: " + numero + ", Tipo: " + tipo);

      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);

          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          elemento.innerHTML = celsius.toKelvin().toFixed(2) + " kelvins";

          if (tipo2 == 'f')
          elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit.";
          if (tipo2 == 'k')
          elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin.";


          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          if (tipo2 == 'c')
          elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";

          elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvins";
          break;
        case 'k':
          var kelvin = new Kelvin(numero);
          elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
          elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + " Farenheit";
          break;

        default:
          elemento.innerHTML = "ERROR! Intenta algo como '23.2C' ";
          /* rellene este código */


          if (tipo2 == 'k')
          elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
          break;
        case 'k':
          var kelvin = new Kelvin(numero);
          if (tipo2 == 'c')
          elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
          if (tipo2 == 'f')
          elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + " Farenheit";
          break;

        default:
          elemento.innerHTML = "ERROR! Intenta algo como '-4.2C' ";
           /* rellene este código */

      }
    }
    else
      elemento.innerHTML = "";
  }
})(this);
