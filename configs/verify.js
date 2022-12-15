module.exports = {
    isAdmin(req, res, next) {
        if (req.session.isAdmin === true) {
          next();
          return;
        } else {
          req.session.destroy(function (err) {
            res.redirect("/login");
          });
        }
      },
    isLogin(req, res, next) {
      if (req.session.loggedin === true) {
        next();
        return;
      } else {
        req.session.destroy(function (err) {
          res.redirect("/login");
        });
      }
    },
    isLogout(req, res, next) {
      if (req.session.loggedin !== true) {
        next();
        return;
      }
      res.redirect("/");
    },
  };
  