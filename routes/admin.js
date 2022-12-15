const router = require("express").Router();
const verifyAdmin = require("../configs/verify").isAdmin;
const adminController = require("../controllers/admin");
const bookController = require("../controllers/books");

// Dashboard
router.get("/admin/dashboard",verifyAdmin, adminController.getDashboard);

// Data Admin
router.get("/admin/adminlist",verifyAdmin, adminController.getAdmin);
router.get("/admin/adminlist/add",verifyAdmin, adminController.formAddAdmin);
router.post("/admin/adminlist/add",verifyAdmin, adminController.addAdmin);
router.get("/admin/adminlist/edit/:id",verifyAdmin, adminController.formEditAdmin);
router.post("/admin/adminlist/edit",verifyAdmin, adminController.editAdmin);
router.get("/admin/adminlist/delete/:id",verifyAdmin, adminController.deleteAdmin);

// Data User
router.get("/admin/user",verifyAdmin, adminController.getUsers);
router.get("/admin/user/add",verifyAdmin, adminController.formAddUser);
router.post("/admin/user/add",verifyAdmin, adminController.addUser);
router.get("/admin/user/edit/:id",verifyAdmin, adminController.formEditUser);
router.post("/admin/user/edit",verifyAdmin, adminController.editUser);
router.get("/admin/user/delete/:id",verifyAdmin, adminController.deleteUser);

// Data Buku
router.get("/admin/buku",verifyAdmin, bookController.getBooks);
router.get("/admin/buku/add",verifyAdmin, bookController.formAddBook);
router.post("/admin/buku/add",verifyAdmin, bookController.addBook);
router.get("/admin/buku/edit/:id",verifyAdmin, bookController.formEdit);
router.post("/admin/buku/edit",verifyAdmin, bookController.editBook);
router.get("/admin/buku/delete/:id",verifyAdmin, bookController.deleteBook);

router.get("/admin/kategori",verifyAdmin, bookController.getKategori);
router.get("/admin/kategori/add",verifyAdmin, bookController.formAddKategori);
router.post("/admin/kategori/add",verifyAdmin, bookController.addKategori);
router.get("/admin/kategori/edit/:id",verifyAdmin, bookController.formEditKategori);
router.post("/admin/kategori/edit",verifyAdmin, bookController.editKategori);
router.get("/admin/kategori/delete/:id",verifyAdmin, bookController.deleteKategori);

router.get("/admin/jenis",verifyAdmin, bookController.getJenis);
router.get("/admin/jenis/add",verifyAdmin, bookController.formAddJenis);
router.post("/admin/jenis/add",verifyAdmin, bookController.addJenis);
router.get("/admin/jenis/edit/:id",verifyAdmin, bookController.formEditJenis);
router.post("/admin/jenis/edit",verifyAdmin, bookController.editJenis);
router.get("/admin/jenis/delete/:id",verifyAdmin, bookController.deleteJenis);

// Data Transaksi
router.get("/admin/peminjaman",verifyAdmin, adminController.getAllPinjam);
router.get("/admin/peminjaman/add",verifyAdmin, adminController.formAddPinjam);
router.post("/admin/peminjaman/add",verifyAdmin, adminController.addPinjam);

module.exports = router;
