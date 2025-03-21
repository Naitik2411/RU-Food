import express from 'express';
import menuCtrl from '../controllers/menuController.js';

const router = express.Router();

router.get('/:location/:mealType/:date', menuCtrl.getMenusFromLocation);


export default router;