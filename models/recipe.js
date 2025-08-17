const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    ingredients:
        [ mongoose.Schema.Types.ObjectId ]
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
