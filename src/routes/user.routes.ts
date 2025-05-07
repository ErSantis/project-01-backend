import { Router } from 'express';
import { UserController } from '../controller/user.controller';
//import { authenticate } from '../Middleware/auth';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Rutas protegidas
//router.use(authenticate);

export default router;