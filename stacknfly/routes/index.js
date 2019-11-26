const express = require('express');
const router  = express.Router();
const uploadCloud = require('../configs/cloudinary');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.post('/uploadPicture', uploadCloud.single('image'), (req, res, next) => {
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  let picture = {
    imgPath: imgPath,
    imgName: imgName
  }
  res.json(picture)
});

module.exports = router;


