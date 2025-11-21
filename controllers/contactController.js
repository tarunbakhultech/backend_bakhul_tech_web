const db = require("../config/db");

exports.getContacts = (req, res) => {
  db.query("SELECT * FROM contacts", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.addContact = (req, res) => {
  const { name, email, phone, message } = req.body;
  const sql =
    "INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, phone, message], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Contact added", id: result.insertId });
  });
};

exports.updateContact = (req, res) => {
  const { name, email, phone, message } = req.body;
  const sql =
    "UPDATE contacts SET name=?, email=?, phone=?, message=? WHERE id=?";
  db.query(sql, [name, email, phone, message, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Contact updated" });
  });
};

exports.deleteContact = (req, res) => {
  const sql = "DELETE FROM contacts WHERE id=?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Contact deleted" });
  });
};
