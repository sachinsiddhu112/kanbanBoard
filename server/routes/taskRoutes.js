import express from 'express';
import { createTask, deleteTask, getAllUserTasks,
     getUserTaskWithId, updateTask } from '../controllers/tasksController.js';

import fetchUser from "../middlewares/fetchUser.js"

const router = express.Router();


router.get('/getAllTasks',fetchUser,getAllUserTasks);
router.get('/getTask/:id',fetchUser,getUserTaskWithId);
router.put('/updateTask/:id',fetchUser,updateTask);
router.post('/createTask',fetchUser , createTask);
router.delete('/deleteTask/:id',fetchUser , deleteTask);


export default router;