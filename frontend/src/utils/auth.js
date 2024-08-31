// 保存 token 到本地存储
export const setToken = (token) => {
  uni.setStorageSync('token', token)
}

// 从本地存储获取 token
export const getToken = () => {
  return uni.getStorageSync('token')
}

// 从本地存储移除 token
export const removeToken = () => {
  uni.removeStorageSync('token')
}

// 检查是否已登录
export const isLoggedIn = () => {
  return !!getToken()
}
