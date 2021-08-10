
const User = require('../models/user');
const Note = require('../models/note');


function index(req, res, next) {
    console.log(req.user.id)
    
    //after authentication...
    // find the user in the database
    // find user's notes
    // render with results
    Note.find({owner: req.user.id}).exec(function(err, notes) {
        res.render('notes/index', {
            title: "All notes",
            notes,
        }) 
        
    })

}

function show(req, res) {
    Note.findById(req.params.id)
}

function addNote(req, res, next) {
    const note = new Note (req.body);
    note.isChecklist = false;
    note.owner = req.user.id;
    note.guest = [];

    note.save(function(err){
        res.redirect('/notes/index')
    })
}
// async function addNote(req, res, next) {
//     const note = new Note (req.body);
//     note.isChecklist = false;
//     note.owner = req.user.id;
//     note.guest = [];

//     await note.save()
//     res.redirect('/notes/index')
// }

// function addList(req, res, next) {
//     // req.user.facts.push(req.body);
//     // req.user.save(function(err) {
//     //   res.redirect('/students');
//     // });
// }
  
function delNote(req, res, next) {
    
}

module.exports = {
    index,
    show,
    addNote,
  };