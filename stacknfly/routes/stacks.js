const express = require('express');
const router  = express.Router();
const Stacks = require('../models/Stack');

router.get('/', (req, res, next) => {
  res.render('stacks/show');
});

router.get('/:id', (req, res, next) => {
  Stacks.find({_id: req.params.id})
  .then((stackFound) =>{
    res.render('stacks/show', stackFound);
  })
});

//Valorar meter un project para quedarnos con lo que nos interesa del objeto
//y ver si hay que popular.
router.post('/filtered', (req, res, next) => {
  Stacks.filter({category: req.body.category},{timeInHours: req.body.time},{tags: {$contains : req.body.tags}})
  .then((stacksFound) =>{
    res.render('stacks/filtered', stacksFound);
  })
});

//revisar si popular , la subida de imagenes y los steps que populen las sources
router.post('/new', (req, res, next)=>{
  let Stack = new Stacks({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    tags: req.body.tags,
    timeInHours: req.body.time,
    likesCounter: 0,
    createdBy: req.body.creator,
    status:"pending",
    image:req.body.img.url,
    steps:req.body.steps,
  })

  Stacks.save(Stack)

})

router.get('/', (req, res, next) => {
  res.render('stacks/show');
});






module.exports = router;
