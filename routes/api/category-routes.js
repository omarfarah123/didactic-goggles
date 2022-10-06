const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoriesData)
  } catch (err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    if(!categoryData){
      res.status(404).json({message: 'No Category with that id was found!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create({
      category_id: req.body.category_id,
    });
    res.status(200).json(categoryData)
  } catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const categoryData = Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        }
      }
    )
    if(!categoryData){
      return res.send(404).json({message: "Category with this id not found"})
    }
    return res.json(categoryData);
  } catch (err){
    return res.json(err)
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!categoryData){
      res.status(404).json({message: 'No category with that id exists'})
      return;
    }
    res.status(200).json(categoryData);
  } catch (err){
    res.status(500).json(err)
  }
});

module.exports = router;
