var express = require('express');
var router = express.Router();
var notesCtrl = require('../controllers/notes')


/* GET user's notes. */
// All notes
router.get('/', notesCtrl.index );

// Start empty
router.get('/newNote', notesCtrl.startNote)

// // new 
router.post('/newNote', notesCtrl.addNote);
// router.post('/newList', notesCtrl.addList);

// show
router.get('/:id', notesCtrl.show);

// delete 
router.delete('/:id', notesCtrl.delNote);


module.exports = router;