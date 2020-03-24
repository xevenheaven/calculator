let result = null;
let operand = "";
let operation = "";

const hasClassName = (element, regex) => {
  return element.className.match(regex);
};

const updateDom = res => {
  document.getElementsByClassName("result")[0].textContent = res;
};

const operate = res => {
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

document.addEventListener("DOMContentLoaded", event => {
  updateDom(0);
});

Array.from(document.getElementsByClassName("key")).forEach(el => {
  el.addEventListener("click", event => {
    if (hasClassName(event.target, /clear/)) {
      reset();
      updateDom(0);
    } else if (hasClassName(event.target, /sign/) || hasClassName(event.target.parentElement, /sign/)) {
      if (operand) {
        operand = operand.startsWith("-") ? operand.replace(/^-/, "") : `-${operand}`;
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
      operand = "";
      if (result !== null) {
        updateDom(result);
      }
      if (result === 0) {
        reset();
      }
    } else {
      if (operand.length < 12) {
        operand += event.target.textContent;
      }
      if (operation === "=") {
        result = null;
      }
      updateDom(operand);
    }
  });
});
