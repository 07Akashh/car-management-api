const express = require('express');
const { createUser, deleteAllUser, loginUser, getUser, logoutUser } = require('../controller/user.contoller');
const userAuth = require('../middlewares/authMiddleware');
const router = express();

router.post('/register', createUser);
router.post('/login', loginUser);
router.post('/logout', userAuth, logoutUser)
router.get('/', userAuth, getUser);
// router.delete('/delete', deleteAllUser);

module.exports = router;