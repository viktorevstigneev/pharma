const express = require('express');
const multer = require('multer');

const {
	handleAddTeam,
	handleGetTeam,
	handleDeleteTeam,
	handleUploadPhoto,
	handleUpdateTeam,
	handleGetPerson,
	handleOrderTeam,
} = require('../controllers/people');
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
const type = upload.single('avatar');

router.get('/team', handleGetTeam);
router.get('/person/:id', handleGetPerson);
router.post('/team',type ,handleAddTeam);
router.post('/team/order',type ,handleOrderTeam);
router.delete('/team/:id', handleDeleteTeam);
router.patch('/team/:id', type, handleUpdateTeam);
router.post('/upload', type, handleUploadPhoto);

module.exports = router;
