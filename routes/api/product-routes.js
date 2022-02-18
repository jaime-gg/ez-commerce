const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// THE `/API/PRODUCTS` ENDPOINT

// GET ALL PRODUCTS
router.get('/', (req, res) => {
  Product.findAll({
    // INCLUDE ASSOCIATED CATEGORY AND TAG DATA
    include: [
      {
        model: Category
      },
      {
        model: Tag
      }
    ]
  })
  .then(dbProductData => res.json(dbProductData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// FIND A SINGLE PRODUCT BY ITS `ID`
router.get('/:id', (req, res) => {
  Product.findOne({
    // MATCH BY INPUTTED ID
    where: {
      id: req.params.id,
    },
    // INCLUDE ASSOCIATED CATEGORY AND TAG DATA
    include: [
      {
        model: Category
      },
      {
        model: Tag
      }
    ]
  })
  .then(dbProductData => {
    if (!dbProductData) {
      res.status(404).json({ message: 'No product found with this id' });
      return;
    }
    res.json(dbProductData);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// CREATE NEW PRODUCT
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // IF THERE'S PRODUCT TAGS, WE NEED TO CREATE PAIRINGS TO BULK CREATE IN THE PRODUCT-TAG MODEL
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // IF NO PRODUCT TAGS, JUST RESPOND
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// UPDATE PRODUCT
router.put('/:id', (req, res) => {
  // UPDATE PRODUCT DATA
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // FIND ALL ASSOCIATED TAGS FROM PRODUCT-TAG
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // GET LIST OF CURRENT TAG_IDS
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // CREATE FILTERED LIST OF NEW TAG_IDS
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // FIGURE OUT WHICH ONES TO REMOVE
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // RUN BOTH ACTIONS
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// DELETE ONE PRODUCT BY ITS `ID` VALUE
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {id: req.params.is}
  })
  .then(dbProductData => {
    if(!dbProductData) {
      res.status(404).json({message: 'No product found with this id'});
      return;
    }
    res.json(dbProductData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
