const {query} = require("../Database/db");

const tambahNotes = async (req, res) => {
    const { title, note } = req.body;
    try {
        const result = await query(
            `INSERT INTO notes (title, datetime, note) VALUES(?, NOW(), ?)`, 
            [title, note]
        );
        
        const [newNote] = await query(`SELECT * FROM notes WHERE id = ?`, [result.insertId]);

        return res.status(200).json({
            msg: "Penambahan notes berhasil!",
            data: newNote, 
        });
    } catch (error) {
        console.log("Penambahan notes gagal", error);
        return res.status(500).json({ msg: "Penambahan notes gagal" });
    }
};

const ambilDataNotes = async(req,res) => {
    try {
        const result = await query(`SELECT * FROM notes`);
        return res.status(200).json({ msg: "Ambil notes berhasil", data: result });
    } catch (error) {
        console.log("Ambil notes gagal", error);
    }
};

const perbaruiNotes = async (req, res) => {
    const { title, note } = req.body;
    const { id } = req.params;
    try {
        await query(`UPDATE notes SET title = ?,datetime = NOW(), note = ? WHERE id = ?`, [title, note, id]);

        const [updatedNote] = await query(`SELECT * FROM notes WHERE id = ?`, [id]);
        
        return res.status(200).json({
            msg: "Perbarui notes berhasil!",
            data: updatedNote,
        });
    } catch (error) {
        console.log("Perbarui notes gagal", error);
        return res.status(500).json({ msg: "Perbarui notes gagal" });
    }
};

const hapusNotes = async (req,res) => {
    const{id} = req.params;
    try {
        await query("DELETE FROM notes WHERE id = ?", [id]);
        return  res.status(200).json({ msg: "Hapus notes berhasil!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Hapus notes gagal" });
    }
};

const ambilNotesId = async(req,res) => {
    const {id} = req.params;
    try {
        const result = await query(`SELECT * FROM notes WHERE id = ?`, [id]);
        return res.status(200).json({ msg: "Pengambilan notes ID berhasil!", data: result });
    } catch (error) {
        console.log("Ambil notes gagal", error);
    }
};

module.exports = {
    tambahNotes,
    ambilDataNotes,
    perbaruiNotes,
    hapusNotes,
    ambilNotesId
}