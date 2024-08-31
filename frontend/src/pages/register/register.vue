<template>
  <view class="register-container">
    <view class="register-form">
      <!-- 用户名输入框 -->
      <input v-model="username" type="text" placeholder="请输入用户名" />
      <!-- 密码输入框 -->
      <input v-model="password" type="password" placeholder="请输入密码" />
      <!-- 确认密码输入框 -->
      <input v-model="confirmPassword" type="password" placeholder="请确认密码" />
      <!-- 注册按钮 -->
      <button @click="handleRegister">注册</button>
      <!-- 跳转到登录页面的链接 -->
      <text @click="goToLogin">已有账号？去登录</text>
    </view>
  </view>
</template>

<script>
import { useMainStore } from '@/store'

export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      store: useMainStore() // 使用 Pinia store
    }
  },
  methods: {
    // 处理注册
    async handleRegister() {
      // 验证输入
      if (!this.username || !this.password || !this.confirmPassword) {
        this.showToast('请填写所有字段')
        return
      }
      
      if (this.password !== this.confirmPassword) {
        this.showToast('两次输入的密码不一致')
        return
      }
      
      // 调用 store 的注册方法
      const result = await this.store.register({
        username: this.username,
        password: this.password
      })
      
      if (result.success) {
        this.showToast('注册成功', 'success')
        // 注册成功后跳转到登录页面
        uni.navigateTo({ url: '/pages/login/login' })
      } else {
        this.showToast(result.message || '注册失败，请重试')
      }
    },
    
    // 跳转到登录页面
    goToLogin() {
      uni.navigateTo({ url: '/pages/login/login' })
    },

    // 显示提示信息
    showToast(title, icon = 'none') {
      uni.showToast({ title, icon })
    }
  }
}
</script>

<style>
.register-container {
  padding: 20px;
}
.register-form {
  display: flex;
  flex-direction: column;
}
input {
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
}
button {
  margin-top: 10px;
}
</style>
