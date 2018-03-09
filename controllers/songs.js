var Song = require('../models/song');
var Album = require('../models/album');

exports.getSongs = function (req, res, next) {

    Song.find(function (err, songs) {

        if (err) {
            res.send(err);
        }

        res.json(songs);

    });

}

exports.createSong = function (req, res, next) {

    var title = req.body.title;
    var duration = req.body.duration;
    var albumId = req.body.albumId;

    if (!title) {
        return res.status(400).send({
            error: 'You must enter a title'
        });
    }

    if (!albumId) {
        return res.status(400).send({
            error: 'You must enter at least one album id'
        });
    }

    Album.findOne({
        _id: albumId
    }, function (err, existingAlbum) {

        if (err) {
            return next(err);
        }

        if (!existingAlbum) {
            return res.status(404).send({
                error: 'Album not found'
            });
        }

        Song.findOne({
            title: title
        }, function (err, existingSong) {

            if (err) {
                return next(err);
            }

            if (existingSong) {
                return res.status(400).send({
                    error: 'That Song is already in our records'
                });
            }

            var song = new Song({
                title: title,
                duration: duration,
                _album: existingAlbum
            });

            song.save(function (err, song) {

                if (err) {
                    return next(err);
                }

                res.status(201).json({
                    Song: song
                });
            });
        });
    });


}

exports.deleteSong = function (req, res, next) {

    Song.remove({
        _id: req.params.song_id
    }, function (err, song) {
        res.json(song);
    });

}