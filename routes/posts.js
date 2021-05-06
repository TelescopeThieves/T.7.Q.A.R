const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
const { storage } = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.get("/editPost/:id", postsController.editPost);

router.get("/getPost/:id", postsController.getPost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;