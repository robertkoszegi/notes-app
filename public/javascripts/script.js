
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
const saveBtn = document.getElementById("saveBtn");

// Get list container element
const listUl = document.getElementById('listUl')

// Get input text element for new items
const itemInputEl = document.getElementById('itemInput')

// Get button to add item to list
const addItemBtnEl = document.getElementById('addItemBtn')

const listFrm = document.getElementById('listFrm')

// -- this mign not be relavant any more
// When the user clicks on the button, open the modal
document.getElementById("addNote").onclick = function() {
    modal.style.display = "block";
}

const listInput = document.getElementById('listInput')


const itemTextElArr = document.getElementsByClassName('itemText')
const itemCheckboxElArr = document.getElementsByClassName('itemCheckbox')
// const itemLiEl = document.getElementsByClassName('itemLi')



// -----------------
// --  LISTENTERS --
// -----------------
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// addItemBtnEl.onclick = function(event) {
//   addToTempList()
// }
addItemBtnEl.addEventListener("click", addToTempList);


saveBtn.addEventListener("click", submitList);


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// // Close modal and enter note to DB
// saveBtn.onclick = function() {
//     noteFrm.submit()
//     modal.style.display = "none"
// }

// ------------------
// --  FUNCTIONS  --
// ------------------

function addToTempList(event) {
  event.preventDefault(); // prevents the 'add item' button from submitting form it is in
  
  // create text span
  let inputField = document.createElement('input');
  inputField.setAttribute("class", "itemText");
  inputField.setAttribute("name", "item");
  inputField.setAttribute("type", "text");
  // inputField.setAttribute("value", itemInputEl.value);
  // create item text
  // let inpText = document.createTextNode(itemInputEl.value);
  // inputField.appendChild(inpText);
  // create checkbox
  let inputCb = document.createElement('input');
  inputCb.setAttribute("type", "checkbox");
  inputCb.setAttribute("class", "itemCheckbox");
  // inputCb.setAttribute("name", inpText); // keep getting [object Text]
  // create li
  let li = document.createElement('li')
  li.setAttribute("class", "itemLi")
  li.appendChild(inputCb);
  li.appendChild(inputField);
  listUl.appendChild(li);
      
}

function submitList(event) {
  // event.preventDefault();

  const jsonList = [];
  for (let i = 0; i < itemTextElArr.length; i++) {
    jsonList.push({
      name: itemTextElArr[i].value,
      isChecked: itemCheckboxElArr[i].checked
    })
  }
  listInput.setAttribute("value", JSON.stringify(jsonList))

  listFrm.submit()
}