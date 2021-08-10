
// --  ELEMENTS  --
// Get the modal
const modal = document.getElementById("inputNote");

const noteFrm = document.getElementById("noteFrm");

// Get the button that opens the modal
const btn = document.getElementById("addNote");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// Get the save button element that closes the modal submits
const saveBtn = document.getElementById("saveBtn");



// -- 
// When the user clicks on the button, open the modal
document.getElementById("addNote").onclick = function() {
    modal.style.display = "block";
}

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

// Close modal and enter note to DB
saveBtn.onclick = function() {
    noteFrm.submit()
    modal.style.display = "none"
}