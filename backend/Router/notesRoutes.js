const express = require("express");
const { tambahNotes, ambilDataNotes, perbaruiNotes, hapusNotes, ambilNotesId } = require("../Controller/notes");

const notesRoutes = express();

notesRoutes.post("/notes", tambahNotes);
notesRoutes.get("/notes", ambilDataNotes);
notesRoutes.get("/notes/:id", ambilNotesId);
notesRoutes.put("/notes/:id", perbaruiNotes);
notesRoutes.delete("/notes/:id", hapusNotes);

module.exports = notesRoutes;