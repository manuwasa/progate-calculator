const numbers = document.querySelectorAll(".number");
const screen = document.querySelector("input");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");
const percentage = document.querySelector(".percentage");
const history = document.querySelector(".history");
const clrHistory = document.querySelector(".clear-history");
let current = "";
let prev = "";
let operation = "";
let res = "";

decimal.addEventListener("click", function (e) {
  if (current === "") {
    alert("Masukan angka terlebih dahulu");
  } else {
    current += e.target.value;
    updateScreen(current);
  }
});

percentage.addEventListener("click", function (e) {
  if (current === "") {
    alert("Masukan angka terlebih dahulu");
  } else {
    current = Number(current) / 100;
    updateScreen(current);
  }
});

numbers.forEach((number) => {
  number.addEventListener("click", function (e) {
    inputNumber(e.target.value);
  });
});

operators.forEach((operator) => {
  operator.addEventListener("click", function (e) {
    operation = e.target.value;
    inputOperation(operation);
  });
});

equal.addEventListener("click", function (e) {
  if (current === "") {
    alert("Masukan angka terlebih dahulu");
  } else {
    switch (operation) {
      case "+":
        res = Number(prev) + Number(current);
        break;
      case "-":
        res = Number(prev) - Number(current);
        break;
      case "*":
        res = Number(prev) * Number(current);
        break;
      default:
        res = Number(prev) / Number(current);
        break;
    }
    updateScreen(res);
    handleHistory(current, operation, prev, res);
    current = res;
  }
});

clear.addEventListener("click", function (e) {
  handleClear();
});

clrHistory.addEventListener("click", function (e) {
  clearHistory();
});

const updateScreen = (number) => {
  screen.value = number;
};

const inputNumber = (number) => {
  if (number === 0) {
    current = number;
  } else {
    current += number;
  }

  // if (operation === "-" && current > 0 && prev === "") {
  //   current = Number(number) * -1;
  // }

  updateScreen(current);
};

const inputOperation = (operator) => {
  // && operator !== "-"
  if (current === "") {
    alert("Masukan angka terlebih dahulu");
  } else {
    updateScreen(operator);
    prev = current;
    current = "";
  }
};

const handleClear = () => {
  current = "";
  prev = "";
  operation = "";
  updateScreen(current);
};

const handleHistory = (current, operation, prev, res) => {
  let hist = document.createElement("p");
  let ops;
  if (operation === "*") {
    ops = "x";
  } else if (operation === "/") {
    ops = "&divide";
  } else {
    ops = operation;
  }
  hist.innerHTML = `${prev} ${ops} ${current} = ${res}`;
  history.appendChild(hist);
};

const clearHistory = () => {
  history.innerHTML = "";
};
