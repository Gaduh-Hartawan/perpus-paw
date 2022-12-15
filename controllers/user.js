const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  // Ambil Semua Data Transaksi
  getDashboard(req, res) {
    pool.getConnection(function (err, connection) {
      let id = req.session.userid;
      // console.log(req.session.username);
      // console.log(req.session.userid);
      if (err) throw err;
      let query = `SELECT * FROM t_pinjam 
        JOIN t_buku ON t_pinjam.id_buku = t_buku.id_buku
        JOIN t_anggota ON t_pinjam.id_anggota = t_anggota.id_anggota
        where t_anggota.id_anggota = ${id}
        `;
      connection.query(query, function (error, results) {
        if (error) throw error;
        res.render("user/index", {
          data: results,
          url: "http://localhost:5050/",
          userName: req.session.username,
        });
      });
      connection.release();
    });
  },
};
