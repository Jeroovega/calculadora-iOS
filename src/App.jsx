import { useState } from "react";

function App() {

  const [valor, setValor] = useState("");
  const [operacion, setOperacion] = useState(null);
  const [valorAnterior, setValorAnterior] = useState("");
  const [contador, setContador] = useState(0);
  const [esNegativo, setEsNegativo] = useState(false);
  const [esFlotante, setEsFlotante] = useState(false);

  function ponerNumero(numero) {
    if (numero === "-") {
      if (esNegativo || valor === "") {
        setValor("-" + valor);
      } else {
        setValor(valor.slice(1));
      }
      setEsNegativo(!esNegativo);
      return;
    }
    if (esNegativo) {
      setValor("-" + numero);
      setEsNegativo(false);
    } else {
      setValor(valor + numero);
    }

    if (esFlotante) {
      setEsFlotante(false)
      return;
    }
  }

  const hacerFlotante = () => {
    setEsFlotante(true)
    setValor(valor + ".");
  }

  function borrar() {
    setValor("");
    setOperacion(null);
    setValorAnterior("");
    setEsNegativo(false);
    setEsFlotante(false);
  }

  const negativoPositivo = () => {
    setEsNegativo(!esNegativo);
  }

  function hacerOperacion() {
    const valorFloat = parseFloat(valor);
    const valorAnteriorFloat = parseFloat(valorAnterior);

    if (isNaN(valorFloat) || isNaN(valorAnteriorFloat)) {
      return;
    }

    switch (operacion) {
      case "+":
        setValor(valorAnteriorFloat + valorFloat);
        if (valor % 1 == 0) {
          return
        } else {
          setValor((valorAnteriorFloat + valorFloat).toPrecision(7))
        };
        break;
      case "-":
        setValor(valorAnteriorFloat - valorFloat);
        if (valor % 1 == 0) {
          return 
        } else {
          setValor((valorAnteriorFloat - valorFloat).toPrecision(7))
        };
        break;
      case "*":
        setValor(valorAnteriorFloat * valorFloat);
        if (valor % 1 == 0) {
          return 
        } else {
          setValor((valorAnteriorFloat * valorFloat).toPrecision(7))
        };
        break;
      case "/":
        setValor(valorAnteriorFloat / valorFloat);
        if (valor % 1 == 0) {
          return 
        } else {
          setValor((valorAnteriorFloat / valorFloat).toPrecision(7))
        };
        break;
      case "%":
        setValor((valorAnterior * valorFloat) / 100);
        if (valor % 1 == 0) {
          return 
        } else {
          setValor(((valorAnterior * valorFloat) / 100).toPrecision(7));
        };
        break;
      default:
        return;
    }

    setOperacion(null);
    setValorAnterior("");
    setEsNegativo(false);
  }

  function seleccionarOperacion(op) {
    if (valor === "") {
      return;
    }


    if (operacion !== null) {
      hacerOperacion();
    }

    setOperacion(op);
    setValorAnterior(valor);
    setValor("");
    setEsNegativo(false);
  }


  return (
    <div className="bg-[#000000e6]">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-[#000000b3] p-2 pl-3 rounded-2xl">
          <div
            className="text-white  pb-2 pt-5 flex justify-end pr-6 text-3xl w-72 overflow-hidden font-semibold">{valor !== "" ? valor : valorAnterior}
          </div>
          <div className="grid grid-cols-4 place-items-center mt-4  h-96  w-72 px-1">
            <div>
              <button
                onClick={borrar}
                className="bg-[#b9b8b8] rounded-full py-2 text-2xl font-semibold w-16 flex justify-center hover:bg-[#ffffff] transition-all duration-400">
                {valor.length > 0 ? "C" : "AC"}

              </button>
            </div>
            <div>
              <button
                onClick={() => negativoPositivo()}
                className="bg-[#b9b8b8] rounded-full py-2  text-2xl font-semibold w-16 flex justify-center hover:bg-[#ffffff] transition-all duration-400">+/-</button>
            </div>
            <div>
              <button
                onClick={() => seleccionarOperacion("%")}
                className="bg-[#b9b8b8] rounded-full py-2 text-2xl font-semibold w-16 flex justify-center hover:bg-[#ffffff] transition-all duration-400">%</button>
            </div>
            <div>
              <button
                onClick={() => seleccionarOperacion("/")}
                className="bg-[#e4972a] text-white rounded-full py-2 text-xl font-semibold w-16 flex justify-center hover:bg-[#ffffff] hover:text-[#e4972a] transition-all duration-400">÷</button>
            </div>

            <div>
              <button className="bg-[#151515] rounded-full text-white py-4 text-2xl h-16  w-16 flex justify-center hover:bg-[#484848] transition-all duration-300"
                onClick={() => { ponerNumero(7); agruparNumeros() }}>7</button>
            </div>
            <div>
              <button
                onClick={() => ponerNumero(8)}
                className="bg-[#151515] rounded-full text-white py-4 text-2xl h-16   w-16 flex justify-center hover:bg-[#484848] transition-all duration-300">8</button>
            </div>
            <div>
              <button
                onClick={() => ponerNumero(9)}
                className="bg-[#151515] rounded-full text-white py-4 text-2xl h-16  w-16 flex justify-center hover:bg-[#484848] transition-all  duration-300">9</button>
            </div>
            <div>
              <button
                onClick={() => seleccionarOperacion("*")}
                className="bg-[#e4972a] text-white rounded-full  text-xl h-16 font-semibold  w-16 items-center flex justify-center hover:bg-[#ffffff] hover:text-[#e4972a] transition-all duration-400">X</button>
            </div>

            <div>
              <button
                onClick={() => ponerNumero(4)}
                className="bg-[#151515] rounded-full text-white py-4 text-2xl h-16   w-16 flex justify-center hover:bg-[#484848] transition-all duration-300">4</button>
            </div>
            <div>
              <button
                onClick={() => ponerNumero(5)}
                className="bg-[#151515] rounded-full text-white py-4 text-2xl h-16 items-center  w-16 flex justify-center hover:bg-[#484848] transition-all duration-300">5</button>
            </div>
            <div>
              <button
                onClick={() => ponerNumero(6)}
                className="bg-[#151515] rounded-full text-white py-4 text-2xl  w-16 flex justify-center hover:bg-[#484848] transition-all duration-300">6</button>
            </div>
            <div>
              <button
                onClick={() => seleccionarOperacion("-")}
                className="bg-[#e4972a] text-white rounded-full h-16 text-4xl font-semibold  w-16 flex items-center justify-center hover:bg-[#ffffff] hover:text-[#e4972a] transition-all duration-400">-</button>
            </div>

            <div>
              <button
                onClick={() => ponerNumero(1)}
                className="bg-[#151515] rounded-full text-white py-4 text-2xl   w-16 flex justify-center hover:bg-[#484848] transition-all duration-300">1</button>
            </div>
            <div>
              <button
                onClick={() => ponerNumero(2)}
                className="bg-[#151515] rounded-full text-white py-4 text-2xl   w-16 flex justify-center hover:bg-[#484848] transition-all duration-300">2</button>
            </div>
            <div>
              <button
                onClick={() => ponerNumero(3)}
                className="bg-[#151515] rounded-full text-white py-4 text-2xl  w-16 flex justify-center hover:bg-[#484848] transition-all duration-300">3</button>
            </div>
            <div>
              <button
                onClick={() => seleccionarOperacion("+")}
                className="bg-[#e4972a] text-white rounded-full py-4 text-2xl font-semibold  w-16 flex justify-center hover:bg-[#ffffff] hover:text-[#e4972a] transition-all duration-400">+</button>
            </div>

            <div className="col-span-2">
              <button
                onClick={() => ponerNumero(0)}
                className="bg-[#151515] rounded-full text-white py-4 text-2xl   w-32 flex justify-start px-5 hover:bg-[#484848] transition-all duration-300">0</button>
            </div>
            <div>
              <button
                onClick={() => hacerFlotante()}
                className="bg-[#151515] rounded-full text-white py-4 text-2xl   w-16 flex justify-center hover:bg-[#484848] transition-all duration-300">.</button>
            </div>
            <div>
              <button
                onClick={() => hacerOperacion()}
                className="bg-[#e4972a] text-white rounded-full py-4 text-2xl font-semibold  w-16 flex justify-center hover:bg-[#ffffff] hover:text-[#e4972a] transition-all duration-400">=</button>
            </div>

          </div>
          <div>

          </div>
          <div>
          </div>
        </div>
        <div className="flex pt-4">
          <h3 className="text-white">by<span className="text-[orange] font-semibold"> jerovega</span></h3>
        </div>
      </div>
    </div>
  )
}

export default App
