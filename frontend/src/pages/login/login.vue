<template>
  <view class="login-container">
    <text class="title">登录</text>
    <input v-model="username" placeholder="用户名" />
    <input v-model="password" type="password" placeholder="密码" />
    <button @click="login">登录</button>
    <text @click="goToRegister">还没有账号？去注册</text>
  </view>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['loginUser']), // 从 Vuex store 映射 loginUser action
    async login() {
      try {
        await this.loginUser({ username: this.username, password: this.password })
        uni.showToast({ title: '登录成功' })
        uni.switchTab({ url: '/pages/index/index' })
      } catch (error) {
        uni.showToast({ title: '登录失败', icon: 'none' })
      }
    },
    goToRegister() {
      uni.navigateTo({ url: '/pages/register/register' })
    }
  }
}
</script>

<style>
.login-container {
  padding: 20px;
}
.title {
  font-size: 24px;
  margin-bottom: 20px;
}
input {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  padding: 0 10px;
}
button {
  width: 100%;
  height: 40px;
  background-color: #007AFF;
  color: white;
}
</style>
