// import {Router} from 'express';
// EL módulo 'express-promise-router' extiende el Router de express.
// Este nuevo Router tiene la gracia de que implementa un error handler
// para las peticiones asíncronas que cascan, de manera que no se para 
// la aplicación
import Router from 'express-promise-router';
import {goChat, addUserPrompt} from './chatController.js';

const router = Router();

router.get('/chat', goChat);
router.post('/chat/addUserPrompt', addUserPrompt);

export default router;