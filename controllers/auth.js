const config = require("../configs/database");

let mysql = require("mysql");
let pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

module.exports = {
  // Auth Untuk Admin
  loginAdmin(req, res) {
    res.render("admin/loginAdmin", {
      url: "http://localhost:5050/",
      statusFlash: req.flash("status"),
      pesanFlash: req.flash("message"),
      colorFlash: req.flash("color"),
    });
  },
  logoutAdmin(req, res) {
    req.session.destroy((err) => {
      if (err) return console.log(err);
      res.clearCookie("secretname");
      res.redirect("/login");
    });
  },
  authAdmin(req, res) {
    let username = req.body.username;
    let password = req.body.pass;
    if (username && password) {
      pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
          `SELECT * FROM t_admin WHERE username = ? AND password = ?`,
          [username, password],
          function (error, results) {
            if (error) throw error;
            if (results.length > 0) {
              // Jika data ditemukan, set sesi user tersebut menjadi true
              req.session.isAdmin = true;
              req.session.adminId = results[0].id_admin;
              req.session.username = results[0].username;
              res.redirect("/admin/dashboard");
            } else {
              // Jika data tidak ditemukan, set library flash dengan pesan error yang diinginkan
              req.flash("color", "danger");
              req.flash("status", "Oops..");
              req.flash("message", "Akun tidak ditemukan");
              res.redirect("/login");
            }
          }
        );
        connection.release();
      });
    } else {
      res.redirect("/loginAdmin");
      res.end();
    }
  },
  // Auth untuk User
  login(req, res) {
    res.render("user/login", {
      url: "http://localhost:5050/",
      statusFlash: req.flash("status"),
      pesanFlash: req.flash("message"),
      colorFlash: req.flash("color"),
    });
  },
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) return console.log(err);
      res.clearCookie("secretname");
      res.redirect("/login");
    });
  },
  register(req, res) {
    res.render("user/register", {
      url: "http://localhost:5050/",
      colorFlash: req.flash("color"),
      statusFlash: req.flash("status"),
      pesanFlash: req.flash("message"),
      colorFlash: req.flash("color"),
    });
  },
  saveRegister(req, res) {
    // Tampung inputan user kedalam varibel username, email dan password
    let data = {
      nama_anggota: req.body.name,
      nim: req.body.nim,
      no_tlp: req.body.no_tlp,
      jurusan: req.body.jurusan,
      username: req.body.username,
      password: req.body.pass,
    };

    pool.query("SELECT nim, username from t_anggota", (err, results) => {
      if (err) throw err;
      for (let index = 0; index < results.length; index++) {
        if (results[index].nim == data.nim) {
          // Jika tidak ada error, set library flash untuk menampilkan pesan sukses
          req.flash("color", "danger");
          req.flash("status", "Oops..");
          req.flash("message", "NIM / Username telah Terdaftar");
          // Kembali kehalaman login
          res.redirect("/register");
          return;
        }
      }
      // Panggil koneksi dan eksekusi query
      pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
          `INSERT INTO t_anggota set ?`,
          [data],
          function (error, results) {
            if (error) throw error;
            // Jika tidak ada error, set library flash untuk menampilkan pesan sukses
            req.flash("color", "success");
            req.flash("status", "Yes..");
            req.flash("message", "Registrasi berhasil");
            // Kembali kehalaman login
            res.redirect("/login");
          }
        );
        // Koneksi selesai
        connection.release();
      });
    });
  },
  authUser(req, res) {
    let username = req.body.username;
    let password = req.body.pass;
    if (username && password) {
      pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(
          `SELECT * FROM t_anggota WHERE username = ? AND password = ?`,
          [username, password],
          function (error, results) {
            if (error) throw error;
            if (results.length > 0) {
              // Jika data ditemukan, set sesi user tersebut menjadi true
              req.session.loggedin = true;
              req.session.userid = results[0].id_anggota;
              req.session.username = results[0].username;
              res.redirect("/dashboard");
            } else {
              // Jika data tidak ditemukan, set library flash dengan pesan error yang diinginkan
              req.flash("color", "danger");
              req.flash("status", "Oops..");
              req.flash("message", "Akun tidak ditemukan");
              res.redirect("/login");
            }
          }
        );
        connection.release();
      });
    } else {
      res.redirect("/login");
      res.end();
    }
  },
};
