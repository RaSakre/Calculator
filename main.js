import "./style.css";

const cursor = document.querySelector(".cursor"); // #1

    const mouseMove = function (e) { 
    let x = e.clientX;
    let y = e.clientY;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
};

    document.addEventListener("mousemove", mouseMove); // #3 

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const signs = ["+", "-", "x", "/"];
let leftNum = "";
let rightNum = "";
let sign = "";
let result = 0;
const calcValue = document.querySelector(".calculator-value p");
const buttons = document.querySelectorAll(".button");

const resetFn = () => {
  leftNum = "";
  rightNum = "";
  sign = "";
  result = 0;
  calcValue.textContent = 0;
};

const clearExpectResult = () => {
  leftNum = "";
  rightNum = "";
  sign = "";
};

buttons.forEach(function (button) {
  button.addEventListener("click", function (evt) {
    const key = evt.target.textContent;
    if (calcValue.textContent === "0") {
      calcValue.textContent = "";
    }
    if (numbers.includes(key)) {
      if (result !== 0) {
        clearExpectResult();
        leftNum = key; 
        calcValue.textContent = leftNum; 
        result = 0;
      } else if (sign === "") {
        leftNum += key;
        calcValue.textContent = leftNum;
      } else {
        rightNum += key;
        calcValue.textContent = rightNum;
      }
    }
    if (signs.includes(key)) {
      sign = key;
      calcValue.textContent = sign;
    }
    if (result) {
      leftNum = result;
    }
    if (key === ",") {
      if (sign === "") {
        leftNum += ".";
        calcValue.textContent = leftNum;
      } else {
        rightNum += ".";
        calcValue.textContent = rightNum;
      }
    }
    if (key === "%") {
      leftNum = leftNum / 100;
      calcValue.textContent = leftNum;
    }
    if (key === "=") {
      let num1 = parseFloat(leftNum);
      let num2 = parseFloat(rightNum);

      switch (sign) {
        case "+":
          result = num1 + num2;
          break;
        case "-":
          result = num1 - num2;
          break;
        case "x":
          result = num1 * num2;
          break;
        case "/":
          result = num1 / num2;
          break;
      }
      calcValue.textContent = result;
      clearExpectResult();
    }
    if (key === "AC") {
      resetFn();
    }
  });
});
