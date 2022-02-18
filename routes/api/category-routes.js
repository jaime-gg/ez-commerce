const router = require('express').Router();
const { Category, Product } = require('../../models');

// THE `/API/CATEGORIES` ENDPOINT

// FIND ALL CATEGORIES
router.get('/', (req, res) => {
  Category.findAll({
    // INCLUDE ASSOCIATED PRODUCTS
    include: [
      {
        model: Product
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// FIND ONE CATEGORY BY ITS `ID` VALUE
router.get('/:id', (req, res) => {
  Category.findOne({
    // MATCH BY INPUTTED ID
    where: {
      id: req.params.id,
    },
    // INCLUDE ASSOCIATED PRODUCTS
    include: [
      {
        model: Product
      }
    ]
  })
  .then(dbCategoryData => {
    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // CREATE A NEW CATEGORY
  Category.create({
    category_name: req.body.category_name 
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // UPDATE A CATEGORY BY ITS `ID` VALUE
  Category.update( req.body, {
    where: {id : req.params.id}
  }) 
  .then(dbCategoryData => {
    if (!dbCategoryData) {
        res.status(400).json({message: "No category found with this id"})
        return
    }
    res.json(dbCategoryData)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json(err)
  })

});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {id: req.params.is}
  })
  .then(dbCategoryData => {
    if(!dbCategoryData) {
      res.status(404).json({message: 'No category found with this id'});
      return;
    }
    res.json(dbCategoryData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
