const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// THE `/API/TAGS` ENDPOINT

// FIND ALL TAGS
router.get('/', (req, res) => {
  Tag.findAll({
    // INCLUDE ASSOCIATED PRODUCT DATA
    include: [
      {
        model: Product
      },
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// FIND A SINGLE TAG BY ITS `ID`
router.get('/:id', (req, res) => {
  // BE SURE TO INCLUDE ITS ASSOCIATED PRODUCT DATA
  Tag.findOne({
    // MATCH BY INPUTTED ID
    where: {
      id: req.params.id,
    },
    // INCLUDE ASSOCIATED PRODUCT DATA
    include: [
      {
        model: Product
      }
    ]
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // CREATE A NEW TAG
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // UPDATE A TAG'S NAME BY ITS `ID` VALUE
  Tag.update(req.body, {
    where: {id : req.params.id}
  })
  .then(dbTagData => {
    if(!dbTagData) {
      res.status(400).json({message: "No tag found with this id"})
      return
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// DELETE ON TAG BY ITS `ID` VALUE
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {id: req.params.id}
  })
  .then(dbTagData => {
    if(!dbTagData) {
      res.status(404).json({message: 'No tag found with this id'});
      return;
    }
    res.json(dbTagData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
