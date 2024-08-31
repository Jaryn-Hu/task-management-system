const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // 从 header 中获取 token
  const token = req.header('x-auth-token');

  // 检查是否存在 token
  if (!token) {
    return res.status(401).json({ msg: '没有 token，授权失败' });
  }

  try {
    // 验证 token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 将用户信息添加到 request 对象
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token 无效' });
  }
};
