const express = require('express');
const router = express.Router();

router.get("/env", (req, res) => {
  res.json({
    API_KEY: process.env.API_KEY
  });
});

module.exports = router;