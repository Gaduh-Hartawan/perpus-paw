const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  /*
  Controller Data Buku
  */
  // Ambil semua data buku
  getBooks(req, res) {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      let query = `SELECT * FROM t_buku 
            INNER JOIN t_kategori ON t_buku.id_kategori = t_kategori.id_kategori
            INNER JOIN t_jenis ON t_buku.id_jenis = t_jenis.id_jenis;`;
      conn.query(query, (error, result) => {
        if (error) throw error;
        res.render("admin/bookList", {
          url: "http://localhost:5050/",
          userName: req.session.username,
          data: result,
          statusFlash: req.flash("status"),
          pesanFlash: req.flash("message"),
          colorFlash: req.flash("color"),
        });
      });
    });
  },
  // Render Form Add Book
  formAddBook(req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      let query = `SELECT * FROM t_kategori; select * from t_jenis`;
      connection.query(query, function (error, results) {
        if (error) throw error;
        res.render("admin/addBook", {
          data: results[0],
          dataJenis: results[1],
          url: "http://localhost:5050/",
          userName: req.session.username,
        });
      });
      connection.release();
    });
  },
  // Simpan data Add Book
  addBook(req, res) {
    let data = {
      judul_buku: req.body.judul,
      penerbit: req.body.penerbit,
      tahun: req.body.tahun,
      denda: req.body.denda,
      pengarang: req.body.pengarang,
      jumlah: req.body.jumlah,
      id_jenis: req.body.id_jenis,
      id_kategori: req.body.id_kategori,
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
                INSERT INTO t_buku SET ?;
                `,
        [data],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "success");
          req.flash("status", "Yes..");
          req.flash("message", "Tambah Buku berhasil");
          res.redirect("/admin/buku");
        }
      );
      connection.release();
    });
  },
  // Render Form Edit Book
  formEdit(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      let query = `select * from t_buku INNER JOIN t_kategori ON t_buku.id_kategori = t_kategori.id_kategori
      INNER JOIN t_jenis ON t_buku.id_jenis = t_jenis.id_jenis where id_buku = ${id};SELECT * FROM t_kategori; select * from t_jenis`;
      connection.query(query, function (error, results) {
        if (error) throw error;
        // console.log(results[0]);
        res.render("admin/editBook", {
          id_buku: results[0].id_buku,
          judul: results[0].judul_buku,
          penerbit: results[0].penerbit,
          tahun: results[0].tahun,
          pengarang: results[0].pengarang,
          denda: results[0].denda,
          jumlah: results[0].jumlah,
          url: "http://localhost:5050/",
          userName: req.session.username,
          data: results[0],
          dataKategori: results[1],
          dataJenis: results[2],
        });
      });
      connection.release();
    });
  },
  // Simpan data Edit Book
  editBook(req, res) {
    let dataEdit = {
      judul_buku: req.body.judul,
      penerbit: req.body.penerbit,
      tahun: req.body.tahun,
      denda: req.body.denda,
      pengarang: req.body.pengarang,
      jumlah: req.body.jumlah,
      id_jenis: req.body.jenis,
      id_kategori: req.body.kategori,
    };
    let id_buku = req.body.id_buku;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `UPDATE t_buku SET ? WHERE id_buku = ?;`,
        [dataEdit, id_buku],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "success");
          req.flash("status", "Yes..");
          req.flash("message", "Edit Buku berhasil");
          res.redirect("/admin/buku");
        }
      );
      connection.release();
    });
  },
  // Delete Book
  deleteBook(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `DELETE FROM t_buku WHERE id_buku = ?;`,
        [id],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "danger");
          req.flash("status", "Okay..");
          req.flash("message", "Hapus Buku berhasil");
          res.redirect("/admin/buku");
        }
      );
      connection.release();
    });
  },
  /**
   * 
   *  
  Controller Data Kategori Buku
  */
  // Ambil Semua data kategori
  getKategori(req, res) {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      let query = `SELECT * FROM t_kategori;`;

      conn.query(query, (error, result) => {
        if (error) throw error;
        res.render("admin/kategoriList", {
          url: "http://localhost:5050/",
          userName: req.session.username,
          data: result,
          statusFlash: req.flash("status"),
          pesanFlash: req.flash("message"),
          colorFlash: req.flash("color"),
        });
      });
    });
  },
  // Form Add Kategori
  formAddKategori(req, res) {
    res.render("admin/addKategori", {
      // Definisikan semua varibel yang ingin ikut dirender kedalam register.ejs
      url: "http://localhost:5050/",
      userName: req.session.username,
    });
  },
  // Simpan Data Add Kategori
  addKategori(req, res) {
    let data = {
      nama_kategori: req.body.nama_kategori,
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO t_kategori SET ?;`,
        [data],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "success");
          req.flash("status", "Okay..");
          req.flash("message", "Tambah Kategori berhasil");
          res.redirect("/admin/kategori");
        }
      );
      connection.release();
    });
  },
  // Render Form Edit Kategori
  formEditKategori(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      let query = `select * from t_kategori where id_kategori = ${id}`;
      connection.query(query, function (error, results) {
        if (error) throw error;
        // console.log({data: results});
        res.render("admin/editKategori", {
          id_kategori: results[0].id_kategori,
          nama_kategori: results[0].nama_kategori,
          url: "http://localhost:5050/",
          userName: req.session.username,
        });
      });
      connection.release();
    });
  },
  // Simpan Data Edit Kategori
  editKategori(req, res) {
    let dataEdit = {
      nama_kategori: req.body.nama_kategori,
    };
    let id = req.body.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `UPDATE t_kategori SET ? WHERE id_kategori = ?;`,
        [dataEdit, id],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "success");
          req.flash("status", "Yes..");
          req.flash("message", "Edit Kategori berhasil");
          res.redirect("/admin/kategori");
        }
      );
      connection.release();
    });
  },
  // Delete Kategori
  deleteKategori(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `DELETE FROM t_kategori WHERE id_kategori = ?;`,
        [id],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "danger");
          req.flash("status", "Okay..");
          req.flash("message", "Hapus Kategori berhasil");
          res.redirect("/admin/kategori");
        }
      );
      connection.release();
    });
  },
  /**
   * 
   * 
   * 
  Controller Data Jenis Buku
  */
  // Ambil Semua data Jenis Buku
  getJenis(req, res) {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      let query = `SELECT * FROM t_jenis;`;

      conn.query(query, (error, result) => {
        if (error) throw error;
        res.render("admin/jenisList", {
          url: "http://localhost:5050/",
          userName: req.session.username,
          data: result,
          statusFlash: req.flash("status"),
          pesanFlash: req.flash("message"),
          colorFlash: req.flash("color"),
        });
      });
    });
  },
  // Render form add jenis
  formAddJenis(req, res) {
    res.render("admin/addJenis", {
      // Definisikan semua varibel yang ingin ikut dirender kedalam register.ejs
      url: "http://localhost:5050/",
      userName: req.session.username,
    });
  },
  // Simpan data add jenis
  addJenis(req, res) {
    let data = {
      nama_jenis: req.body.nama_jenis,
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO t_jenis SET ?;`,
        [data],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "success");
          req.flash("status", "Yes..");
          req.flash("message", "Tambah Jenis Buku berhasil");
          res.redirect("/admin/jenis");
        }
      );
      connection.release();
    });
  },
  // Render form edit jenis
  formEditJenis(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      let query = `select * from t_jenis where id_jenis = ${id}`;
      connection.query(query, function (error, results) {
        if (error) throw error;
        // console.log({data: results});
        res.render("admin/editJenis", {
          id_jenis: results[0].id_jenis,
          nama_jenis: results[0].nama_jenis,
          url: "http://localhost:5050/",
          userName: req.session.username,
        });
      });
      connection.release();
    });
  },
  // Simpan data edit jenis
  editJenis(req, res) {
    let dataEdit = {
      nama_jenis: req.body.nama_jenis,
    };
    let id = req.body.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `UPDATE t_jenis SET ? WHERE id_jenis = ?;`,
        [dataEdit, id],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "success");
          req.flash("status", "Yes..");
          req.flash("message", "Edit Jenis Buku berhasil");
          res.redirect("/admin/jenis");
        }
      );
      connection.release();
    });
  },
  // Delete jenis
  deleteJenis(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `DELETE FROM t_jenis WHERE id_jenis = ?;`,
        [id],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "danger");
          req.flash("status", "Okay..");
          req.flash("message", "Hapus Jenis Buku berhasil");
          res.redirect("/admin/jenis");
        }
      );
      connection.release();
    });
  },
};
