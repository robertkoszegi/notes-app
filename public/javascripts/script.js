
// ----------------
// --  ELEMENTS  --
// ----------------
// Get the modal
const modal = document.getElementById("inputNote");

// const noteFrm = document.getElementById("noteFrm");

// Get the button that opens the modal
const btn = document.getElementById("addNote");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// Get the save button element that closes the modal submits
// const saveBtn = document.getElementById("saveBtn");

// Get list container element
const listUl = document.getElementById('listUl')

// Get input text element for new items
const itemInputEl = document.getElementById('itemInput')

// Get button to add item to list
const addItemBtnEl = document.getElementById('addItemBtn')

// -- this mign not be relavant any more
// When the user clicks on the button, open the modal
document.getElementById("addNote").onclick = function() {
    modal.style.display = "block";
}



// -----------------
// --  LISTENTERS --
// -----------------
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

addItemBtnEl.onclick = function(event) {
  let newItem = itemInputEl.value;
  li = document.createElement('li')
  span = document.createElement('span');
  input = document.createElement('input').setAttribute
  let li = document.createElement("li").innerHTML = '<input type="checkbox" class="checkbox" name="isChecked"> <span class="itemText" name="item">' + newItem + '</span>'
  listUl.appendChild(li)
}

// // Close modal and enter note to DB
// saveBtn.onclick = function() {
//     noteFrm.submit()
//     modal.style.display = "none"
// }

// ------------------
// --  FUNCTIONS  --
// ------------------
