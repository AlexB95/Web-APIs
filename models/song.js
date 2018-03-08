var mongoose = require('mongoose');

var ArtistSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    duration: String,
    _artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist'},
    _album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album'}

}, {
    timestamps: true
});

module.exports = mongoose.model('Song', ArtistSchema);