const express = require('express');
const db = require('./db/models');
const router = express.Router();

const asyncHandler = handler => (req, res, next) => {
  // try to call the handler function on (req, res, next)
  // if that fails, it will call next(err)
  handler(req, res, next)
  .catch(next)
};


router.get('/parks', asyncHandler(async (req, res) => {
  // TODO: Await database query
  const parks = await db.Park.findAll({
    order: [['parkName']]
  });
  // TODO: Render template
  res.render('park-list', {
    title: "Parks",
    parks
  });
}));

router.get(`/park/:id(\\d+)`, asyncHandler(async (req,res) => {
  const id = parseInt(req.params.id, 10);
  const park = await db.Park.findByPk(id);
  res.render('park-detail', {
    title: "Park Detail",
    park
  })
}));

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' })
});

if (process.env.NODE_ENV !== "production") {
  router.get("/error-test", () => {
    throw new Error("This is a test error.");
  });
}





module.exports = router;
