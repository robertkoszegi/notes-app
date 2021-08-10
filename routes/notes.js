var express = require('express');
var router = express.Router();
var notesCtrl = require('../controllers/notes')

/* GET user's notes. */
// All notes
router.get('/', notesCtrl.index );

// // new 
router.post('/newNote', notesCtrl.addNote);
// router.post('/newList', notesCtrl.addList);

// show
router.get('/:id', notesCtrl.show)

// // delete 
// router.delete('/delNote/:id', notesCtrl.delNote);


module.exports = router;