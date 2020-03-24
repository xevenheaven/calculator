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

      if (result === null) {
        result = parseInt(operand);
      } else if (operand) {
        operate(parseInt(operand));
      }
      operation = newOp;
      operand = "";
      updateDom(result);
    } else {
      operand += event.target.textContent;
      updateDom(operand);
    }
  });
});
