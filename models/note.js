
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const listItemSchema = new Schema({
  name: String,
  isChecked: Boolean,
},
{
  timestamps: true
});

const noteSchema = new Schema({
  // user id
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Owner',
  },
  // user ids
  guest: [{
    type: Schema.Types.ObjectId,
    ref: 'Guest'
  }],
  title: {
    type: String, 
    required: true
  },
  isChecklist: Boolean,
  listItems: [listItemSchema],
  textNote: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);