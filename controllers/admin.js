const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  // Dashboard
  getDashboard(req, res) {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      const query =
        "select count(id_anggota) as id from t_anggota;select count(id_buku) as id from t_buku;select count(id_pinjam) as id from t_pinjam";

      conn.query(query, (err, results) => {
        if (err) throw err;

        res.render("admin/index", {
          url: "http://localhost:5050/",
          dataAnggota: results[0],
          dataBuku: results[1],
          dataPinjam: results[2],
          userName: req.session.username,
        });
      });
    });
  },
  /* 
    Controller Admin kelola Admin
  */
  // Ambil semua data admin
  getAdmin(req, res) {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      let query = "SELECT * FROM t_admin";

      conn.query(query, (error, result) => {
        if (error) throw error;
        res.render("admin/adminList", {
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
  // Render form add Admin
  formAddAdmin(req, res) {
    res.render("admin/addAdmin", {
      // Definisikan semua varibel yang ingin ikut dirender kedalam register.ejs
      url: "http://localhost:5050/",
      userName: req.session.username,
    });
  },
  // Simpan data admin
  addAdmin(req, res) {
    let data = {
      nama_admin: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };
    // Panggil koneksi dan eksekusi query
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO t_admin set ?`,
        [data],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "success");
          req.flash("status", "Yes..");
          req.flash("message", "Tambah Admin berhasil");
          res.redirect("/admin/adminlist");
        }
      );
      connection.release();
    });
  },
  // render form edit Admin
  formEditAdmin(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      let query = `select * from t_admin where id_admin = ${id}`;
      connection.query(query, function (error, results) {
        if (error) throw error;
        // console.log({data: results});
        res.render("admin/editAdmin", {
          id_admin: results[0].id_admin,
          nama_admin: results[0].nama_admin,
          email: results[0].email,
          username: results[0].username,
          password: results[0].password,
          url: "http://localhost:5050/",
          userName: req.session.username,
        });
      });
      connection.release();
    });
  },
  // simpan data edit admin
  editAdmin(req, res) {
    let dataEdit = {
      nama_admin: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };
    let id = req.body.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
                UPDATE t_admin SET ? WHERE id_admin = ?;
                `,
        [dataEdit, id],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "success");
          req.flash("status", "Yes..");
          req.flash("message", "Ubah Data Admin berhasil");
          res.redirect("/admin/adminlist");
        }
      );
      connection.release();
    });
  },
  // Hapus Data Admin
  deleteAdmin(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
                DELETE FROM t_admin WHERE id_admin = ?;
                `,
        [id],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "danger");
          req.flash("status", "Okay..");
          req.flash("message", "Hapus data admin berhasil");
          res.redirect("/admin/adminlist");
        }
      );
      connection.release();
    });
  },
  /* 
    Controller Admin kelola anggota
  */
  // Ambil Semua data anggota
  getUsers(req, res) {
    pool.getConnection((err, conn) => {
      if (err) throw err;
      let query = "SELECT * FROM t_anggota";

      conn.query(query, (error, result) => {
        if (error) throw error;
        res.render("admin/userList", {
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
  // Render form add User
  formAddUser(req, res) {
    res.render("admin/addUser", {
      // Definisikan semua varibel yang ingin ikut dirender kedalam register.ejs
      url: "http://localhost:5050/",
      userName: req.session.username,
    });
  },
  // Simpan data user
  addUser(req, res) {
    let data = {
      nama_anggota: req.body.name,
      nim: req.body.nim,
      no_tlp: req.body.no_tlp,
      jurusan: req.body.jurusan,
      username: req.body.username,
      password: req.body.pass,
    };
    // Panggil koneksi dan eksekusi query
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO t_anggota set ?`,
        [data],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "success");
          req.flash("status", "Yes..");
          req.flash("message", "Tambah User berhasil");
          res.redirect("/admin/user");
        }
      );
      connection.release();
    });
  },
  // Form Edit User
  formEditUser(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      let query = `select * from t_anggota where id_anggota = ${id}`;
      connection.query(query, function (error, results) {
        if (error) throw error;
        // console.log({data: results});
        res.render("admin/editUser", {
          id_anggota: results[0].id_anggota,
          nama_anggota: results[0].nama_anggota,
          nim: results[0].nim,
          no_tlp: results[0].no_tlp,
          jurusan: results[0].jurusan,
          username: results[0].username,
          password: results[0].password,
          url: "http://localhost:5050/",
          userName: req.session.username,
        });
      });
      connection.release();
    });
  },
  // simpan data edit User
  editUser(req, res) {
    let dataEdit = {
      nama_anggota: req.body.name,
      nim: req.body.nim,
      no_tlp: req.body.no_tlp,
      jurusan: req.body.jurusan,
      username: req.body.username,
      password: req.body.pass,
      status: req.body.status,
    };
    let id = req.body.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
                UPDATE t_anggota SET ? WHERE id_anggota = ?;
                `,
        [dataEdit, id],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "success");
          req.flash("status", "Yes..");
          req.flash("message", "Ubah Data User berhasil");
          res.redirect("/admin/user");
        }
      );
      connection.release();
    });
  },
  // Hapus Data User
  deleteUser(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `
                DELETE FROM t_anggota WHERE id_anggota = ?;
                `,
        [id],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "danger");
          req.flash("status", "Okay..");
          req.flash("message", "Hapus User berhasil");
          res.redirect("/admin/user");
        }
      );
      connection.release();
    });
  },

  /**
   *
   * Controller Transaksi
   */

  // Ambil Semua Data Transaksi
  getAllPinjam(req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      let query = `SELECT * FROM t_pinjam 
        INNER JOIN t_buku ON t_pinjam.id_buku = t_buku.id_buku
        INNER JOIN t_anggota ON t_pinjam.id_anggota = t_anggota.id_anggota;`;
      connection.query(query, function (error, results) {
        if (error) throw error;
        res.render("admin/pinjamList", {
          data: results,
          url: "http://localhost:5050/",
          userName: req.session.username,
          statusFlash: req.flash("status"),
          pesanFlash: req.flash("message"),
          colorFlash: req.flash("color"),
        });
      });
      connection.release();
    });
  },
  // render form tambah peminjaman
  formAddPinjam(req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      let query = `SELECT * FROM t_anggota`;

      connection.query(query, function (error, results) {
        if (error) throw error;
        // console.log({data: results});
        res.render("admin/addPinjam", {
          data: results,
          url: "http://localhost:5050/",
          userName: req.session.username,
        });
      });
      connection.release();
    });
  },
  // Simpan data tambah peminjaman
  addPinjam(req, res) {
    let data = {
      lama_pinjam: req.body.lama_pinjam,
      id_anggota: req.body.id_anggota,
      id_buku: req.body.id_buku,
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO t_pinjam SET ?;`,
        [data],
        function (error, results) {
          if (error) throw error;
          req.flash("color", "success");
          req.flash("status", "Yes..");
          req.flash("message", "Tambah Peminjaman berhasil");
          res.redirect("/admin/peminjaman");
        }
      );
      connection.release();
    });
  },
};
