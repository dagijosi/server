import express from "express";

import {
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
} from "../controller/song.controller.js";

const router = express.Router();

router.route("/").get(getAllSongs);
router.route("/artists").get(getAllArtists);
router.route("/albums").get(getAllAblum);
router.route("/gener").get(getAllGener);
router.route("/:id").get(getSongById);
router.route("/artist/:id").get(getSongByArtist);
router.route("/album/:artistName").get(getAlbumByArtist);
router.route("/albumsba/:albumName").get(getSongByAlbum);
router.route("/gener/:id").get(getSongByGener);
router.route("/artist/:id").get(getArtistByGener);
router.route("/album/:id").get(getAlbumByGener);
router.route("/").post(createNewSong);
router.route("/:id").patch(updateSong);
router.route("/:id").delete(deleteSong);
router.route("/album/:id").patch(updateAblum);
router.route("/artist/:id").patch(updateArtist);
router.route("/gener/:id").patch(updateGener);
router.route("/artists/:artistName").get(getNumberOfAlbumsByArtist);
router.route("/artistss/:artistName").get(getNumberOfSongByArtist);
router.route("/artistsss/:albumName").get(getNumberOfSongByAlbum);
router.route("/artistsg/:generName").get(getNumberOfSongByGener);
router.route("/artistsa/:generName").get(getNumberOfAlbumByGener);
router.route("/artistsag/:generName").get(getNumberOfArtistByGener);
router.route("/search/:query").get(getSearchQuery);
export default router;