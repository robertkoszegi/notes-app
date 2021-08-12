
const User = require('../models/user');
const Note = require('../models/note');

// -------------------
// DISPLAY
// -------------------
// Basic View
function index(req, res, next) {
    console.log(req.user.id)
    
    Note.find({owner: req.user.id}).exec(function(err, notes) {
        res.render('notes/index', {
            title: "All notes",
            notes,
            modal: "none",
            note:{},
        }) 
        
    })

}

// Display a Note
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


// -------------------
// SHOW EMPTY MODALS
// when starting a new one
// -------------------
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


// -------------------
// CREATE NEW RECORD
// -------------------
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


// -------------------
// UPDATE RECORD
// -------------------
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
    const note = await Note.findOneAndUpdate({_id:req.params.id}, req.body,{useFindAndModify:false, new: true})
    console.log(note)
    // await note.updateOne({_id: req.params.id}, req.body)
    let listItemsArr = JSON.parse(req.body.jsonList)
    console.log(listItemsArr)
    // console.log(listItemsArr)
    if(listItemsArr.length) {
        listItemsArr.forEach(oneItem => {
            if(oneItem.id) { 
                let thisItem = note.listItems.find((li) => {
                    console.log("li",li)
                    return li._id = oneItem.id;
                })
                console.log("thisItem:",thisItem)
                console.log("note.listItem before change",note.listItems)
                thisItem.name = oneItem.name;
                thisItem.isChecked = oneItem.isChecked;
                console.log("note.listItem after change",note.listItems)
            //else
            } else {
                note.listItems.push(oneItem)
            }
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
  
// -------------------
// DELETE RECORD
// -------------------
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