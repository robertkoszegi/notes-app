
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const performerSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    // content: {
    //     items: 
    // }

  
}, {
  timestamps: true
});

module.exports = mongoose.model('Performer', performerSchema);