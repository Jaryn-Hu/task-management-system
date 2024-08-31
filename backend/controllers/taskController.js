const Task = require('../models/Task');

// 获取所有任务
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
};

// 添加新任务
exports.addTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = new Task({
      title,
      description,
      user: req.user.id
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
};

// 更新任务
exports.updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: '任务未找到' });

    // 确保用户拥有该任务
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: '未授权' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
};

// 删除任务
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: '任务未找到' });

    // 确保用户拥有该任务
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: '未授权' });
    }

    await task.remove();
    res.json({ msg: '任务已删除' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('服务器错误');
  }
};
