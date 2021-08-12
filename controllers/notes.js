
const User = require('../models/user');
const Note = require('../models/note');

// Basic View
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
                // for main page
                notes,
                title: "All notes",
                // for modal
                note,
                listItems: note.listItems,
                modal: note.isChecklist ? "checklist" : "textNote",
                
            })
            
        })
    })

}



// SHOW EMPTY MODULES
// Note
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

// List
function startList(req,res, next) {
    Note.find({owner: req.user.id}).exec(function(err, notes ) {
        
        res.render('notes/index', {
            title: "All notes",
            notes,
            modal: "checklist",
            note:{listItems:[]},
            

        }) 
        
    })
}



// CREATE NEW RECORD
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

async function addList(req, res, next) {
    const note = new Note (req.body);
    note.isChecklist = true;
    note.owner = req.user.id;
    note.guest = [];
    listItemsArr = JSON.parse(req.body.jsonList)
    
    listItemsArr.forEach(listItem => {
        note.listItems.push(listItem)
    });
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



// UPDATE RECORD
async function updateNote(req, res, next) {
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

async function updateList(req, res, next) {
    await Note.updateOne({_id:req.params.id}, req.body)
    console.log("req",req.body.jsonList)
    listItemsArr = JSON.parse(req.body.jsonList)
    if(listItemsArr.length) {
        note.listItems.deleteMany();
        listItemsArr.forEach(listItem => {
        note.listItems.push(listItem)
    });
    }

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




// function addList(req, res, next) {
//     // req.user.facts.push(req.body);
//     // req.user.save(function(err) {
//     //   res.redirect('/students');
//     // });
// }
  

// DELETE RECORD
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
    addList,
    startNote,
    startList,
    updateNote,
    updateList,
    delNote,
  };