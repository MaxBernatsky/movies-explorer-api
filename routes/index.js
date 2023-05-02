const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const {
  signinValidation,
  signupValidation,
} = require('../middlewares/validation');

router.post('/signup', signupValidation, createUser);

router.post('/signin', signinValidation, login);

router.use(auth);

router.use('/users', userRouter);

router.use('/movies', movieRouter);

router.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
