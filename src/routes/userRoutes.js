import express from 'express';
import registerUser from '../controllers/userController';

const router = express.Router();

// register route
router.post('/register', registerUser);

export default router;
