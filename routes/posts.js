const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts === null) {
      res.json({ result: "Success", message: "There is no post to show" });
    } else {
      res.json({ result: "Success", message: posts });
    }
  } catch (err) {
    res.json({ result: "Error", message: err.message });
  }
});

router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.json({ result: "Success", message: savedPost });
  } catch (err) {
    res.json({ result: "Error", message: err.message });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (post === null) {
      res.json({
        result: "Error",
        message: "There is no post to show with the id " + postId,
      });
    } else {
      res.json({ result: "Success", message: post });
    }
  } catch (res) {
    res.json({ result: "Error", message: err.message });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json({ result: "Success", message: removedPost });
  } catch (res) {
    res.json({ result: "Error", message: err.message });
  }
});

router.patch("/:postId", async (req, res) => {
  try {
    const updatePost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );

    res.json({ result: "Success", message: updatePost });
  } catch (res) {
    res.json({ result: "Error", message: err.message });
  }
});

module.exports = router;
