var express = require('express');
var router = express.Router();
var notesCtrl = require('../controllers/notes')


/* GET user's notes. */
// All notes
router.get('/', notesCtrl.index );

// Start empty
router.get('/newNote', notesCtrl.startNote)
router.get('/newList', notesCtrl.startList)

// show
router.get('/:id', notesCtrl.show);

// // new 
router.post('/newNote', notesCtrl.addNote);
router.post('/newList', notesCtrl.addList);

// update
router.put('/updateNote/:id', notesCtrl.updateNote);
router.put('/updateList/:id', notesCtrl.updateList);


// delete 
router.delete('/:id', notesCtrl.delNote);


module.exports = router;