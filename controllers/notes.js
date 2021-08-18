
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
            title: "All Notes",
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
    res.redirect('/notes')
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
    res.redirect('/notes')
    
}


// -------------------
// UPDATE RECORD
// -------------------
async function updateNote(req, res, next) {
    await Note.updateOne({_id:req.params.id}, req.body)

    // await note.save()
    res.redirect('/notes')
    // Note.find({owner: req.user.id}).exec(function(err, notes) {

    //     res.render('notes/index', {
    //         title: "All notes",
    //         notes,
    //         modal: "none",
    //         note:{},
    //     }) 
        
    // })
}

async function updateList(req, res, next) {
    const note = await Note.findOneAndUpdate({_id:req.params.id}, req.body,{useFindAndModify:false, new: true})
    console.log("note",note)

    let listItemsArr = JSON.parse(req.body.jsonList)
    console.log('listItemsArr:',listItemsArr)

    if(listItemsArr.length) {
        listItemsArr.forEach(oneItem => {
            if(oneItem.id) { 

                let foundItem = note.listItems.id(oneItem.id,function(err) {
                    if (err) {
                      console.log(err);
                    } 
                });
                foundItem.name = oneItem.name;
                foundItem.isChecked = oneItem.isChecked

            } else {
                note.listItems.push(oneItem)
            }
        });
    }

    await note.save()
    res.redirect('/notes')
}


  
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