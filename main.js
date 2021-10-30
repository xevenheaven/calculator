let result = null;
let operand = "";
let operation = "";

const hasClassName = (element, regex) => {
  return element.className.match(regex);
};

const updateDom = (res) => {
  document.getElementsByClassName("result")[0].textContent = res;
};

const operate = (res) => {
  switch (operation) {
    case "+":
      result += res;
      break;
    case "-":
      result -= res;
      break;
    case "×":
      result = result * res;
      break;
    case "÷":
      result = result / res;
      break;
    default:
      break;
  }
  result = Math.round(result * Math.pow(10, 5)) / Math.pow(10, 5);
};

const reset = () => {
  result = null;
  operand = "";
  operation = "";
};

document.addEventListener("DOMContentLoaded", (event) => {
  updateDom(0);
});

const PI = "3.141592653";
Array.from(document.getElementsByClassName("key")).forEach((el) => {
  el.addEventListener("click", (event) => {
    if (hasClassName(event.target, /clear/)) {
      reset();
      updateDom(0);
    } else if (
      hasClassName(event.target, /sign/) ||
      hasClassName(event.target.parentElement, /sign/)
    ) {
      if (operand) {
        operand = operand.startsWith("-")
          ? operand.replace(/^-/, "")
          : `-${operand}`;
        updateDom(operand);
      } else {
        result = result * -1;
        updateDom(result);
      }
    } else if (hasClassName(event.target, /op/)) {
      newOp = event.target.textContent;

      if (result === null && operand) {
        result = parseFloat(operand);
      } else if (operand) {
        operate(parseFloat(operand));
      }
      operation = newOp;
      if (operation === "x2") {
        result = result * result;
      } else if (operation === "√") {
        result = Math.sqrt(result);
      }
      operand = "";
      if (result !== null) {
        updateDom(result);
      }
      if (result === 0) {
        reset();
      }
    } else {
      if (operand.length < 12) {
        if (event.target.textContent === "π" || operand === "π") {
          operand = PI;
        } else {
          if (operand === PI) {
            operand = event.target.textContent;
          } else {
            operand += event.target.textContent;
          }
        }
      }

      if (operation === "=") {
        result = null;
      }
      updateDom(operand);
    }
  });
});
