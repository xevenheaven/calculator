let result = null;
let operand = "";
let operation = "";

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
    if (event.target.className.match(/clear/)) {
      reset();
      updateDom(0);
    } else if (event.target.className.match(/op/)) {
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
    } else {
      if (operand.length < 12) {
        operand += event.target.textContent;
      }
      updateDom(operand);
    }
  });
});
