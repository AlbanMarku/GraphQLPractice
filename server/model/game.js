const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    feelingId: {
        type: String,
        required: true,
    },
    reasonId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Game", gameSchema);