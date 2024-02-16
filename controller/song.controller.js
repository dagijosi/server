import Song from "../mongodb/models/song.js";

const getAllSongs = async (req, res) => {
    try{
        const songs = await Song.find({}).limit(req.query._end);

        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createNewSong = async (req, res) => {
    try{
        const {title, artist, album, gener} = req.body;

        const songExists = await Song.findOne({title});

        if(songExists) return res.status(200).json(songExists);
        
        const newSong = await Song.create({
            title,
            artist,
            album,
            gener
        })

        res.status(200).json(newSong);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateSong = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, artist, album, gener } = req.body;

        const song = await Song.findById(id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        if (title !== undefined) {
            song.title = title;
        }
        if (artist !== undefined) {
            song.artist = artist;
        }
        if (album !== undefined) {
            song.album = album;
        }
        if (gener !== undefined) {
            song.gener = gener;
        }

        const updatedSong = await song.save();
        res.status(200).json(updatedSong);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSong = async (req, res) => {
    try {
        const { id } = req.params;
        const song = await Song.findByIdAndDelete(id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllArtists = async (req, res) => {
    try {
        const artists = await Song.distinct('artist');
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getNumberOfAlbumsByArtist = async (req, res) => {
    try {
        const { artistName } = req.params;
        const result = await Song.aggregate([
            { $match: { artist: artistName } },
            { $group: { _id: { artist: "$artist", album: "$album" } } },
            { $count: "numberOfAlbums" }
        ]);

        const numberOfAlbums = result.length > 0 ? result[0].numberOfAlbums : 0;

        res.status(200).json({ numberOfAlbums });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getNumberOfSongByArtist = async (req, res) => {
    try {
        const { artistName } = req.params;
        const result = await Song.aggregate([
            { $match: { artist: artistName } },
            { $group: { _id: { artist: "$artist", title: "$title" } } },
            { $count: "numberOfSong" }
        ]);

        const numberOfSongs = result.length > 0 ? result[0].numberOfSong : 0;

        res.status(200).json({ numberOfSongs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllAblum = async (req, res) => {
    try {
        const albums = await Song.distinct('album');
        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getNumberOfSongByAlbum = async (req, res) => {
    try {
        const { albumName } = req.params;
        const result = await Song.aggregate([
            { $match: { album: albumName } },
            { $group: { _id: { album: "$album", title: "$title" } } },
            { $count: "numberOfSong" }
        ]);

        const numberOfSongs = result.length > 0 ? result[0].numberOfSong : 0;

        res.status(200).json({ numberOfSongs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getAllGener = async (req, res) => {
    try {
        const gener = await Song.distinct('gener');
        res.status(200).json(gener);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getNumberOfSongByGener = async (req, res) => {
    try {
        const { generName } = req.params;
        const result = await Song.aggregate([
            { $match: { gener: generName } },
            { $group: { _id: { gener: "$gener", title: "$title" } } },
            { $count: "numberOfSong" }
        ]);

        const numberOfSongs = result.length > 0 ? result[0].numberOfSong : 0;

        res.status(200).json({ numberOfSongs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getNumberOfArtistByGener = async (req, res) => {
    try {
        const { generName } = req.params;
        const result = await Song.aggregate([
            { $match: { gener: generName } },
            { $group: { _id: { gener: "$gener", artist: "$artist" } } },
            { $count: "numberOfArtist" }
        ]);

        const numberOfArtists = result.length > 0 ? result[0].numberOfArtist : 0;

        res.status(200).json({ numberOfArtists });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getNumberOfAlbumByGener = async (req, res) => {
    try {
        const { generName } = req.params;
        const result = await Song.aggregate([
            { $match: { gener: generName } },
            { $group: { _id: { gener: "$gener", album: "$album" } } },
            { $count: "numberOfAlbum" }
        ]);

        const numberOfAlbums = result.length > 0 ? result[0].numberOfAlbum : 0;

        res.status(200).json({ numberOfAlbums });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getSongById = async (req, res) => {};
const getSongByArtist = async (req, res) => {};

const getAlbumByArtist = async (req, res) => {
    try {
        const { artistName } = req.params;
        const albums = await Song.distinct('album', { artist: artistName });
        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSongByAlbum = async (req, res) => {
    try {
        const { albumName } = req.params;
        const songs = await Song.find({ album: albumName });
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getSearchQuery = async (req, res) => {
    try {
        const { query } = req.params;
        const regex = new RegExp(query, 'i');
         const results = await Song.find({$or: [
            { title: regex },
            { artist: regex },
            { album: regex },
            { gener: regex }
        ]});

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getSongByGener = async (req, res) => {};
const getArtistByGener = async (req, res) => {};
const getAlbumByGener = async (req, res) => {};


const updateAblum = async (req, res) => {};
const updateArtist = async (req, res) => {};
const updateGener = async (req, res) => {};

export{
    getAllSongs,
    getAllArtists,
    getAllAblum,
    getAllGener,
    getSongById,
    getSongByArtist,
    getAlbumByArtist,
    getSongByAlbum,
    getSongByGener,
    getArtistByGener,
    getAlbumByGener,
    createNewSong,
    updateSong,
    deleteSong,
    updateAblum,
    updateArtist,
    updateGener,
    getNumberOfAlbumsByArtist,
    getNumberOfSongByArtist,
    getNumberOfSongByAlbum,
    getNumberOfSongByGener,
    getNumberOfAlbumByGener,
    getNumberOfArtistByGener,
    getSearchQuery,
}