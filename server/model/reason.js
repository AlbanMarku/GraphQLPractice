const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reasonSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Reason", reasonSchema);