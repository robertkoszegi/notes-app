
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
            modal: "none",
            note:{},
        }) 
        
    })

}

// Show item
function show(req, res) {
    Note.find({owner: req.user.id}).exec(function(err, notes) {
        
        Note.findById(req.params.id, function(err, note){
            
            res.render('notes/index', {
                notes,
                title: "All notes",
                modal: "textNote",
                note,
                
            })
            
        })
    })

}

// Show empty module
function startNote(req,res, next) {
    Note.find({owner: req.user.id}).exec(function(err, notes ) {
        
        res.render('notes/index', {
            title: "All notes",
            notes,
            modal: "textNote",
            note:{},

            
        }) 
        
    })
}


// Create new record
async function addNote(req, res, next) {
    const note = new Note (req.body);
    note.isChecklist = false;
    note.owner = req.user.id;
    note.guest = [];

    await note.save()
    Note.find({owner: req.user.id}).exec(function(err, notes) {
        res.render('notes/index', {
            title: "All notes",
            notes,
            modal: "none",
            note:{},
        }) 
        
    })
}

// Update record
async function updateNote(req, res, next) {
    console.log(req.params.id)
    await Note.updateOne({_id:req.params.id}, req.body)

    // await note.save()
    Note.find({owner: req.user.id}).exec(function(err, notes) {
        res.render('notes/index', {
            title: "All notes",
            notes,
            modal: "none",
            note:{},
        }) 
        
    })
}




// function addList(req, res, next) {
//     // req.user.facts.push(req.body);
//     // req.user.save(function(err) {
//     //   res.redirect('/students');
//     // });
// }
  
function delNote(req, res, next) {
    Note.deleteOne({_id:req.params.id}, function(err) {
        if(err) {console.log(err)};
        Note.find({owner: req.user.id}).exec(function(err, notes) {
            res.render('notes/index', {
                title: "All notes",
                notes,
                modal: "none",
                note:{},
            }) 
            
        })
    } )
}

module.exports = {
    index,
    show,
    addNote,
    startNote,
    updateNote,
    delNote,
  };