<!-- components/AuthStatus.vue -->
<template>
  <view class="auth-status">
    <text v-if="isLoggedIn">欢迎回来，{{ username }}</text>
    <text v-else>请登录</text>
  </view>
</template>

<script>
import { isLoggedIn, getToken } from '@/services/auth';

export default {
  name: 'AuthStatus',
  data() {
    return {
      isLoggedIn: false,
      username: ''
    }
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = isLoggedIn();
      if (this.isLoggedIn) {
        // 这里假设token中包含了用户名信息，实际使用中可能需要解析JWT或从服务器获取用户信息
        this.username = getToken().split('.')[1]; // 简化示例，实际应该正确解析JWT
      }
    }
  }
}
</script>

<style scoped>
.auth-status {
  padding: 10px;
  background-color: #f0f0f0;
}
</style>
