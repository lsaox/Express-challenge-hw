const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


// GET endpoint to retrieve a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tag_id' }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err){
    res.status(500).json(err);
  }
});

// POST endpoint to create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name:req.body.tag_name,
    });
    res.status(201).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE endpoint to delete a tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id:req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  }catch(err) {
   res.status(500).json(err);
  }
});

module.exports = router;