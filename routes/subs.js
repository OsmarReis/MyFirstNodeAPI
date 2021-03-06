const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subs');

//GET All
router.get('/', async (req, res) => {
  try {
    const Subscribers = await Subscriber.find();
    res.json(Subscribers);
  } catch (err) {
    res.status(500).json({message: err.message});
  }

})

//GET One
router.get('/:id', getSubscriber, (req, res) => {
  res.json(res.subscriber);
})

//Create One
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subToChannel: req.body.subToChannel
  });

  try {
    const newSubscriber = await subscriber.save()
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
})

//Update One
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name
  }

  if (req.body.subToChannel != null) {
    res.subscriber.subToChannel = req.body.subToChannel
  }

  try {
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
})

//Delete One
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: 'Subscriber deleted'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
})


//middleware function to reutilize the same code
async function getSubscriber(req, res, next) {
  let subscriber
 try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Subscriber not found' })
    }
 } catch(err) {
  return res.status(500).json({message: err.message});
 }

 res.subscriber = subscriber;
 next();
}


module.exports = router;