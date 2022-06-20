const express = require('express');
const multer = require('multer');

const {
	handleAddUser,
	handleDeleteUser,
	handleUpdateUser,
	handleUploadPhoto,
	handleSignIn,
	handleSignUp,
	handleLogOut,
	handleGetCurrentUser,
	handleGetUser,
	handleDeleteOrderItem
} = require('../controllers/user');
const isAuthenticated = require('../utils/isAuthenticated');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './src/uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg'].includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({ storage, fileFilter });

const router = express();
// router.use(multer({ dest: 'uploads' }).single('filedata'));
const type = upload.single('avatar');

router.get('/profile', handleGetCurrentUser);
router.get('/profile/:id', handleGetUser);
router.post('/profile', handleAddUser);
router.delete('/profile', handleDeleteUser);
router.patch('/profile', handleUpdateUser);
router.patch('/profile/order/delete',type ,handleDeleteOrderItem);

router.post('/upload', type, handleUploadPhoto);

// auth

router.post('/signin', handleSignIn);
router.post('/signup', handleSignUp);
router.post('/logout', handleLogOut);

module.exports = router;
