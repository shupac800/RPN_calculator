var win = document.getElementById("calcwin");
var everywhere = document.getElementById("everywhere");

var buttonAdd = document.getElementById("add");
var buttonSub = document.getElementById("subtract");
var buttonMul = document.getElementById("multiply");
var buttonDiv = document.getElementById("divide");
var buttonClr = document.getElementById("clear");

var rpnLine = [];   // array of lines in display
var dRows = 4;      // number of rows in display, number of elements in rpnLine[]
var decPlaces = 4;  // display this many places after decimal point
clearAll();

function clearAll() {
  for (i = 0; i < dRows; i++) {
    rpnLine[i] = "<br>";  // initialize this line
  }
  updateDisplay();
  nextEntryStartsNewLine = true;
}

everywhere.addEventListener("keyup",processKey);

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
  // prevent operation when either of bottom 2 lines is blank
  if ( (!parseFloat(rpnLine[dRows - 1])) ||
       (!parseFloat(rpnLine[dRows - 2])) ) {
    return;
  }
  var result;
  var operand2 = parseFloat(rpnLine[dRows - 2]);  // 2nd row from bottom
  var operand1 = parseFloat(rpnLine[dRows - 1]);  // bottom row
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
    case "divide":
      result = operand2 / operand1;
      break;
    default:
      break;
  }
  rpnLine[dRows - 1] = result.toFixed(decPlaces);  // put result in bottom line
  collapseDisplay();
  updateDisplay();
  nextEntryStartsNewLine = true;
}

function processKey(e) {  // process keyboard event
  e.preventDefault();
  var t = String.fromCharCode(e.keyCode);

  if (e.keyCode === 13)                // key is carriage return?
  {
    if (!parseFloat(rpnLine[dRows - 1])) {  // if bottom line is blank,
      return;                               // CR does nothing
    }

    rpnLine[dRows -1] = parseFloat(rpnLine[dRows -1]).toFixed(decPlaces); // convert to decimal
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

    rpnLine[dRows - 1] += t;  // add digit or "." to bottom line of display
    updateDisplay();
    return;
  }
  else {     // key is not a number, period, or CR?
    return;  // do nothing
  }
}

function updateDisplay() {
  win.innerHTML = " ";  // clear display area
  for (i = 0; i < dRows; i++) {
    win.innerHTML += "<p class='rpnLine'>" + rpnLine[i] + "</p>";
  }
}

function advanceDisplay(newLine) {
  for (i = 0; i < dRows; i++) {  // shift all lines upwards
    rpnLine[i] = rpnLine[i + 1];
  }
  rpnLine[dRows - 1] = newLine;
}

function collapseDisplay() {
  // future version:  make this operate on display of arbitrary size (not just 4 rows)
  rpnLine[2] = rpnLine[1];  // old line 2 disappears; move line 1 to line 2
  rpnLine[1] = rpnLine[0];  // move line 0 to line 1
  rpnLine[0] = "<br>";      // clear line 0
}


// better way is to make the bottom of the display rpnLine[0]
// and have advanceDisplay move in the other direction, i.e.
// rpnLine[0] moves to rpnLine[1],
// rpnLine[1] moves to rpnLine[2],
// rpnLine[999] moves to rpnLine[1000], etc.
// That way, there's no upper limit on the number of rows you can store
// updateDisplay() should display only rpnLine[0] through rpnLine[dRows-1]
// with rpnLine[0] at the bottom, not the top

// current rpnLine[dRows - 1] (bottom row)
// will become rpnLine[0]

// return error when trying to divide by zero
// use try, catch?


