// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for likes
const Like = require('../models/like')

// we'll use this to intercept any errors that get thrown and send them
// back to the client with the appropriate status code
const handle = require('../../lib/error_handler')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /likes
router.get('/likes', requireToken, (req, res) => {
  Like.find({
    'owner': req.user._id
  }).sort({ field: 'asc', _id: -1 }).limit(1)
    .then(likes => {
      const like = likes[0]
      // console.log('like is', like)
      // what happens when there are no likes created?
      requireOwnership(req, like)
      res.status(200).json({ like: like.toObject() })
    })
    .catch(err => handle(err, res))

  // Like.find()
  //   .then(likes => {
  //     // `likes` will be an array of Mongoose documents
  //     // we want to convert each one to a POJO, so we use `.map` to
  //     // apply `.toObject` to each one
  //     return likes.map(like => like.toObject())
  //   })
  //   // respond with status 200 and JSON of the likes
  //   .then(likes => res.status(200).json({ likes: likes }))
  //   // if an error occurs, pass it to the handler
  //   .catch(err => handle(err, res))
})

// SHOW
// GET /likes/5a7db6c74d55bc51bdf39793
router.get('/likes/:id', requireToken, (req, res) => {
  // req.params.id will be set based on the `:id` in the route
  Like.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "example" JSON
    .then(like => res.status(200).json({ like: like.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// CREATE
// POST /likes
router.post('/likes', requireToken, (req, res) => {
  // set owner of new like to be current user
  req.body.like.owner = req.user.id

  Like.create(req.body.like)
    // respond to succesful `create` with status 201 and JSON of new "like"
    .then(like => {
      res.status(201).json({ like: like.toObject() })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(err => handle(err, res))
})

// UPDATE
// PATCH /likes/5a7db6c74d55bc51bdf39793
router.patch('/likes/:id', requireToken, (req, res) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.like.owner

  Like.findById(req.params.id)
    .then(handle404)
    .then(like => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, like)

      // the client will often send empty strings for parameters that it does
      // not want to update. We delete any key/value pair where the value is
      // an empty string before updating
      Object.keys(req.body.like).forEach(key => {
        if (req.body.like[key] === '') {
          delete req.body.like[key]
        }
      })

      // pass the result of Mongoose's `.update` to the next `.then`
      return like.update(req.body.like)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

// DESTROY
// DELETE /likes/5a7db6c74d55bc51bdf39793
router.delete('/likes/:id', requireToken, (req, res) => {
  Like.findById(req.params.id)
    .then(handle404)
    .then(like => {
      // throw an error if current user doesn't own `like`
      requireOwnership(req, like)
      // delete the like ONLY IF the above didn't throw
      like.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(err => handle(err, res))
})

module.exports = router
