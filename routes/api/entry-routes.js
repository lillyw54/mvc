const router = require('express').Router();
const entry = require('../../models/users');

router.post('/', async (req, res) => {
  try { 
    const blogData = await entry.create({
    blog_title: req.body.blog_title,
    comment: req.body.comment,
    guest: req.body.guest,
    date: req.body.date,
  });
  res.status(200).json(blogData)
} catch (err) {
  res.status(400).json(err);
}
});


router.put('/:id', async (req, res) => {

  try {
    const entry = await entry.update(
    {
        blog_title: req.body.blog_title,
        comment: req.body.comment,
        guest: req.body.guest,
        date: req.body.date,
    },
    {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(entry);
  } catch (err) {
      res.status(500).json(err);
    };
});

module.exports = router;