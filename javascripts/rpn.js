var win = document.getElementById("calcwin");

var buttonAdd = document.getElementById("add");
var buttonSub = document.getElementById("subtract");
var buttonMul = document.getElementById("multiply");
var buttonDiv = document.getElementById("divide");
var buttonClr = document.getElementById("clear");

var rpnLine = [];   // array of lines in display
var dRows = 256;      // number of elements in rpnLine[], can be arbitrarily large
var decPlaces = 4;  // display this many places after decimal point
clearAll();

function clearAll() {
  for (i = 0; i < dRows; i++) {
    rpnLine[i] = "<br>";  // initialize this line
  }
  updateDisplay();
  nextEntryStartsNewLine = true;
}

document.querySelector("body").addEventListener("keyup",processKey);

buttonClr.addEventListener("click",function(e) {
  buttonClr.blur();
  clearAll;
});

buttonAdd.addEventListener("click",function(e){
  e.preventDefault();
  buttonAdd.blur();
  doMath("add");
});

buttonSub.addEventListener("click",function(e){
  e.preventDefault();
  buttonSub.blur();
  doMath("subtract");
});

buttonMul.addEventListener("click",function(e){
  e.preventDefault();
  buttonMul.blur();
  doMath("multiply");
});

buttonDiv.addEventListener("click",function(e){
  e.preventDefault();
  buttonDiv.blur();
  doMath("divide");
});

function doMath(operation) {
  // prevent operation if either of bottom 2 lines is blank
  if ( (rpnLine[0] == "<br>") || (rpnLine[1] == "<br>") ) {
    return;
  }
  var result;
  var operand2 = parseFloat(rpnLine[1]);  // 2nd row from bottom
  var operand1 = parseFloat(rpnLine[0]);  // bottom row
  switch(operation) {
    case "add":
      result = operand2 + operand1;
      break;
    case "subtract":
      result = operand2 - operand1;
      break;
    case "multiply":
      result = operand2 * operand1;
      break;
    case "divide":  // add code to catch div by 0
      result = operand2 / operand1;
      break;
    default:
      break;
  }
  rpnLine[0] = result.toFixed(decPlaces);  // put result in bottom line
  collapseDisplay();
  updateDisplay();
  nextEntryStartsNewLine = true;
}

function processKey(e) {  // process keyboard event
  e.preventDefault();
  var t = String.fromCharCode(e.keyCode);

  if (e.keyCode === 13)                // key is carriage return?
  {
    if (!parseFloat(rpnLine[0])) {  // if bottom line is blank,
      return;                               // CR does nothing
    }

    rpnLine[0] = parseFloat(rpnLine[0]).toFixed(decPlaces); // convert to decimal
    nextEntryStartsNewLine = true;
    updateDisplay();

    return;
  }
  else if ( (t.match(/[0-9]/))    ||  // key is digit 0-9?
            (e.keyCode === 46)    ||  // key is keypad "."?
            (e.keyCode === 190) )     // key is qwerty "."?
  {
    if (nextEntryStartsNewLine) {
      advanceDisplay(" ");
      nextEntryStartsNewLine = false;
    }

    if (e.keyCode == 190) {  // make ASCII 190 (qwerty ".") into ASCII 46 (keypad ".")
      t = ".";
    }

    rpnLine[0] += t;  // add digit or "." to bottom line of display
    updateDisplay();
    return;
  }
  else {     // key is not a number, period, or CR?
    return;  // do nothing
  }
}

function updateDisplay() {
  win.innerHTML = "";  // clear display area
  for (i = 3; i >= 0; i--) {
    console.log(`rpnLine(${i})=`,rpnLine[i]);
    win.innerHTML += "<p class='rpnLine'>" + rpnLine[i] + "</p>";
  }
}

function advanceDisplay(newLine) {
  for (var i = dRows - 1; i >= 1; i--) {  // shift all lines upwards
    rpnLine[i] = rpnLine[i - 1];
  }
  rpnLine[0] = newLine;
}

function collapseDisplay() {
  // rpnLine[1] goes away
  // rpnLine[2] becomes line 1
  for (var i = 1; i < dRows-1; i++) {
    rpnLine[i] = rpnLine[i+1];
  }
  rpnLine[dRows-1] = "<br>";
}