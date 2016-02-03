var firstNum = document.getElementById("firstNum");
var secondNum = document.getElementById("secondNum");

var buttonAdd = document.getElementById("add");
var buttonSub = document.getElementById("subtract");
var buttonMul = document.getElementById("multiply");
var buttonDiv = document.getElementById("divide");

var outputField = document.getElementById("outputField");

firstNum.focus();

buttonAdd.addEventListener("click",function(e){
  e.preventDefault();
  outputField.innerHTML += parseInt(firstNum.value) + parseInt(secondNum.value);
  outputField.innerHTML += "<br>";
});

buttonSub.addEventListener("click",function(e){
  e.preventDefault();
  outputField.innerHTML += parseInt(firstNum.value) - parseInt(secondNum.value);
  outputField.innerHTML += "<br>";
});

buttonMul.addEventListener("click",function(e){
  e.preventDefault();
  outputField.innerHTML += parseInt(firstNum.value) * parseInt(secondNum.value);
  outputField.innerHTML += "<br>";
});

buttonDiv.addEventListener("click",function(e){
  e.preventDefault();
  outputField.innerHTML += parseInt(firstNum.value) / parseInt(secondNum.value);
  outputField.innerHTML += "<br>";
});