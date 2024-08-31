const express = require('express');
const router = express.Router();
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/auth');

// 所有任务路由都需要认证
router.use(auth);

// 获取所有任务
router.get('/', getTasks);

// 添加新任务
router.post('/', addTask);

// 更新任务
router.put('/:id', updateTask);

// 删除任务
router.delete('/:id', deleteTask);

module.exports = router;
